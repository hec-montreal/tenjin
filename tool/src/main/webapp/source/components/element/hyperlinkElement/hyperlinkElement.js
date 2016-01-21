
opensyllabusApp.directive('hyperlinkElement', ['variables', function (variables){
    'use strict';

    return {
        scope: {
            element: '=hyperlinkElement'
        },
        restrict: 'A',
        templateUrl: 'element/hyperlinkElement/hyperlinkElement.html',
        controller: function ($scope) {
            $scope.variables = variables;
        },
        link: function ($scope, $element) {
        }

    };

}]);

