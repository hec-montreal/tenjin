tenjinApp.directive('addElementMenu', ["ModalService", "SyllabusService", "TreeService", "AlertService", "config", function(ModalService, SyllabusService, TreeService, AlertService, config) {
    'use strict';

    return {
        scope: {
            element: '=addElementMenu'
        },

        restrict: 'A',

        templateUrl: 'element/addElementMenu/addElementMenu.html',

        controller: function($scope) {
            $scope.modalService = ModalService;
            $scope.syllabusService = SyllabusService;
            $scope.treeService = TreeService;
            $scope.alertService = AlertService;
            $scope.config = config;

            $scope.addElement = function($type) {
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
                        'common': $scope.syllabusService.syllabus.common
                    };

                    $scope.mode = "creation";

                    var data = angular.copy($scope.syllabusService.syllabus);
                    var selectedItemId = $scope.treeService.selectedItem.id;
                    var emplacement = $scope.treeService.selectedItem.$emplacement;

                    var result = $scope.syllabusService.addRubricToSyllabus(data, $scope.element, element);

                    if (result > 0) {

                        var savePromise = $scope.syllabusService.save(data);

                        $scope.syllabusService.setWorking(true);

                        savePromise.$promise.then(($data) => {
                            $scope.syllabusService.setSyllabus($data);
                            $scope.treeService.setSelectedItemFromEmplacement(emplacement);
                        }, ($error) => {
                            $scope.alertService.display('danger');
                        }).finally(() => {
                            $scope.syllabusService.setWorking(false);
                        });

                    } else {
                        $scope.alertService.display('danger', 'Pensez à migrer angular translate');
                    }

                } // Sinon on lance une popup de création de l'élément
                else {

                    // hide menu
                    $scope.showMenuAjouter = false;

                    // TODO : open edition popup
                    var modal = $scope.modalService.createElement($type, $scope.element);

                    // Traitement du résultat
                    modal.result.then(function(createdItem) {
                        console.debug('élément ajouté');
                    }, function() {
                        console.debug('élément non ajouté');
                    });
                }
            };

            $scope.checkRubricsAlreadyPresent = function() {
                console.log("Check");

                if ($scope.element.elements) {
                    // reinit
                    for (var k = 0; k < $scope.syllabusService.template[$scope.element.templateStructureId].elements.length; k++) {
                        $scope.syllabusService.template[$scope.element.templateStructureId].elements[k].alreadyPresent = false;
                    }

                    // mark rubric already present
                    for (var i = 0; i < $scope.element.elements.length; i++) {
                        for (var j = 0; j < $scope.syllabusService.template[$scope.element.templateStructureId].elements.length; j++) {
                            // check if the rubric is already present
                            var ruleElement = $scope.syllabusService.template[$scope.element.templateStructureId].elements[j];
                            if ($scope.element.elements[i].type === 'rubric' && ruleElement.id === $scope.element.elements[i].templateStructureId) {
                                $scope.syllabusService.template[$scope.element.templateStructureId].elements[j].alreadyPresent = true;
                                break;
                            }
                        }
                    }
                }
            };

            $scope.toggleMenu = function() {
                $scope.showMenuAjouter = $scope.showMenuAjouter === false ? true : false;
            }
        },

        link: function($scope, $element) {

        }
    };
}]);