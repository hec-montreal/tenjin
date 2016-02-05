
opensyllabusApp.directive('evaluationAttrElement', function (){
    'use strict';

    return {
        scope: {
            element: '=evaluationAttrElement'
        },
        restrict: 'A',
        templateUrl: 'element/evaluationAttrElement/evaluationAttrElement.html',
        controller: function ($scope) {

        },
        link: function ($scope, $element) {
        	$scope.slash = '/';
        	$scope.team = 'team';
        	$scope.individual = 'individual';
        }

    };

});

