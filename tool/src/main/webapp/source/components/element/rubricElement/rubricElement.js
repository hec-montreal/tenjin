
opensyllabusApp.directive('rubricElement', ['variables', function (variables){
    'use strict';

    return {
        scope: {
            element: '=rubricElement'
        },
        restrict: 'A',
        templateUrl: 'element/rubricElement/rubricElement.html',
        controller: function ($scope) {
            $scope.variables = variables;
        },
        link: function ($scope, $element) {
        }

    };

}]);

