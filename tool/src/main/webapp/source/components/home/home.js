tenjinApp.directive('home', ['$state', 'TenjinService', function($state, TenjinService) {
	'use strict';

	return {
		scope: true,

		restrict: 'E',

		template: '<section class="home"></section>',

		controller: function($scope) {
			var tthis = this;

			$scope.$on('baseDataLoaded', function() {
				var redirectionInfos = TenjinService.dispatchUser();

				if (redirectionInfos) {
					$state.go(redirectionInfos.route, redirectionInfos.params);
				}
			});
		},

		controllerAs: 'homeCtrl'
	};
}]);
