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

			$scope.displayButtons = {
				deleteButton: function() {
					return ($scope.userService.isAllowed('syllabusWrite', SyllabusService.syllabus) &&
							templateStructureElement && !TemplateStructureElement.mandatory) &&
						(SyllabusService.syllabus.common ||
							(!SyllabusService.syllabus.common &&
								!$scope.element.common));
				},

				editButton: function() {
					return ($scope.element.type !== 'rubric') &&
						((SyllabusService.syllabus.common &&
								$scope.userService.isAllowed('syllabusWrite', SyllabusService.syllabus) &&
								templateStructureElement && !templateStructureElement.mandatory) ||
							(!SyllabusService.syllabus.common &&
								$scope.userService.isAllowed('syllabusWrite', SyllabusService.syllabus) &&
								!$scope.element.common &&
								templateStructureElement && !templateStructureElement.mandatory));

				},

				dragButton: function() {
					return ($scope.element.type !== 'rubric');
				}
			};

			$scope.isNotPublishedFlagVisible = function(element) {
				// Is element = published or equalsPublished is undefined meaning it's the published syllabus
				if (element.equalsPublished || typeof element.equalsPublished === 'undefined') {
					return false;
				}

				// Only show flag in edit mode
				if (TenjinService.viewState.stateName !== 'syllabus-edit') {
					return false;
				}

				// Dont show flag on rubrics
				if (element.type === 'rubric') {
					return false;
				}

				// Dont show flag when view mode is student or public
				if (SyllabusService.viewMode === 'student' || SyllabusService.viewMode === 'public') {
					return false;
				}

				// Show flag
				return true;
			};

			$scope.isElementHiddenByResourceFlag = function(element) {
				var res = SyllabusService.getElementResource(element);

				if (res === null) {
					return false;
				}

				return res.hidden;
			};

			$scope.isElementHiddenByResourcePublicFlag = function(element) {
				var res = SyllabusService.getElementResource(element);

				if (res === null) {
					return false;
				}

				return !res.publicAccess;
			};

			$scope.isSakaiEntityMissing = function(element) {
				return SakaiToolsService.getEntity(element.attributes.sakaiToolId) == null;
			};

			$scope.isElementHiddenByDate = function(element) {
				var dates = SyllabusService.getElementVisibilityDates(element);

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

			$scope.getElementHiddenByDateMessage = function(element) {
				var dates = SyllabusService.getElementVisibilityDates(element);
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

			$scope.isElementFadedOut = function(element) {
				if (element.composite && (element.type !== 'exam' && element.type !== 'evaluation')) {
					return false;
				}

				return !element.equalsPublished;
			};

			$scope.isElementHiddenByViewMode = function(element) {
				if (SyllabusService.viewMode === 'edit') {
					return false;
				}

				if (SyllabusService.viewMode === 'student') {
					return $scope.isElementHiddenByDate(element) || $scope.isElementHiddenByResourceFlag(element);
				}

				if (SyllabusService.viewMode === 'public') {
					if ($scope.isElementHiddenByDate(element) ||
						$scope.isElementHiddenByResourceFlag(element) ||
						$scope.isElementHiddenByResourcePublicFlag(element)) {
						return true;
					}

					if (element['publicElement'] === false) {
						return true;
					}



					return false;
				}

				return false;
			};

			$scope.isElementDragged = function (element) {
				if (element.dragged && element.dragged === true)
					return true;
				return false;
			};

			$scope.checkOrUncheckElement = function () {
				var id = $scope.element.id;
				var annotations = $scope.userService.getAnnotationsForElement($scope.syllabusService.getSyllabus().id, id);
				var index = -1;

				for (var i = 0; i < annotations.length; i++) {
					if (annotations[i].type === 'CHECK') {
						index = i;

						break;
					}
				}

				if (index >= 0) {
					$scope.userService.deleteAnnotation(index);
				} else {
					$scope.userService.createAnnotation($scope.syllabusService.getSyllabus().id, id, 'CHECK');
				}
			};

			$scope.isElementCheckedByAnnotation = function () {
				var id = $scope.element.id;

				console.log('getAnnotationsForElement(' + $scope.syllabusService.getSyllabus().id + ', ' + id + ')');

				var annotations = $scope.userService.getAnnotationsForElement($scope.syllabusService.getSyllabus().id, id);

				console.log(annotations);

				for (var i = 0; i < annotations.length; i++) {
					console.log('Verifying');
					console.log(annotations[i]);

					if (annotations[i].type === 'CHECK') {
						return true;
					}
				}

				return false;
			};
		}
	};
}]);
