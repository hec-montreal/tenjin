tenjinApp.directive("mobileNavigation", ['SyllabusService', 'TreeService', function (SyllabusService, TreeService) {
	'use strict';

	return {
		scope: {},

		restrict: 'E',

		templateUrl: 'mobileNavigation/mobileNavigation.html',

		controller: function ($scope) {
			$scope.syllabusService = SyllabusService;
			$scope.treeService = TreeService;

			$scope.mobileMenuVisible = false;

			$scope.toggleMobileMenu = function () {
				$scope.mobileMenuVisible = !$scope.mobileMenuVisible;
			};
		}
	};
}]);
