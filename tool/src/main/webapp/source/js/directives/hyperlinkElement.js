
opensyllabusApp.directive('hyperlinkElement', function (){
    'use strict';

    return {
        scope: {
            element: '=hyperlinkElement'
        },
        restrict: 'A',
        templateUrl: 'hyperlinkElement.html',
        controller: function ($scope) {

        },
        link: function ($scope, $element) {
        }

    };

});

