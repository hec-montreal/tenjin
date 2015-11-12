
opensyllabusApp.directive('evaluationattrElement', function (){
    'use strict';

    return {
        scope: {
            element: '=evaluationattrElement'
        },
        restrict: 'A',
        templateUrl: 'evaluationattrElement.html',
        controller: function ($scope) {

        },
        link: function ($scope, $element) {
        	$scope.slash = '/';
        	$scope.team = 'team';
        	$scope.individual = 'individual';
        }

    };

});

