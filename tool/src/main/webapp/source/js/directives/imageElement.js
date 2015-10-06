
opensyllabusApp.directive('imageElement', function (){
    'use strict';

    return {
        scope: {
            element: '=imageElement'
        },
        restrict: 'A',
        templateUrl: '/opensyllabus2-tool/views/imageElement.html',
        controller: function ($scope) {

        },
        link: function ($scope, $element) {

        }

    };

});

