tenjinApp.controller('UnpublishSyllabusModalCtrl', ['$scope', '$uibModalInstance', 'syllabusList', function($scope, $uibModalInstance, syllabusList) {
	'use strict';

	$scope.syllabusList = syllabusList.syllabusList;

	$scope.syllabusToUnpublish = [];
	$scope.syllabusNotToUnpublish = []; // syllabus with assigned not published can't be unpublished

	// Initialize a list with syllabus which can be unpublished, and another which cannot be unpublished
	for (var i = 0; i < $scope.syllabusList.length; i++) {
		if ($scope.syllabusList[i].publishedDate) {
			$scope.syllabusToUnpublish.push($scope.syllabusList[i]);
		} else if ($scope.syllabusList[i].sections.length > 0) {
			$scope.syllabusNotToUnpublish.push($scope.syllabusList[i]);
		}
	}

	$scope.ok = function() {
		$uibModalInstance.close($scope.syllabusToUnpublish);
	};

	/**
	 * Callback cancel button
	 */
	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
}]);
