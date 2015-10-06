
opensyllabusApp.directive('textElement', function (){
    'use strict';

    return {
        scope: {
            element: '=textElement'
        },
        restrict: 'A',
        templateUrl: '/opensyllabus2-tool/views/textElement.html',
        controller: function ($scope) {

        },
        link: function ($scope, $element) {
        }

    };

});

