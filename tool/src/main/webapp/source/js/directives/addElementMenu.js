
opensyllabusApp.directive('addElementMenu', ['ModalService', 'SyllabusService', 'TreeService' ,'$document', '$timeout',  function (ModalService, SyllabusService, TreeService, $document, $timeout){
    'use strict';

    return {
        scope: {
            element: '=addElementMenu'
        },
        restrict: 'A',
        templateUrl: 'addElementMenu.html',
        controller: function ($scope) {

            // $scope.$on("templateLoaded", $scope.update);


        },
        link: function ($scope, $element) {

            $scope.showMenuAjouter = false;
            $scope.isDisabled = true;

            // $scope.types = [ 
            //     { type: "text", libelle: "TYPE_ELEMENT_TEXTE" } , 
            //     { type: "document", libelle: "TYPE_ELEMENT_DOCUMENT"},
            //     { type: "contact", libelle: "TYPE_ELEMENT_CONTACT"},
            //     { type: "hyperlink", libelle: "TYPE_ELEMENT_HYPERLINK"},
            //     { type: "citation", libelle: "TYPE_ELEMENT_CITATION"},
            //     { type: "image", libelle: "TYPE_ELEMENT_IMAGE"},
            //     { type: "video", libelle: "TYPE_ELEMENT_VIDEO"},
            //     { type: "sakai_tool", libelle: "TYPE_ELEMENT_SAKAI_TOOL"},
            //     { type: "evaluation", libelle: "TYPE_ELEMENT_EVALUATION"}
            // ];

            $scope.update = function() {

                // console.log('update : ' + $scope.element.id);

                var template = SyllabusService.getTemplate();
                var selectedItem2 = TreeService.getSelectedItem();
                var selectedItem = $scope.element;
                var templateSelectedItem = template[selectedItem.templateElementId];

                $scope.types = [];

                if (templateSelectedItem) {

                    for (var i = 0; i < templateSelectedItem.length; i++) {
                        $scope.types.push( { type: templateSelectedItem[i].type, libelle: templateSelectedItem[i].label });
                    }  
                    $scope.isDisabled = false;   
                } else {
                    // si aucun template n'existe pour l'élément, on désactive le bouton "Ajouter"
                    $scope.isDisabled = true; 
                }

                
                
            };

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


            $scope.$on('selectedItemChanged', function(event) { 
                $scope.update();
            });


        }

    };

}]);

