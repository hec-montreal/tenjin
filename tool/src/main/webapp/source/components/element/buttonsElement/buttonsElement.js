
opensyllabusApp.directive('buttonsElement', ['$anchorScroll', '$location', 'ModalService', 'SyllabusService', function ($anchorScroll, $location, ModalService, SyllabusService){
    'use strict';

    return {
        scope: {
            element: '=buttonsElement',
            noedit: '='
        },
        restrict: 'A',
        templateUrl: 'element/buttonsElement/buttonsElement.html',
        controller: function ($scope) {

            $scope.syllabusService = SyllabusService;

            $scope.confirmDelete = function($element) {
                // scroll to the top
                // $location.hash('body');
                // $anchorScroll();
                // window.scrollTo(0,0);
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

            $scope.edit = function($element) {

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
        link: function ($scope, $element) {

        }

    };

}]);

