tenjinApp.controller('UnpublishSyllabusModalCtrl', ['$scope', '$uibModalInstance', 'syllabusList', function($scope, $uibModalInstance, syllabusList) {
	'use strict';

	$scope.syllabusList = syllabusList.syllabusList;

	$scope.syllabusToUnpublish = [];

	// Initialize a list with syllabus which to unpublished
	for (var i = 0; i < $scope.syllabusList.length; i++) {
		if ($scope.syllabusList[i].publishedDate) {
			$scope.syllabusToUnpublish.push($scope.syllabusList[i]);
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
