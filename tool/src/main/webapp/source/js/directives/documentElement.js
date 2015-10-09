
opensyllabusApp.directive('documentElement', function (){
    'use strict';

    return {
        scope: {
            element: '=documentElement'
        },
        restrict: 'A',
        templateUrl: 'documentElement.html',
        controller: function ($scope) {

        },
        link: function ($scope, $element) {
        }

    };

});

