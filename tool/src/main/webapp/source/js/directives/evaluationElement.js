
opensyllabusApp.directive('evaluationElement', function (){
    'use strict';

    return {
        scope: {
            element: '=evaluationElement'
        },
        restrict: 'A',
        templateUrl: 'evaluationElement.html',
        controller: function ($scope) {

        },
        link: function ($scope, $element) {
        }

    };

});

