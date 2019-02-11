tenjinApp.directive('checkProgressBar', ['SyllabusService', 'UserService', function(SyllabusService, UserService) {
	'use strict';

	return {
		scope: {},

		restrict: 'E',

		templateUrl: 'checkProgressBar/checkProgressBar.html',

		controller: function($scope, $rootScope) {
			$scope.widthCache = 0;

			$scope.calculateWidth = function () {
				var checkables = 0;
				var checked = 0;

				SyllabusService.forEachElement(SyllabusService.getSyllabus(), function (element) {
					if (element.attributes['checkable'] === 'true') {
						checkables++;

						var annotations = UserService.getAnnotationsForElement(SyllabusService.getSyllabus(), element.id, 'CHECK');

						if (annotations.length > 0) {
							checked++;
						}
					}
				});

				$scope.widthCache = (checked / checkables) * 100;

				return $scope.widthCache;
			};

			$scope.getLabel = function () {
				return Math.floor($scope.widthCache) + ' %';
			}
		}
	};
}]);
