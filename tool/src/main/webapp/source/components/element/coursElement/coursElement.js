
opensyllabusApp.directive('coursElement', ['SyllabusService', 'TreeService', function (SyllabusService, TreeService){
    'use strict';

    return {
        scope: {
            element: '=coursElement'
        },
        restrict: 'A',
        templateUrl: 'element/coursElement/coursElement.html',
        controller: function ($scope) {
            $scope.syllabusService = SyllabusService;
            $scope.treeService = TreeService;
        },
        link: function ($scope, $element) {
        }

    };

}]);

