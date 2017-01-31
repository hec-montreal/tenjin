tenjinApp.controller('DeleteElementModalCtrl', ['$scope', '$uibModalInstance', 'parent', 'element', 'SyllabusService', 'TreeService', 'AlertService', function($scope, $uibModalInstance, parent, element, SyllabusService, TreeService, AlertService) {
	'use strict';

	$scope.element = element;
	$scope.parent = parent;

	$scope.ok = function() {
		$uibModalInstance.close();
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
}]);
