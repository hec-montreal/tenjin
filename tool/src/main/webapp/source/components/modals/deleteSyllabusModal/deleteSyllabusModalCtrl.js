tenjinApp.controller('DeleteSyllabusModalCtrl', ['$scope', '$uibModalInstance', 'syllabusList', function($scope, $uibModalInstance, syllabusList) {
	'use strict';

	$scope.syllabusList = syllabusList.syllabusList;

	$scope.syllabusToDelete = [];
	$scope.syllabusNotToDelete = []; // syllabus with assigned sections can't be deleted

	// Initialize a list with syllabus which can be deleted, and another which cannot be deleted
	for (var i = 0; i < $scope.syllabusList.length; i++) {
		if ($scope.syllabusList[i].sections.length === 0) {
			$scope.syllabusToDelete.push($scope.syllabusList[i]);
		} else if ($scope.syllabusList[i].sections.length > 0) {
			$scope.syllabusNotToDelete.push($scope.syllabusList[i]);
		}
	}

	$scope.ok = function() {
		$uibModalInstance.close($scope.syllabusToDelete);
	};

	/**
	 * Callback cancel button
	 */
	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
}]);
