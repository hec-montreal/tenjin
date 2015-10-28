
opensyllabusApp.directive('addElementMenu', ['ModalService', '$document',  function (ModalService, $document){
    'use strict';

    return {
        scope: {
            element: '=addElementMenu'
        },
        restrict: 'A',
        templateUrl: 'addElementMenu.html',
        controller: function ($scope) {

        },
        link: function ($scope, $element) {

            $scope.showMenuAjouter = false;

            // TODO : définir la liste des éléments que l'on peut ajouter en fonction du template
            $scope.types = ["Texte", "Document", "Hyperlien"];

            $scope.toggleMenu = function(){
                $scope.showMenuAjouter = $scope.showMenuAjouter === false ? true : false;
            };

            $scope.addElement = function(type) {

                // hide menu
                $scope.showMenuAjouter = false;

                // TODO : open edition popup
                
            };

            $element.on('click', function(e) {
              e.stopPropagation();
            });

            var onClick = function() {
                // hide menu
                if ($scope.showMenuAjouter) {
                    $scope.$apply($scope.showMenuAjouter = false);
                }
            };

            $document.on('click', onClick);

            $scope.$on('$destroy', function() {
                $document.off('click', onClick);
            });

        }

    };

}]);

