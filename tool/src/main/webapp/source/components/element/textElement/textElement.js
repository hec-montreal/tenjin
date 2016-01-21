
opensyllabusApp.directive('textElement', ['variables', function (variables){
    'use strict';

    return {
        scope: {
            element: '=textElement'
        },
        restrict: 'A',
        templateUrl: 'element/textElement/textElement.html',
        controller: function ($scope) {
            $scope.variables = variables;
        },
        link: function ($scope, $element) {
            
        }

    };

}]);

