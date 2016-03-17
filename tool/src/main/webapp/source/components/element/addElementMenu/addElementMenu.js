
opensyllabusApp.directive('addElementMenu', ['ModalService', 'SyllabusService', 'TreeService', 'AlertService', 'config','$document', '$timeout', '$translate',  function (ModalService, SyllabusService, TreeService, AlertService, config, $document, $timeout, $translate){
    'use strict';

    return {
        scope: {
            element: '=addElementMenu'
        },
        restrict: 'A',
        templateUrl: 'element/addElementMenu/addElementMenu.html',
        controller: function ($scope) {
        },
        link: function ($scope, $element) {
            $scope.showMenuAjouter = false;
            // $scope.isDisabled = true;

            $scope.syllabusService = SyllabusService;
            $scope.treeService = TreeService;

            $scope.toggleMenu = function(){
                $scope.showMenuAjouter = $scope.showMenuAjouter === false ? true : false;
            };

            $scope.addElement = function($type) {

                console.log("type : "+ $type.type );
                $scope.isOpen = false;

                // Si il s'agit d'une rubrique on l'ajoute directement
                if ($type.type === "rubric") {

                    // TODO : si le plan de cours est vide on le sauvegarde
                    // var syllabus = SyllabusService.getSyllabus();
                    // // plan de cours vide
                    // if (!syllabus.id) {       
                    //     // ajout de l'élément au plan de cours
                    //     SyllabusService.addElement($scope.element, $scope.parent);
                    //     // sauvegarde du plan de cours + l'élément en cours
                    // }
                    
                    // Création    
                    var element = {
                        'attributes': {},
                        'type': $type.type,
                        'parentId': $scope.element.id,
                        'templateStructureId': $type.id,
                        'availability_start_date': Date.now(),
                        'title': $type.label,
                        'important': false,
                        'publicElement': true,
                        'common': SyllabusService.syllabus.common
                    };
                    $scope.mode = "creation";

                    var data = angular.copy(SyllabusService.syllabus);
                    var selectedItemId = TreeService.selectedItem.id;
                    var emplacement = TreeService.selectedItem.$emplacement;

                    var result = SyllabusService.addRubricToSyllabus(data, $scope.element, element);

                    if (result > 0) {

                        var savePromise = SyllabusService.save(data);
                        SyllabusService.setWorking(true);

                        savePromise.$promise.then(function($data) {
                            // alert ajout ok
                            AlertService.display('success', $translate.instant('ALERT_SUCCESS_ADD_ELEMENT'));
                            SyllabusService.setSyllabus($data);
                            // refresh the reference of the selected item and refresh the right panel
                            // TreeService.setSelectedItemFromId(selectedItemId);
                            TreeService.setSelectedItemFromEmplacement(emplacement);

                        }, function ($error){
                            // alert ajout ko
                            AlertService.display('danger');

                        }).finally(function() {
                             SyllabusService.setWorking(false);
                        });

                    } else {
                        // Rubrique déjà présente
                        AlertService.display('danger', $translate.instant('ALERT_RUBRIC_EXISTS'));
                    }

                } // Sinon on lance une popup de création de l'élément
                else {

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
                }

            };

            $scope.checkRubricsAlreadyPresent = function() {
                // if there are elements and the first one is a rubric ( so the others would be rubric aswell )
                if ($scope.element.elements) {
                    // reinit
                    for (var k = 0 ; k < $scope.syllabusService.template[$scope.element.templateStructureId].elements.length ; k++) {
                        $scope.syllabusService.template[$scope.element.templateStructureId].elements[k].alreadyPresent = false;
                    }
                    // mark rubric already present
                    for( var i = 0; i < $scope.element.elements.length; i++) {
                        for (var j = 0 ; j < $scope.syllabusService.template[$scope.element.templateStructureId].elements.length ; j++) {
                            // check if the rubric is already present
                            var ruleElement = $scope.syllabusService.template[$scope.element.templateStructureId].elements[j];
                            if (ruleElement.id === $scope.element.elements[i].templateStructureId ){
                                $scope.syllabusService.template[$scope.element.templateStructureId].elements[j].alreadyPresent = true;
                                break;
                            }
                        }
                        
                    }
                }
            };

        }

    };

}]);

