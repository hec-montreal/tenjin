
opensyllabusApp.directive('textElement', function (){
    'use strict';

    return {
        scope: {
            element: '=textElement'
        },
        restrict: 'A',
        templateUrl: 'textElement.html',
        controller: function ($scope) {

        },
        link: function ($scope, $element) {
        }

    };

});

