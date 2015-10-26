
opensyllabusApp.directive('coursElement', function (){
    'use strict';

    return {
        scope: {
            element: '=coursElement'
        },
        restrict: 'A',
        templateUrl: 'coursElement.html',
        controller: function ($scope) {

        },
        link: function ($scope, $element) {
        }

    };

});

