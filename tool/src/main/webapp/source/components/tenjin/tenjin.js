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

			$scope.baseDataLoaded = false;

			$scope.showGlobalLoading();

			TenjinService.loadData().then(function() {
				$scope.baseDataLoaded = true;
				$scope.hideGlobalLoading();

			}, function () {
				$scope.hideGlobalLoading();

				AlertService.showAlert('cannotLoadBaseData', false);
			});
		}
	};
}]);
