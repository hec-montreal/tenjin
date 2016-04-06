
opensyllabusApp.directive('regroupementElement', ['SyllabusService', 'TreeService', function (SyllabusService, TreeService){
    'use strict';

    return {
        scope: {
            element: '=regroupementElement'
        },
        restrict: 'A',
        templateUrl: 'element/regroupementElement/regroupementElement.html',
        controller: function ($scope) {
            $scope.syllabusService = SyllabusService;
            $scope.treeService = TreeService;
        },
        link: function ($scope, $element) {
        }

    };

}]);

