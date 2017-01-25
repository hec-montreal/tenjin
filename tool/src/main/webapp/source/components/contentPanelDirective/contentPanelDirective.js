tenjinApp.directive('contentPanelDirective', ['SyllabusService', 'UserService', function(SyllabusService, UserService) {
    'use strict';

    return {
        scope: {
            element: '=contentPanelDirective',
            index: '='
        },

        restrict: 'A',

        templateUrl: 'contentPanelDirective/contentPanelDirective.html',

        controller: function($scope) {
            $scope.syllabusService = SyllabusService;
            $scope.userService = UserService;

            var template = $scope.syllabusService.template[$scope.element.templateStructureId];

            $scope.displayButtons = {
                deleteButton: function() {
                    return ($scope.userService.isAllowed('syllabusWrite', $scope.syllabusService.syllabus) &&
                            !$scope.syllabusService.template[$scope.element.templateStructureId].mandatory) &&
                        ($scope.syllabusService.syllabus.common ||
                            (!$scope.syllabusService.syllabus.common &&
                                !$scope.element.common));
                },

                editButton: function() {
                    return ($scope.element.type !== 'rubric') &&
                        (($scope.syllabusService.syllabus.common &&
                                $scope.userService.isAllowed('syllabusWrite', $scope.syllabusService.syllabus) &&
                                !$scope.syllabusService.template[$scope.element.templateStructureId].mandatory) ||
                            (!$scope.syllabusService.syllabus.common &&
                                $scope.userService.isAllowed('syllabusWrite', $scope.syllabusService.syllabus) &&
                                !$scope.element.common &&
                                !$scope.syllabusService.template[$scope.element.templateStructureId].mandatory));

                },

                dragButton: function() {
                    return ($scope.element.type !== 'rubric');
                }
            };
        }
    };
}]);