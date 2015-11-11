
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
            // $scope.types = ["Texte", "Document", "Contact", "Hyperlien", "Référence biblio", "Image", "Vidéo", "Lien outil Sakai"];
            // $scope.types = [{type: "text", libelle: "", "document", "contact_info", "hyperlink", "citation", "image", "video", "tool"];

            $scope.types = [ 
                { type: "text", libelle: "TYPE_ELEMENT_TEXTE" } , 
                { type: "document", libelle: "TYPE_ELEMENT_DOCUMENT"},
                
            ];

            $scope.toggleMenu = function(){
                $scope.showMenuAjouter = $scope.showMenuAjouter === false ? true : false;
            };

            $scope.addElement = function($type) {

                // hide menu
                $scope.showMenuAjouter = false;

                // TODO : open edition popup
                var modal = ModalService.createElement($type, $scope.element);

                // Traitement du résultat
                modal.result.then(function (createdItem) {
                    console.debug('élément ajouté');
                }, function () {
                    console.debug('élément non ajouté');
                });
            };

            var onClick = function($event) {
                // hide menu sauf si clic sur "bouton-ajout"    
                var element = document.querySelector('#bouton-ajout');
                // element.querySelector
                // 
                if (angular.element($event.target).prop('id') === "bouton-ajout" || angular.element($event.target).parent().prop('id') === "bouton-ajout") {
                    // rien
                } else {
                    if ($scope.showMenuAjouter) {
                        $scope.$apply($scope.showMenuAjouter = false);
                    }
                }
            };

            $document.on('click', onClick );

            $scope.$on('$destroy', function() {
                $document.off('click', onClick);
            });

        }

    };

}]);

