
tenjinApp.controller('DeleteModalCtrl',  [ '$scope', '$uibModalInstance', 'parent', 'element', 'SyllabusService', 'TreeService', 'AlertService', function ($scope, $uibModalInstance, parent, element, SyllabusService, TreeService, AlertService) {
    'use strict';

    $scope.element = element;
    $scope.parent = parent;

    $scope.ok = function () {

        // On fait une copie du syllabus courant auquel on attache l'élément en cours d'ajout 
        var data = angular.copy(SyllabusService.syllabus);
        
        // var selectedItemId = TreeService.selectedItem.id;
        var emplacement = TreeService.selectedItem.$emplacement;

        SyllabusService.deleteElementFromSyllabus(data, $scope.parent, $scope.element);

        var savePromise = SyllabusService.save(data);
        SyllabusService.setWorking(true);

        savePromise.$promise.then(function($data) {

            SyllabusService.setSyllabus($data);
            
            // TreeService.setSelectedItemFromId(selectedItemId);
            TreeService.setSelectedItemFromEmplacement(emplacement);
        }, function ($error){
            // alert ajout ko
            AlertService.display('danger');

        }).finally(function() {
             SyllabusService.setWorking(false);
        });


        $uibModalInstance.close('');
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);

 




