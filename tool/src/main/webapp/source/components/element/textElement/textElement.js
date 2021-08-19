tenjinApp.directive('textElement',  ['$sce', function($sce) {
    'use strict';

    return {
        scope: true,

        restrict: 'A',

        templateUrl: 'element/textElement/textElement.html',

        controller: function($scope) {
        }
    };
}]);
