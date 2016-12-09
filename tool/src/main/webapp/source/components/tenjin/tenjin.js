tenjinApp.directive('tenjin', ['TenjinService', function(TenjinService) {
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
				console.log("Cannot load base data");
			});
		}
	};
}]);
