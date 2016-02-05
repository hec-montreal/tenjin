
opensyllabusApp.directive('evaluationElement', ['TreeService', 'variables', function (TreeService, variables){
    'use strict';

    return {
        scope: {
            element: '=evaluationElement',
            index: '='
        },
        restrict: 'A',
        templateUrl: 'element/evaluationElement/evaluationElement.html',
        controller: function ($scope) {
            $scope.variables = variables;
        },
        link: function ($scope, $element) {
        	$scope.treeService = TreeService;
        }

    };

}]);

