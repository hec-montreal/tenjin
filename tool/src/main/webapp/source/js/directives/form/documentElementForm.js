
opensyllabusApp.directive('documentElementForm', function (){
    'use strict';

    return {
        scope: {
            element: '=documentElementForm'
        },
        restrict: 'A',
        templateUrl: 'documentElementForm.html',
        controller: function ($scope) {

        },
        link: function ($scope, $element) {
        }

    };

});

