tenjinApp.directive('rubricElement', function() {
    'use strict';

    return {
        scope: {
            element: '=rubricElement'
        },

        restrict: 'A',

        templateUrl: 'element/rubricElement/rubricElement.html',

        controller: function($scope) {

        },

        link: function($scope, $element) {

        }
    };
});
