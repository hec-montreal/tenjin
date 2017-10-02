tenjinApp.controller('PermissionsModalCtrl', ['$scope', '$rootScope', '$uibModalInstance', 'PermissionsService', 'AlertService', function($scope, $rootScope, $uibModalInstance, PermissionsService, AlertService) {
	'use strict';

    $scope.loading = true;
    PermissionsService.load().then(function() {
        $scope.data = PermissionsService.permissions;
        $scope.loading = false;
    });

	$scope.ok = function() {
	    $scope.loading = true;
	    PermissionsService.save($scope.data).then(function() {
	        AlertService.showAlert('permissionsUpdateSuccess');
	    }).catch(function(e) {
	        AlertService.showAlert('permissionsUpdateError');
	    }).finally(function() {
	        $uibModalInstance.close();
	    })
	};

	/**
	 * Callback cancel button
	 */
	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
}]);
