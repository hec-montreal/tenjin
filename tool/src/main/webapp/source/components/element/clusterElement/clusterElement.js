tenjinApp.directive('clusterElement', ['TreeService', 'SyllabusService', function(TreeService, SyllabusService) {
	'use strict';

	return {
		scope: true,

		restrict: 'A',

		templateUrl: 'element/clusterElement/clusterElement.html',

		controller: function($scope) {
			$scope.treeService = TreeService;
		}
	};
}]);
