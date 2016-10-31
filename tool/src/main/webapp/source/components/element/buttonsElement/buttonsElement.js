tenjinApp.directive('buttonsElement', ["ModalService", "SyllabusService", function(ModalService, SyllabusService) {
    'use strict';

    return {
        scope: {
            element: '=buttonsElement',
            noedit: '=noedit',
            nodelete: '=nodelete',
            nodrag: '=nodrag',
            disabled: '=disabled'
        },

        restrict: 'A',

        templateUrl: 'element/buttonsElement/buttonsElement.html',

        controller: function($scope) {
            $scope.modalService = ModalService;
            $scope.syllabusService = SyllabusService;

            $scope.confirmDelete = function($element) {
                var parent = this.syllabusService.getParent($element);
                // Creation modal
                var modal = this.modalService.confirmDelete(parent, $element);
                // Processing result
                modal.result.then(function(selectedItem) {
                    // console.debug('element modified');
                }, function() {
                    // 
                });
            }
        },

        link: function($scope, $element) {

        }
    };
}]);