
opensyllabusApp.directive('toolElementForm', function (){
    'use strict';

    return {
        scope: {
            element: '=toolElementForm'
        },
        restrict: 'A',
        templateUrl: 'form/toolElementForm/toolElementForm.html',
        controller: function ($scope) {

        },
        link: function ($scope, $element) {
        }

    };

});

