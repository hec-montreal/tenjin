
opensyllabusApp.directive('clusterElement', ['SyllabusService', 'TreeService', function (SyllabusService, TreeService){
    'use strict';

    return {
        scope: {
            element: '=clusterElement'
        },
        restrict: 'A',
        templateUrl: 'element/clusterElement/clusterElement.html',
        controller: function ($scope) {
            $scope.syllabusService = SyllabusService;
            $scope.treeService = TreeService;
        },
        link: function ($scope, $element) {
        }

    };

}]);

