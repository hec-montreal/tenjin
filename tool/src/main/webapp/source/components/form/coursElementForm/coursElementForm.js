
opensyllabusApp.directive('coursElementForm', function (){
    'use strict';

    return {
        scope: {
            element: '=coursElementForm'
        },
        restrict: 'A',
        templateUrl: 'form/coursElementForm/coursElementForm.html',
        controller: function ($scope) {

        },
        link: function ($scope, $element) {

        }

    };

});

