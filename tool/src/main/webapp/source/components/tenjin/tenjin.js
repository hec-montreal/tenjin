tenjinApp.directive('tenjin', ['TenjinService', 'AlertService', 'SyllabusLockService', 'UserService', '$translate','tmhDynamicLocale', function(TenjinService, AlertService, SyllabusLockService, UserService, $translate, tmhDynamicLocale) {
	return {
		restrict: 'E',

		scope: true,

		templateUrl: 'tenjin/tenjin.html',

		controller: function($scope) {
			window.SyllabusLockService = SyllabusLockService;


			$scope.showGlobalLoading = function() {
				$scope.globalLoading = true;
			};

			$scope.hideGlobalLoading = function() {
				$scope.globalLoading = false;
			};

			$scope.showGlobalLoading();

			$scope.baseDataLoaded = false;

			// use fr_CA by default
			$translate.use('fr_CA').then(function() {
				AlertService.init();
				return TenjinService.loadData();
			})
			.then(function() {
				$scope.baseDataLoaded = true;
			}).catch(function(e) {
				console.log(e);
				AlertService.showAlert(e);
			}).finally(function() {
				$scope.hideGlobalLoading();
			});
		}
	};
}]);
