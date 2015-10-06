
opensyllabusApp.directive('buttonsElement', ['ModalService', function (ModalService){
    'use strict';

    return {
        scope: {
            element: '=buttonsElement'
        },
        restrict: 'A',
        templateUrl: '/opensyllabus2-tool/views/buttonsElement.html',
        controller: function ($scope) {

            $scope.confirmDelete = function(element) {
                // Création modale
                var modal = ModalService.confirmDelete(element);
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

