tenjinApp.directive('checkAnnotationsSummary', ['SyllabusService', 'UserService', function(SyllabusService, UserService) {
	'use strict';

	return {
		scope: {},

		restrict: 'E',

		templateUrl: 'checkAnnotationsSummary/checkAnnotationsSummary.html',

		controller: function($scope, $rootScope) {
			$scope.syllabusService = SyllabusService;

			$scope.extractTitle = function (element) {
				var typeName = SyllabusService.getElementTypeTitle(element) + ': ';

				if (element.title && element.title.length > 0) {
					var prefix = '';

					if (element.attributes.numero && (element.type === 'lecture' || element.type === 'tutorial')) {
						prefix = element.attributes.numero + ' - ';
					} else if ((!element.elements) || (element.elements.length === 0)) {
						prefix = typeName;
					}

					return prefix + element.title;
				}

				var div = document.createElement('div');

				div.innerHTML = element.description;

				return typeName + $scope.truncateString(div.textContent || div.innerText || '', 50);
			}

			$scope.checkOrUncheckElement = function (element) {
				if (!UserService.isStudent()) {
					return;
				}

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

			$scope.isTitleVisible = function (element) {
				if (element.attributes['checkable'] === 'true') {
					return true;
				}

				if (!element.elements || element.elements.length === 0) {
					return false;
				}

				for (var i = 0; i < element.elements.length; i++) {
					if ($scope.isTitleVisible(element.elements[i])) {
						return true;
					}
				}
			}

			$scope.getLineClass = function (element) {
				if (element.type === 'lecture' || element.type === 'tutorial') {
					return 'separator';
				}

				return '';
			}

			
			$scope.isCheckIconVisible = function (item) {
				return SyllabusService.isCheckFeatureVisibleForStudent() && (item.type === 'lecture' || item.type ==='tutorial');
			}

			$scope.getCheckableLectureClass = function (item) {
				var checkable = SyllabusService.countCheckableElements(item);

				if (checkable === 0) {
					return 'completed glyphicon-minus'
				}

				if (checkable === SyllabusService.countCheckedElements(item)) {
					return 'completed glyphicon-ok';
				}

				return "not-completed glyphicon-ok";
			}
		}
	};
}]);
