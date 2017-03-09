tenjinApp.controller('CopySyllabusModal', ['$scope', '$rootScope', '$uibModalInstance', '$translate', 'syllabusId', function($scope, $rootScope, $uibModalInstance, $translate, syllabusId) {
	'use strict';

	// Init syllabus data : name of syllabus + sections
	$scope.data = {
		name: $translate.instant('CREATE_SYLLABUS_DEFAULT_NAME')
	};

	$scope.loading = false;

	/**
	 * Callback ok button
	 */
	$scope.ok = function() {
		$scope.loading = true;

		var data = {
			syllabusId: syllabusId.syllabusId,
			name: $scope.data.name
		};

		$rootScope.$broadcast('copy', {
			data: data
		});
	};

	/**
	 * Callback cancel button
	 */
	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};

	$rootScope.$on('copied', function() {
		$uibModalInstance.dismiss('cancel');
	});
}]);
