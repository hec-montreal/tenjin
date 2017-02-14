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

			var template = SyllabusService.template[$scope.element.templateStructureId];

			$scope.displayButtons = {
				deleteButton: function() {
					return ($scope.userService.isAllowed('syllabusWrite', SyllabusService.syllabus) &&
							!SyllabusService.template[$scope.element.templateStructureId].mandatory) &&
						(SyllabusService.syllabus.common ||
							(!SyllabusService.syllabus.common &&
								!$scope.element.common));
				},

				editButton: function() {
					return ($scope.element.type !== 'rubric') &&
						((SyllabusService.syllabus.common &&
								$scope.userService.isAllowed('syllabusWrite', SyllabusService.syllabus) &&
								!SyllabusService.template[$scope.element.templateStructureId].mandatory) ||
							(!SyllabusService.syllabus.common &&
								$scope.userService.isAllowed('syllabusWrite', SyllabusService.syllabus) &&
								!$scope.element.common &&
								!SyllabusService.template[$scope.element.templateStructureId].mandatory));

				},

				dragButton: function() {
					return ($scope.element.type !== 'rubric');
				}
			};

			$scope.isElementHiddenByDate = function(element) {
				var dates = SyllabusService.getElementVisibilityDates(element);

				if (dates.usingResource) {
					console.log("Using resource");
					console.log(dates);
				}

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
		}
	};
}]);
