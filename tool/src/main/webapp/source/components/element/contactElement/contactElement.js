﻿opensyllabusApp.directive('contactElement', ['variables', function (variables){
    'use strict';

    return {
        scope: {
            element: '=contactElement'
        },
        // scope: true,
        restrict: 'A',
        templateUrl: 'element/contactElement/contactElement.html',
        controller: function ($scope) {
            $scope.variables = variables;
        }        
    };

}]);
