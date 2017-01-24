tenjinApp.controller('UnassignSectionsModalCtrl', ['$scope', '$uibModalInstance', function($scope, $uibModalInstance, parent, element, SyllabusService, TreeService, AlertService) {
	'use strict';

	$scope.ok = function() {
		$uibModalInstance.close('');
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
}]);
