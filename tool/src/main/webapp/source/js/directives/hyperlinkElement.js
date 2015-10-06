
opensyllabusApp.directive('hyperlinkElement', function (){
    'use strict';

    return {
        scope: {
            element: '=hyperlinkElement'
        },
        restrict: 'A',
        templateUrl: '/opensyllabus2-tool/views/hyperlinkElement.html',
        controller: function ($scope) {

        },
        link: function ($scope, $element) {
        }

    };

});

