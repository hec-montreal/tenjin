tenjinApp.directive('textElement', function() {
    'use strict';

    return {
        scope: {
            element: '=textElement'
        },

        restrict: 'A',

        templateUrl: 'element/textElement/textElement.html',

        controller: function($scope) {

        }
    };
});