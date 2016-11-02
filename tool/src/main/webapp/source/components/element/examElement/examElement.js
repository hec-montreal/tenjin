tenjinApp.directive('examElement', ['SyllabusService', 'TreeService', function(SyllabusService, TreeService) {
    'use strict';

    return {
        scope: {
            element: '=examElement',
            index: '='
        },

        restrict: 'A',

        templateUrl: 'element/examElement/examElement.html',

        controller: function($scope) {
            $scope.syllabusService = SyllabusService;
            $scope.treeService = TreeService;
        },

        link: function($scope, $element) {
            $scope.treeService = TreeService;
        }
    };
}]);