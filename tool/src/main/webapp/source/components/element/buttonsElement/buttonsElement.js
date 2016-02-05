
opensyllabusApp.directive('buttonsElement', ['ModalService', 'SyllabusService', function (ModalService, SyllabusService){
  'use strict';

    return {
        scope: {},
        restrict: 'E',
        templateUrl: 'element/buttonsElement/buttonsElement.html',
        controller: function () {

            this.syllabusService = SyllabusService;

            this.confirmDelete = function($element) {

                var parent = SyllabusService.getParent($element);
                // Création modale
                var modal = ModalService.confirmDelete(parent, $element);
                // Traitement du résultat
                modal.result.then(function (selectedItem) {
                    console.debug('élément supprimé');
                }, function () {
                    console.debug('élément toujours là');
                });
            };

            this.edit = function($element) {

                var parent = SyllabusService.getParent($element);
                // Création modale
                var modal = ModalService.editElement(parent, $element);

                // Traitement du résultat
                modal.result.then(function (selectedItem) {
                    console.debug('élément modifié');
                }, function () {
                    console.debug('élément toujours là');
                });
            };


        },
        bindToController: {
            element: '=',
            noedit: '='
        },
        controllerAs: 'buttonsElementCtrl'

    };

}]);
