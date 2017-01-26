tenjinApp.directive('alert', ['AlertService', function(AlertService) {
	'use strict';

	return {
		scope: {},

		restrict: 'E',

		templateUrl: 'alert/alert.html',

		controller: function($scope) {
			$scope.alertService = AlertService;
		}
	};
}]);
