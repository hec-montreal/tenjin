tenjinApp.directive('evaluationattrElement', function() {
    'use strict';

    return {
        scope: true,

        restrict: 'A',

        templateUrl: 'element/evaluationattrElement/evaluationattrElement.html',

        controller: function($scope) {

        },

        link: function($scope, $element) {
            $scope.slash = '/';
            $scope.team = 'team';
            $scope.individual = 'individual';
        }
    };
});