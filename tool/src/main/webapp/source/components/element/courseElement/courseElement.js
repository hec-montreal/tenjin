tenjinApp.directive('courseElement', ["TreeService", function(TreeService) {
    'use strict';

    return {
        scope: {
            element: '=courseElement'
        },

        restrict: 'A',

        templateUrl: 'element/courseElement/courseElement.html',

        controller: function($scope) {
            $scope.treeService = TreeService;
        }
    };
}]);