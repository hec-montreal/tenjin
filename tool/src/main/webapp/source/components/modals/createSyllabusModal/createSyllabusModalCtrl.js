tenjinApp.controller('CreateSyllabusModalCtrl', ['$scope', '$uibModalInstance', '$translate', 'SyllabusService', 'UserService', function($scope, $uibModalInstance, $translate, SyllabusService, UserService) {
	'use strict';

	// Init syllabus data : name of syllabus + sections
	$scope.data = {
		name: '',
		sections: []
	};

	$scope.error = null;

	// Get user sections with write permissions
	for (var i = 0; i < UserService.getProfile().sectionAssign.length; i++) {
		var sectionUser = UserService.getProfile().sectionAssign[i];
		var section = angular.copy(sectionUser);
		var syllabusList = SyllabusService.getSyllabusList();

		for (var j = 0; j < syllabusList.length; j++) {
			if (syllabusList[j].sections.indexOf(section.id) > -1) {
				section.assignedSyllabus = syllabusList[j];
				break;
			}
		}

		$scope.data.sections.push(section);
	}

	/**
	 * Callback ok button
	 */
	$scope.ok = function() {
		if(!$scope.data.name || $scope.data.name.length === 0) {
			$scope.error = $translate.instant('ERROR_TITLE_MANDATORY');
		} else{
			$scope.error = null;

			$uibModalInstance.close($scope.data);
		}
	};

	/**
	 * Callback cancel button
	 */
	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
}]);
