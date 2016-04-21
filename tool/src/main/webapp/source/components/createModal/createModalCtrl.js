
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
            'availability_start_date': new Date(),
            'common': SyllabusService.syllabus.common
        };
        $scope.title = $translate.instant('MODALE_CREATE_ELEMENT_TITLE');

    }
 

    $scope.ok = function () {

        // CHECK ELEMENT
        var result = $scope.checkElement($scope.element.type);

        // RESULT
        if (result > 0) {
 
            // We create a copy of the current syllabus and we add it the element to be added
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
                // alert add ko
                AlertService.display('danger');

            }).finally(function() {
                 SyllabusService.setWorking(false);
            });

            // We close the popup 
            $uibModalInstance.close('');

        }
    };


    $scope.checkElement = function() {
        var result = 1;

        $scope.errors = {};

        // If the element form contains dates
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

            // CONTROLE retire date
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

        //CHECK evaluation date
        if ($scope.element.type === 'evaluation'){
            if ($scope.element.attributes.evalDate){
                $scope.element.attributes.evalDate = $scope.element.attributes.evalDate.toString();                
            }
        }
        // If the element form contains a resource
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

 




