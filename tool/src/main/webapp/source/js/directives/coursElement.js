
opensyllabusApp.directive('coursElement', ['TreeService', function (TreeService){
    'use strict';

    return {
        scope: {
            element: '=coursElement'
        },
        restrict: 'A',
        templateUrl: 'coursElement.html',
        controller: function ($scope) {

        },
        link: function ($scope, $element) {
        	$scope.treeService = TreeService;
        }

    };

}]);

