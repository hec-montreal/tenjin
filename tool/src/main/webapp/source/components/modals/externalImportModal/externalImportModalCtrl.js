tenjinApp.controller('ExternalImportModalCtrl', ['$scope', '$uibModalInstance', 'SyllabusService', 'AlertService', function($scope, $uibModalInstance, SyllabusService, AlertService) {
	'use strict';

	$scope.data = { 
		siteId : ""
	};

	$scope.ok = function() {
		$uibModalInstance.close($scope.data);
	};

	/**
	 * Callback cancel button
	 */
	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
}]);
