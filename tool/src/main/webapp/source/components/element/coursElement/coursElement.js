
opensyllabusApp.directive('coursElement', ['TreeService', 'variables', function (TreeService, variables){
    'use strict';

    return {
        scope: {
            element: '=coursElement'
        },
        restrict: 'A',
        templateUrl: 'coursElement.html',
        controller: function ($scope) {
            $scope.variables = variables;
        },
        link: function ($scope, $element) {
        	$scope.treeService = TreeService;
        }

    };

}]);

