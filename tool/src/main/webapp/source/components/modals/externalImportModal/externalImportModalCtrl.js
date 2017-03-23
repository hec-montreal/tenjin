tenjinApp.controller('ExternalImportModalCtrl', ['$scope', '$rootScope', '$uibModalInstance', 'SyllabusService', 'AlertService', function($scope, $rootScope, $uibModalInstance, SyllabusService, AlertService) {
	'use strict';

	$scope.data = { 
		siteId : ""
	};
	
	$scope.confirm = false;

	$scope.ok = function() {
		if (!$scope.confirm) {
			$scope.confirm = true;
		} else {
			$scope.loading = true;

			// see managementCtrl
			$rootScope.$broadcast('import', {
				data: $scope.data
			});
		}
	};
	
	/**
	 * When import is complete
	 */
	$rootScope.$on('imported', function() {
		$uibModalInstance.dismiss('cancel');
	});

	/**
	 * Callback cancel button
	 */
	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
}]);
