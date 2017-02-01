tenjinApp.controller('UnassignSectionsModalCtrl', ['$scope', '$uibModalInstance', function($scope, $uibModalInstance) {
	'use strict';

	$scope.ok = function() {
		$uibModalInstance.close('');
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
}]);
