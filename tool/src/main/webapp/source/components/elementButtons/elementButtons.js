tenjinApp.directive('elementButtons', ["ModalService", "SyllabusService", function(ModalService, SyllabusService) {
    'use strict';

    return {
        scope: {
            element: '=elementButtons',
            noedit: '=noedit',
            nodelete: '=nodelete',
            nodrag: '=nodrag',
            disabled: '=disabled'
        },

        restrict: 'A',

        templateUrl: 'elementButtons/elementButtons.html',

        controller: function($scope) {
            $scope.modalService = ModalService;
            $scope.syllabusService = SyllabusService;

            $scope.confirmDelete = function($element) {
                var parent = this.syllabusService.getParent($element);
                var modal = this.modalService.confirmDelete(parent, $element);
                modal.result.then(function(selectedItem) {

                }, function() {

                });
            };

            $scope.edit = function($element) {
                var parent = this.syllabusService.getParent($element);
                var modal = this.modalService.editElement(parent, $element);

                modal.result.then(function(selectedItem) {

                }, function() {

                });
            }
        }
    };
}]);