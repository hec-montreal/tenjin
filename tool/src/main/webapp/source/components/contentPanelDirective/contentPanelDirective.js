tenjinApp.directive('contentPanelDirective', ['SyllabusService', 'UserService', 'config', '$translate', function(SyllabusService, UserService, config, $translate) {
	'use strict';

	return {
		scope: {
			element: '=contentPanelDirective',
			index: '='
		},

		restrict: 'A',

		templateUrl: 'contentPanelDirective/contentPanelDirective.html',

		controller: function($scope) {
			$scope.syllabusService = SyllabusService;
			$scope.userService = UserService;
			$scope.config = config;

			var template = $scope.syllabusService.template[$scope.element.templateStructureId];

			$scope.displayButtons = {
				deleteButton: function() {
					return ($scope.userService.isAllowed('syllabusWrite', $scope.syllabusService.syllabus) &&
							!$scope.syllabusService.template[$scope.element.templateStructureId].mandatory) &&
						($scope.syllabusService.syllabus.common ||
							(!$scope.syllabusService.syllabus.common &&
								!$scope.element.common));
				},

				editButton: function() {
					return ($scope.element.type !== 'rubric') &&
						(($scope.syllabusService.syllabus.common &&
								$scope.userService.isAllowed('syllabusWrite', $scope.syllabusService.syllabus) &&
								!$scope.syllabusService.template[$scope.element.templateStructureId].mandatory) ||
							(!$scope.syllabusService.syllabus.common &&
								$scope.userService.isAllowed('syllabusWrite', $scope.syllabusService.syllabus) &&
								!$scope.element.common &&
								!$scope.syllabusService.template[$scope.element.templateStructureId].mandatory));

				},

				dragButton: function() {
					return ($scope.element.type !== 'rubric');
				}
			};

			$scope.isElementHiddenByDate = function(element) {
				if (!element.hasDatesInterval) {
					return false;
				}

				if (!element.availabilityStartDate) {
					return false;
				}

				var now = moment();
				var start = moment(element.availabilityStartDate);

				if (!element.availabilityEndDate) {
					return start.isAfter(now);
				}

				var end = moment(element.availabilityEndDate);
				var range = moment.range(start, end);

				return !range.contains(now);
			};

			$scope.getElementHiddenByDateMessage = function(element) {
				if (!element.hasDatesInterval) {
					return "";
				}

				if (!element.availabilityStartDate) {
					return "";
				}

				var fmt = 'YYYY-MM-DD';

				if (!element.availabilityEndDate) {
					return $translate.instant('ELEMENT_HIDDEN_BEFORE') + moment(element.availabilityStartDate).format(fmt);
				}

				return $translate.instant('ELEMENT_HIDDEN_BETWEEN')
					.replace('%1', moment(element.availabilityStartDate).format(fmt))
					.replace('%2', moment(element.availabilityEndDate).format(fmt));
			};
		}
	};
}]);
