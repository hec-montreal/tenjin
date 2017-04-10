tenjinApp.directive('evaluationattrElement', function() {
    'use strict';

    return {
        scope: {
            element: '=evaluationattrElement'
        },

        restrict: 'A',

        templateUrl: 'element/evaluationattrElement/evaluationattrElement.html',

        controller: function($scope) {
             console.log($scope.element.attributes);
        },

        link: function($scope, $element) {
            $scope.slash = '/';
            $scope.team = 'team';
            $scope.individual = 'individual';
           
        }
    };
});