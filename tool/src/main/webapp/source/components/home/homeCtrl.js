tenjinApp.controller('HomeCtrl', ['$state', 'TenjinService', function($state, TenjinService) {
	'use strict';

	var redirectionInfos = TenjinService.dispatchUser();

	if (redirectionInfos) {
		$state.go(redirectionInfos.route, redirectionInfos.params);
	}
}]);
