
opensyllabusApp.directive('buttonsElement', ['$anchorScroll', '$location', 'ModalService', function ($anchorScroll, $location, ModalService){
    'use strict';

    return {
        scope: {
            element: '=buttonsElement'
        },
        restrict: 'A',
        templateUrl: 'buttonsElement.html',
        controller: function ($scope) {

            $scope.confirmDelete = function($event, $element) {
                // scroll to the top
                // $location.hash('body');
                // $anchorScroll();
                // window.scrollTo(0,0);

                // Création modale
                var modal = ModalService.confirmDelete($event, $element);
                // Traitement du résultat
                modal.result.then(function (selectedItem) {
                    console.debug('élément supprimé');
                }, function () {
                    console.debug('élément toujours là');
                });
            };


        },
        link: function ($scope, $element) {

        }

    };

}]);

