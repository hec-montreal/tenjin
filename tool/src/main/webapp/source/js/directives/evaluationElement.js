
opensyllabusApp.directive('evaluationElement', ['TreeService', function (TreeService){
    'use strict';

    return {
        scope: {
            element: '=evaluationElement'
        },
        restrict: 'A',
        templateUrl: 'evaluationElement.html',
        controller: function ($scope) {

        },
        link: function ($scope, $element) {
        	$scope.treeService = TreeService;
        }

    };

}]);

