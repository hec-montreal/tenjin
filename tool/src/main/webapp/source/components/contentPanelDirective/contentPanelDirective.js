tenjinApp.directive('contentPanelDirective', ['SyllabusService', function(SyllabusService) {
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

            var template = $scope.syllabusService.template[$scope.element.templateStructureId];

            $scope.displayButtons = {
                deleteButton: function() {
                    return ($scope.syllabusService.syllabus.$writePermission &&
                            !$scope.syllabusService.template[$scope.element.templateStructureId].mandatory) &&
                        ($scope.syllabusService.syllabus.common ||
                            (!$scope.syllabusService.syllabus.common &&
                                !$scope.element.common));
                },

                editButton: function() {
                    return ($scope.element.type !== 'rubric') &&
                        (($scope.syllabusService.syllabus.common &&
                                $scope.syllabusService.syllabus.$writePermission &&
                                !$scope.syllabusService.template[$scope.element.templateStructureId].mandatory) ||
                            (!$scope.syllabusService.syllabus.common &&
                                $scope.syllabusService.syllabus.$writePermission &&
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