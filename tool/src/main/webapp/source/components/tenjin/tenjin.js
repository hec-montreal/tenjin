tenjinApp.directive('tenjin', ['TenjinService', 'AlertService', 'SyllabusLockService', '$translate','tmhDynamicLocale', function(TenjinService, AlertService, SyllabusLockService, $translate, tmhDynamicLocale) {
	return {
		restrict: 'E',

		scope: true,

		templateUrl: 'tenjin/tenjin.html',

		controller: function($scope) {
			window.SyllabusLockService = SyllabusLockService;

			$translate.use('fr');
			tmhDynamicLocale.set('fr');

			$scope.showGlobalLoading = function() {
				$scope.globalLoading = true;
			};

			$scope.hideGlobalLoading = function() {
				$scope.globalLoading = false;
			};

			$scope.showGlobalLoading();

			$scope.baseDataLoaded = false;

			TenjinService.loadData().then(function() {
				$scope.baseDataLoaded = true;
			}).catch(function() {
				AlertService.showAlert('cannotLoadBaseData');
			}).finally(function() {
				$scope.hideGlobalLoading();
			});
		}
	};
}]);
