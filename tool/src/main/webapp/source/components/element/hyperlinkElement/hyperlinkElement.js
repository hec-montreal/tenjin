
opensyllabusApp.directive('hyperlinkElement', function (){
    'use strict';

    return {
        scope: {
            element: '=hyperlinkElement'
        },
        restrict: 'A',
        templateUrl: 'element/hyperlinkElement/hyperlinkElement.html',
        controller: function ($scope) {

        },
        link: function ($scope, $element) {
        }

    };

});

