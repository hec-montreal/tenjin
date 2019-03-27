tenjinApp.directive('elementRender', ['SyllabusService', 'SyllabusLockService', 'UserService', 'TenjinService', 'SakaiToolsService', 'config', '$translate', function(SyllabusService, SyllabusLockService, UserService, TenjinService, SakaiToolsService, config, $translate) {
	'use strict';

	return {
		scope: {
			element: '=',
			index: '='
		},

		restrict: 'E',

		templateUrl: 'elementRender/elementRender.html',

		controller: function($scope) {
			$scope.syllabusService = SyllabusService;
			$scope.userService = UserService;
			$scope.syllabusLockService = SyllabusLockService;
			$scope.tenjinService = TenjinService;
			$scope.config = config;

			var templateStructureElement = 
				SyllabusService.getTemplateStructureElement($scope.element.templateStructureId);

			$scope.isNotPublishedFlagVisible = function() {
				// Is element = published or equalsPublished is undefined meaning it's the published syllabus
				if (($scope.element.equalsPublished || typeof $scope.element.equalsPublished === 'undefined') &&
					($scope.element.mappingEqualsPublished || typeof $scope.element.mappingEqualsPublished === 'undefined' || $scope.element.mappingEqualsPublished === null)) {
					return false;
				}

				// Only show flag in edit mode
				if (TenjinService.viewState.stateName !== 'syllabus-edit') {
					return false;
				}

				// Dont show flag on rubrics
				if ($scope.element.type === 'rubric') {
					return false;
				}

				// Dont show flag when view mode is student or public
				if (SyllabusService.viewMode === 'student' || SyllabusService.viewMode === 'public') {
					return false;
				}

				// Show flag
				return true;
			};

			$scope.isElementHiddenByResourceFlag = function() {
				var res = SyllabusService.getElementResource($scope.element);

				if (res === null) {
					return false;
				}

				return res.hidden;
			};

			$scope.isElementHiddenByResourcePublicFlag = function() {
				var res = SyllabusService.getElementResource($scope.element);

				if (res === null) {
					return false;
				}

				return !res.publicAccess;
			};

			$scope.isSakaiEntityMissing = function() {
				return SakaiToolsService.getEntity($scope.element.attributes.sakaiToolId) == null;
			};

			$scope.isElementHiddenByDate = function() {
				var dates = SyllabusService.getElementVisibilityDates($scope.element);

				if (!dates.start) {
					return false;
				}

				var now = moment();

				// No ending date
				if (!dates.end) {
					return dates.start.isAfter(now);
				}

				// Between start and end
				var range = moment.range(dates.start, dates.end);

				return !range.contains(now);
			};

			$scope.getElementHiddenByDateMessage = function() {
				var dates = SyllabusService.getElementVisibilityDates($scope.element);
				var fmt = 'YYYY-MM-DD';

				if (!dates.start) {
					return "";
				}

				if (!dates.end) {
					return $translate.instant('ELEMENT_HIDDEN_BEFORE') + dates.start.format(fmt);
				}

				return $translate.instant('ELEMENT_HIDDEN_BETWEEN')
					.replace('%1', dates.start.format(fmt))
					.replace('%2', dates.end.format(fmt));
			};

			$scope.isElementFadedOut = function() {
				if ($scope.element.composite && ($scope.element.type !== 'exam' && $scope.element.type !== 'evaluation')) {
					return false;
				}

				return !$scope.element.equalsPublished;
			};

			$scope.isElementHiddenByViewMode = function() {
				if (SyllabusService.viewMode === 'edit') {
					return false;
				}

				if (SyllabusService.viewMode === 'student') {
					return $scope.element.hidden || $scope.isElementHiddenByDate() || $scope.isElementHiddenByResourceFlag();
				}

				if (SyllabusService.viewMode === 'public') {
					return $scope.element.hidden || 
						!$scope.element.publicElement ||
						$scope.isElementHiddenByDate() ||
						$scope.isElementHiddenByResourceFlag() ||
						$scope.isElementHiddenByResourcePublicFlag();
				}

				return false;
			};

			$scope.isElementDragged = function () {
				if ($scope.element.dragged && $scope.element.dragged === true)
					return true;

				return false;
			};

			$scope.toggleElementHidden = function () {
				if ($scope.element.hidden) {
					$scope.element.hidden = false;
				} else {
					$scope.element.hidden = true;
				}

				$scope.element.equalsPublished = false;
			};

			$scope.checkOrUncheckElement = function () {
				var tthis = this;

				if (this.checkLock) {
					return;
				}

				var annotations = UserService.getAnnotationsForElement(SyllabusService.getSyllabus().id, $scope.element.id, 'CHECK');

				if (annotations.length > 0) {
					UserService.deleteAnnotation(annotations[0]).finally(function () {

					});
				} else {
					UserService.createAnnotation(SyllabusService.getSyllabus().id, $scope.element.id, 'CHECK').finally(function () {

					});
				}
			};

			$scope.isElementCheckedByAnnotation = function () {
				return UserService.getAnnotationsForElement(SyllabusService.getSyllabus().id, $scope.element.id, 'CHECK').length > 0;
			};
		}
	};
}]);
