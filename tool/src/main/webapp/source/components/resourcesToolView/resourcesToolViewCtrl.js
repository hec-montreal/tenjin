tenjinApp.controller('ResourceViewCtrl', ['$rootScope', '$scope', '$timeout', '$q', '$state', '$translate', 'UserService', function($rootScope, $scope, $timeout, $q, $state, $translate, UserService) {
	'use strict';

	$scope.resourcesUrl='/portal/tool/' + UserService.getResourcesToolId()+'?panel=Main';
}]);