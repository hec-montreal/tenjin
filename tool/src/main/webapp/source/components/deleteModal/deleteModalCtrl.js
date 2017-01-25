tenjinApp.controller('DeleteModalCtrl', ['$scope', '$uibModalInstance', 'parent', 'element', 'SyllabusService', 'TreeService', 'AlertService', function($scope, $uibModalInstance, parent, element, SyllabusService, TreeService, AlertService) {
	'use strict';

	$scope.element = element;
	$scope.parent = parent;

	$scope.ok = function() {
		// We copy the current syllabus
		var data = angular.copy(SyllabusService.syllabus);
		var location = TreeService.selectedItem.$location;

		SyllabusService.deleteElementFromSyllabus(data, $scope.parent, $scope.element);

		SyllabusService.save(data).then(function(response) {
			SyllabusService.setSyllabus(response);
			TreeService.setSelectedItemFromLocation(location);
		}).catch(function(error) {
			AlertService.showAlert('cannotSaveSyllabus');
		});

		$uibModalInstance.close('');
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
}]);
