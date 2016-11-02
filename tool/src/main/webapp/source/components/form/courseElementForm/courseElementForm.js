tenjinApp.directive('courseElementForm', function() {
    'use strict';

    return {
        scope: {
            element: '=courseElementForm'
        },

        restrict: 'A',

        templateUrl: 'form/courseElementForm/courseElementForm.html',

        controller: function($scope) {

        }
    };
});