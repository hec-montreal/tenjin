
opensyllabusApp.directive('courseElement', ['SyllabusService', 'TreeService', function (SyllabusService, TreeService){
    'use strict';

    return {
        scope: {
            element: '=courseElement' 
        },
        restrict: 'A',
        templateUrl: 'element/courseElement/courseElement.html',
        controller: function ($scope) {
            $scope.syllabusService = SyllabusService;
            $scope.treeService = TreeService;
        },
        link: function ($scope, $element) {
        }

    };

}]);

