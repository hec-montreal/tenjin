
opensyllabusApp.directive('textElement', function (){
    'use strict';

    return {
        scope: {
            element: '='
        },
        restrict: 'A',
        templateUrl: '/opensyllabus2-tool/views/textElement.html',
        controller: function ($scope) {
            
        }
    };

});

