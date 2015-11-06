opensyllabusApp.directive('buttonsForm', ['$anchorScroll', '$location', 'ModalService', function ($anchorScroll, $location, ModalService){
    'use strict';

    return {
        scope: {
            element: '=buttonsForm',
            noedit: '='
        },
        restrict: 'A',
        templateUrl: 'form/buttonsForm.html',
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

            $scope.open = function($event) {
                $scope.status.opened = true;
            };

            // Disable weekend selection
            $scope.disabled = function(date, mode) {
                return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
            };

            $scope.formats = ['dd-MMMM-yyyy HH:mm']; 
            $scope.format = $scope.formats[0];

            $scope.status = {
                opened: false
            };

            $scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };

            // calendrier date retrait
            $scope.statusRetrait = {
                opened: false
            };

            $scope.openRetrait = function($event) {
                $scope.statusRetrait.opened = true;
            };
        },
        link: function ($scope, $element) {

        }

    };

}]);

