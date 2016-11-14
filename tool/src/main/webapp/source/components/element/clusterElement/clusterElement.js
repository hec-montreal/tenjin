tenjinApp.directive('clusterElement', ['TreeService', function(TreeService) {
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
