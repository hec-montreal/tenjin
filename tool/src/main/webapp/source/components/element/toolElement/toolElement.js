
opensyllabusApp.directive('toolElement', ['variables', function (variables){
    'use strict';

    return {
        scope: {
            element: '=toolElement'
        },
        restrict: 'A',
        templateUrl: 'toolElement.html',
        controller: function ($scope) {
            $scope.variables = variables; 
        },
        link: function ($scope, $element) {
        }

    };

}]);

