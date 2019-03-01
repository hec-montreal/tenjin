tenjinApp.controller('MakeSyllabusCommonCtrl', ['$scope', '$rootScope', '$uibModalInstance', 'params', function($scope, $rootScope, $uibModalInstance, params) {
	'use strict';

	$scope.data = { 
		syllabusId : params.syllabusId
	};

    $scope.ok = function() {
		$scope.loading = true;

		// see managementCtrl
		$rootScope.$broadcast('makeCommon', {
			data: $scope.data
		});
	};
	
	/**
	 * When import is complete
	 */
	$rootScope.$on('newCommonComplete', function() {
		$uibModalInstance.dismiss('cancel');
	});

	/**
	 * Callback cancel button
	 */
	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
}]);