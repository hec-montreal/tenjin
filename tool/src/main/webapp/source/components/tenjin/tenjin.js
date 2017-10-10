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

			TenjinService.loadData().then(function() {
				$scope.baseDataLoaded = true;
				// Set locale
				var availableLang = $translate.getAvailableLanguageKeys();
				if (availableLang.indexOf(UserService.getProfile().locale) > -1){
					$translate.use(UserService.getProfile().locale).then(function() {
					    AlertService.init();
					});
					tmhDynamicLocale.set(UserService.getProfile().locale);
				}else{
					$translate.use(UserService.getProfile().defaultLocale).then(function() {
						AlertService.init();
					});
					tmhDynamicLocale.set(UserService.getProfile().defaultLocale);
				}
			}).catch(function() {
				AlertService.showAlert('cannotLoadBaseData');
			}).finally(function() {
				$scope.hideGlobalLoading();
			});
		}
	};
}]);
