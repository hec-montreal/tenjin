
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
            if ($scope.element.attributes.evalDate){
                $scope.element.attributes.evalDate =  new Date($scope.element.attributes.evalDate);
            }
        },
        link: function ($scope, $element) {
        	$scope.treeService = TreeService;
        }

    };

}]);

