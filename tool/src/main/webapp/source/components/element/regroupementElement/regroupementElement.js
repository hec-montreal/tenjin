
opensyllabusApp.directive('regroupementElement', ['TreeService', 'variables', function (TreeService, variables){
    'use strict';

    return {
        scope: {
            element: '=regroupementElement'
        },
        restrict: 'A',
        templateUrl: 'element/regroupementElement/regroupementElement.html',
        controller: function ($scope) {
            $scope.variables = variables; 
        },
        link: function ($scope, $element) {
        	$scope.treeService = TreeService;
        }

    };

}]);

