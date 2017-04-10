tenjinApp.directive('examattrElement', function() {
    'use strict';

    return {
        scope: {
            element: '=examattrElement'
        },

        restrict: 'A',

        templateUrl: 'element/examattrElement/examattrElement.html',

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