tenjinApp.controller('ResourceViewCtrl', ['$rootScope', '$scope', '$timeout', '$q', '$state', '$translate', 'SyllabusService', 'SyllabusLockService', 'TreeService', 'ResourcesService', 'CitationsService', 'SakaiToolsService', 'UserService', 'PublishService', 'TenjinService', 'config', 'AlertService', 'ModalService', function($rootScope, $scope, $timeout, $q, $state, $translate, SyllabusService, SyllabusLockService, TreeService, ResourcesService, CitationsService, SakaiToolsService, UserService, PublishService, TenjinService, config, AlertService, ModalService) {
	'use strict';

	$scope.resourceUrl='/portal/tool/ed4c9fe5-8d96-4980-9dd2-b3399066899a';

	$('#formid').submit();
	
	//$scope.resourceUrl = '/portal/site/1-620-15.A2017/tool/ed4c9fe5-8d96-4980-9dd2-b3399066899a';
	//$scope.rt_action = 'org.sakaiproject.content.types.fileUpload:properties';
	//$scope.selectedItemId = '/group/1-620-15.A2017/Calculs FM avec calculatrices.pdf';
	//$scope.sakai_action = 'doDispatchAction';

}]);
