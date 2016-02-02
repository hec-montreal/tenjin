opensyllabusApp.directive('contactElement', ['variables', function (variables){
    'use strict';

    return {
        scope: {
            element: '=contactElement'
        },
        // scope: true,
        restrict: 'A',
        templateUrl: 'contactElement.html',
        controller: function ($scope) {
            $scope.variables = variables;
        }        
    };

}]);
