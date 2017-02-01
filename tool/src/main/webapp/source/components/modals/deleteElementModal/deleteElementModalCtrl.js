tenjinApp.controller('DeleteElementModalCtrl', ['$scope', '$uibModalInstance', 'parent', 'element', function($scope, $uibModalInstance, parent, element) {
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
