tenjinApp.directive('clusterElement', ['TreeService', function(TreeService) {
    'use strict';

    return {
        scope: {
            element: '=clusterElement'
        },

        restrict: 'A',

        templateUrl: 'element/clusterElement/clusterElement.html',

        controller: function($scope) {
            $scope.treeService = TreeService;
        },

        link: function($scope, $element) {

        }
    };
}]);
