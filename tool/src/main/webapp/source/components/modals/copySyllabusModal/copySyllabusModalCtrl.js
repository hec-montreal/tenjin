tenjinApp.controller('CopySyllabusModal', ['$scope', '$rootScope', '$uibModalInstance', '$translate', 'syllabusToCopy', function($scope, $rootScope, $uibModalInstance, $translate, syllabusToCopy) {
	'use strict';

	// Init syllabus data : name of syllabus + sections
	$scope.data = {
		name: $translate.instant('COPY_DEFAULT_NAME_PREFIX') + ' ' + syllabusToCopy.title
	};

	$scope.loading = false;

	/**
	 * Callback ok button
	 */
	$scope.ok = function() {
		$scope.loading = true;

		var data = {
			syllabusId: syllabusToCopy.id,
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
