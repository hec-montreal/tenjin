tenjinApp.directive('tenjin', ['TenjinService', 'AlertService', function(TenjinService, AlertService) {
	return {
		restrict: 'E',

		scope: true,

		templateUrl: 'tenjin/tenjin.html',

		controller: function($scope) {
			$scope.showGlobalLoading = function() {
				$scope.globalLoading = true;
			};

			$scope.hideGlobalLoading = function() {
				$scope.globalLoading = false;
			};

			$scope.showGlobalLoading();

			TenjinService.loadData().then(function() {
				$scope.$broadcast('baseDataLoaded');
			}).catch(function() {
				AlertService.showAlert('cannotLoadBaseData', false);
			}).finally(function() {
				$scope.hideGlobalLoading();
			});
		}
	};
}]);
