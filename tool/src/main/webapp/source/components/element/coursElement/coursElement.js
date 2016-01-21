
opensyllabusApp.directive('coursElement', ['TreeService', 'variables', function (TreeService, variables){
    'use strict';

    return {
        scope: {
            element: '=coursElement'
        },
        restrict: 'A',
        templateUrl: 'element/coursElement/coursElement.html',
        controller: function ($scope) {
            $scope.variables = variables;
        },
        link: function ($scope, $element) {
        	$scope.treeService = TreeService;
        }

    };

}]);

