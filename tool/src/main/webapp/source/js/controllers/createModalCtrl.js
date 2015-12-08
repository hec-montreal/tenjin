
opensyllabusApp.controller('CreateModalCtrl',  [ '$scope', '$uibModalInstance', '$translate', 'type', 'parent', 'element', 'SyllabusService', 'TreeService', 'AlertService', 'config' , function ($scope, $uibModalInstance, $translate, type, parent, element, SyllabusService, TreeService, AlertService, config) {
    'use strict';

    $scope.parent = parent;
    $scope.type = type;
    $scope.source = element;

    // Modification
    if (element) {
        // $scope.element = element;
        $scope.element = angular.copy(element);
        $scope.mode = "edition";

    }else {
        // Création    
        $scope.element = {};
        $scope.element.attributes = {};
        $scope.element.type = $scope.type.type;
        $scope.element['@class'] = config.typeClass[$scope.type.type];
        $scope.element.parentId = $scope.parent.id;
        $scope.element.templateStructureId = $scope.type.id;
        $scope.mode = "creation";
    }
    
    $scope.ok = function () {

        // CHECK ELEMENT
        var result = $scope.checkElement($scope.element.type);

        // RESULT
        if (result > 0) {

            // TODO : si le plan de cours est vide on le sauvegarde
            // var syllabus = SyllabusService.getSyllabus();
            // // plan de cours vide
            // if (!syllabus.id) {       
            //     // ajout de l'élément au plan de cours
            //     SyllabusService.addElement($scope.element, $scope.parent);
            //     // sauvegarde du plan de cours + l'élément en cours
            // }

            // var selectedItem = TreeService.getSelectedItem();
            
            // On fait une copie du syllabus courant auquel on attache l'élément en cours d'ajout 
            var data = angular.copy(SyllabusService.syllabus);
            var selectedItemId = TreeService.selectedItem.id;

            SyllabusService.addElementToSyllabus(data, $scope.parent, $scope.element);


            var savePromise = SyllabusService.save(data);
            SyllabusService.setWorking(true);

            savePromise.$promise.then(function($data) {
                // alert ajout ok
                AlertService.display('success', $translate.instant('ALERT_SUCCESS_ADD_ELEMENT'));
                SyllabusService.setSyllabus($data);
                // refresh the reference of the selected item and refresh the right panel
                TreeService.setSelectedItemFromId(selectedItemId);

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



    // $scope.checkElement = function($type) {
    //     var result;

    //     switch($type) {
    //         case 'text' : {
    //             result = $scope.checkElementText();
    //             break;
    //         }
    //         case 'document' : {
    //             result = $scope.checkElementText();
    //             break;
    //         }
    //         default: break;
    //     }

    //     return result;
    // };

    $scope.checkElement = function() {
        var result = 1;

        $scope.errors = {};

        // CONTROLE date affichage
        if ( typeof($scope.element.availabilityStartDate) !== 'undefined') {
            if ($scope.element.availabilityStartDate ) {
                // convert to timestamp
                if ( Object.prototype.toString.call($scope.element.availabilityStartDate) === '[object Date]' ) {
                    $scope.element.availabilityStartDate = $scope.element.availabilityStartDate.getTime();
                }

            } else {       
                $scope.errors.isErrorDateDebut = true;
                result = -1;
            }
        }

         // CONTROLE date retrait
        if ($scope.element.hasEndDate) {
            if ( typeof($scope.element.availabilityEndDate) !== 'undefined') {
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

        return result;
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);

 




