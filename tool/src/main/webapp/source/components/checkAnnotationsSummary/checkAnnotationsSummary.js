tenjinApp.directive('checkAnnotationsSummary', ['SyllabusService', 'UserService', function(SyllabusService, UserService) {
	'use strict';

	return {
		scope: {},

		restrict: 'E',

		templateUrl: 'checkAnnotationsSummary/checkAnnotationsSummary.html',

		controller: function($scope, $rootScope) {
			$scope.syllabusService = SyllabusService;

			$scope.extractTitle = function (element) {
				if (element.title && element.title.length > 0) {
					return element.title;
				}

				var div = document.createElement('div');

				div.innerHTML = element.description;

				return $scope.truncateString(div.textContent || div.innerText || '', 20);
			}

			$scope.checkOrUncheckElement = function (element) {
				var annotations = UserService.getAnnotationsForElement(SyllabusService.getSyllabus().id, element.id, 'CHECK');

				if (annotations.length > 0) {
					UserService.deleteAnnotation(annotations[0]);
				} else {
					UserService.createAnnotation(SyllabusService.getSyllabus().id, element.id, 'CHECK');
				}
			};

			$scope.isElementCheckedByAnnotation = function (element) {
				return UserService.getAnnotationsForElement(SyllabusService.getSyllabus().id, element.id, 'CHECK').length > 0;
			};

			$scope.truncateString = function (str, length) {
				if (str.length <= length) {
					return str;
				}

				return str.substring(0, length) + '...';
			}
		}
	};
}]);
