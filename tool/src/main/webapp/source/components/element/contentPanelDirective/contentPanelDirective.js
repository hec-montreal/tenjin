
opensyllabusApp.directive('contentPanelDirective', ['SyllabusService', function (SyllabusService){
    'use strict';

    return {
        scope: {
            element: '=contentPanelDirective',
            index: '='
        },
        restrict: 'A',
        templateUrl: 'element/contentPanelDirective/contentPanelDirective.html',
        controller: function ($scope) {
            $scope.syllabusService = SyllabusService;

            $scope.displayButtons = {
                deleteButton : function() {
                    // if the user has write permission 
                    // AND if the element is not mandatory
                    // AND 
                    // ( syllabus is the common one 
                    // OR 
                    // ( syllabus is not the common one AND the element is not provided by the common) )
                    return ($scope.syllabusService.syllabus.$writePermission &&
                        !$scope.syllabusService.template[$scope.element.templateStructureId].mandatory) &&
                        ( $scope.syllabusService.syllabus.common || 
                          ( !$scope.syllabusService.syllabus.common  &&
                          !$scope.element.common) );   
                },
                editButton : function() {
                    return ($scope.element.type !=='rubric') &&
                    ( ($scope.syllabusService.syllabus.common &&
                        $scope.syllabusService.syllabus.$writePermission &&
                        !$scope.syllabusService.template[$scope.element.templateStructureId].mandatory) || 
                        (!$scope.syllabusService.syllabus.common && 
                        $scope.syllabusService.syllabus.$writePermission && 
                        !$scope.element.common && 
                        !$scope.syllabusService.template[$scope.element.templateStructureId].mandatory) );
                    
                },
                dragButton : function() { 
                    return ($scope.element.type !== 'rubric');
                }
            };

        },
        link: function ($scope, $element) {
        }

    };

}]);

