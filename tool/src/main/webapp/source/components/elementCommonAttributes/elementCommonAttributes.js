tenjinApp.directive('elementCommonAttributes', ['$anchorScroll', '$location', 'ModalService', 'UserService', function($anchorScroll, $location, ModalService, UserService) {
	'use strict';

	return {
		scope: {
			element: '=',
			resource: '=',
			noedit: '=',
			noimportant: '=',
			novisible: '=',
			nodate: '=',
			nocopyright: '='
		},

		restrict: 'E',

		templateUrl: 'elementCommonAttributes/elementCommonAttributes.html',

		controller: function($scope) {
			$scope.mode = $scope.$parent.$parent.mode;

			if ($scope.element.attributes.evalDate) {
				$scope.element.attributes.evalDate = new Date($scope.element.attributes.evalDate);
			}

			if ($scope.element.availabilityEndDate) {
				$scope.element.hasEndDate = true;
			}

			$scope.userAnnotationTypes = UserService.profile.userAnnotationTypes;

			$scope.formats = ['dd-MMMM-yyyy HH:mm'];
			$scope.format = $scope.formats[0];

			$scope.status = {
				opened: false
			};

			$scope.dateOptions = {
				formatYear: 'yy',
				startingDay: 1
			};

			$scope.statusEnd = {
				opened: false
			};

			$scope.$watch('isDateEnd', function() {
				if (!$scope.isDateEnd) {
					$scope.element.dtEnd = null;
				}
			});

			$scope.open = function($event) {
				$scope.status.opened = true;
				$scope.element.$formHasDates = true;
				$scope.element.availabilityStartDate = new Date();
			};

			$scope.openEnd = function($event) {
				$scope.statusEnd.opened = true;
				$scope.element.$formHasDates = true;
				$scope.element.$hasEndDate = true;
				$scope.element.availabilityEndDate = new Date();

			};

			$scope.updateDateEnd = function($event) {
				$scope.element.availabilityEndDate = "";
			};

			$scope.isUserAnnotationTypeVisible = function (annotationType) {
				for (var i = 0; i < annotationType.enabledElementTypes.length; i++) {
					if (annotationType.enabledElementTypes[i] === $scope.element.type) {
						return true;
					}
				}

				return false;
			};

			$scope.isUserAnnotationTypeChecked = function (annotationType) {
				// Use default value when creation an element
				if ($scope.mode === 'creation') {
					for (var i = 0; i < annotationType.defaultElementTypes.length; i++) {
						if (annotationType.defaultElementTypes[i] === $scope.element.type) {
							return true;
						}
					}

					return false;
				};

				return'' + $scope.element.attributes[annotationType.attributeName] === 'true';
			};
		},

		link: function($scope, $element) {
			$scope.element.hasDatesInterval = $scope.element.hasDatesInterval || false;
			$scope.element.$formHasDates = $scope.element.hasDatesInterval;
		}
	};
}]);
