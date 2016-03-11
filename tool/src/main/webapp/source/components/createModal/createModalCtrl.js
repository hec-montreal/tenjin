
opensyllabusApp.controller('CreateModalCtrl',  [ '$scope', '$uibModalInstance', '$translate', 'type', 'parent', 'element', 'SyllabusService', 'TreeService', 'AlertService', 'config' , function ($scope, $uibModalInstance, $translate, type, parent, element, SyllabusService, TreeService, AlertService, config) {
    'use strict';

    $scope.parent = parent;
    
    // Modification
    if (element) {
        $scope.type = {
            'label' : $translate.instant(config.types[element.type].label),
            'type' : element.type
        };

        $scope.element = angular.copy(element);
        $scope.mode = "edition";
        $scope.title = $translate.instant('MODALE_EDIT_ELEMENT_TITLE');
    } else {
        
        // Creation
        $scope.type = type;

        // Création    
        $scope.element = {
            'attributes': {},
            'type': $scope.type.type,
            'parentId': $scope.parent.id,
            'templateStructureId': $scope.type.id,
            'availability_start_date': new Date()
        };
        $scope.title = $translate.instant('MODALE_CREATE_ELEMENT_TITLE');
    }
 

    $scope.ok = function () {


        // CHECK ELEMENT
        var result = $scope.checkElement($scope.element.type);

        // RESULT
        if (result > 0) {

            // On fait une copie du syllabus courant auquel on attache l'élément en cours d'ajout 
            var data = angular.copy(SyllabusService.syllabus);
            var selectedItemId = TreeService.selectedItem.id;
            var emplacement = TreeService.selectedItem.$emplacement;

            SyllabusService.addElementToSyllabus(data, $scope.parent, $scope.element);

            var savePromise = SyllabusService.save(data);
            SyllabusService.setWorking(true);

            savePromise.$promise.then(function($data) {
    
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

            // on ferme la modale dans tous les cas
            $uibModalInstance.close('');

        }
    };


    $scope.checkElement = function() {
        var result = 1;

        $scope.errors = {};

        // Si le formulaire associé à l'élément comprend des dates
        if ( $scope.element.$formHasDates ) {
            // CONTROLE date affichage
            if ($scope.element.availability_start_date ) {
                // convert to timestamp
                if ( Object.prototype.toString.call($scope.element.availability_start_date) === '[object Date]' ) {
                    $scope.element.availability_start_date = $scope.element.availability_start_date.getTime();
                }

            } else {       
                $scope.errors.isErrorDateDebut = true;
                result = -1;
            }

            // CONTROLE date retrait
            if ($scope.element.hasEndDate){
                if ($scope.element.availabilityEndDate) {
                    // convert to timestamp
                    if ( Object.prototype.toString.call($scope.element.availabilityEndDate) === '[object Date]' ) {
                        $scope.element.availabilityEndDate = $scope.element.availabilityEndDate.getTime();
                    }

                } else {       
                    $scope.errors.isErrorDateRetrait = true;
                    result = -1;
                }
            }
        }

        // Si le formulaire associé à l'élément comprend une ressource
        if ( $scope.element.$formHasRessource ) {
            if (!$scope.element.attributes.resourceId) {
                $scope.errors.isErrorRessource = true;
                result = -1;
            }
        }

        return result;
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);

 




