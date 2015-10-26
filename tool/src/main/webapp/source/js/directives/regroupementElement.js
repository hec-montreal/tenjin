
opensyllabusApp.directive('regroupementElement', function (){
    'use strict';

    return {
        scope: {
            element: '=regroupementElement'
        },
        restrict: 'A',
        templateUrl: 'regroupementElement.html',
        controller: function ($scope) {

        },
        link: function ($scope, $element) {
        }

    };

});

