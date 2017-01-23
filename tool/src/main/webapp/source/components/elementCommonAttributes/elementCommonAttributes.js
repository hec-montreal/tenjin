tenjinApp.directive('elementCommonAttributes', ['$anchorScroll', '$location', 'ModalService', function($anchorScroll, $location, ModalService) {
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
			if ($scope.element.attributes.evalDate) {
				$scope.element.attributes.evalDate = new Date($scope.element.attributes.evalDate);
			}
			if ($scope.element.availabilityEndDate) {
				$scope.element.hasEndDate = true;
			}

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

				var inputEnd = angular.element(document.getElementById('input-date-end'));

				inputEnd.prop('required');

			});

			$scope.open = function($event) {
				$scope.status.opened = true;
				$scope.element.$formHasDates = true;
				$scope.element.availabilityStartDate = new Date();
			};


			// Disable weekend selection
			$scope.disabled = function(date, mode) {
				return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
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
		},

		link: function($scope, $element) {
			$scope.element.hasDatesInterval = $scope.element.hasDatesInterval || false;
			$scope.element.$formHasDates = $scope.element.hasDatesInterval;
		}
	};
}]);
