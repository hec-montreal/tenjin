
opensyllabusApp.directive('regroupementElement', ['TreeService', function (TreeService){
    'use strict';

    return {
        scope: {
            element: '=regroupementElement'
        },
        restrict: 'A',
        templateUrl: 'element/regroupementElement/regroupementElement.html',
        controller: function ($scope) {

        },
        link: function ($scope, $element) {
        	$scope.treeService = TreeService;
        }

    };

}]);

