
opensyllabusApp.directive('toolElement', function (){
    'use strict';

    return {
        scope: {
            element: '=toolElement'
        },
        restrict: 'A',
        templateUrl: 'element/toolElement/toolElement.html',
        controller: function ($scope) {

        },
        link: function ($scope, $element) {
        }

    };

});

