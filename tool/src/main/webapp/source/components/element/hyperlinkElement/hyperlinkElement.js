
opensyllabusApp.directive('hyperlinkElement', ['variables', function (variables){
    'use strict';

    return {
        scope: {
            element: '=hyperlinkElement'
        },
        restrict: 'A',
        templateUrl: 'hyperlinkElement.html',
        controller: function ($scope) {
            $scope.variables = variables;
        },
        link: function ($scope, $element) {
        }

    };

}]);

