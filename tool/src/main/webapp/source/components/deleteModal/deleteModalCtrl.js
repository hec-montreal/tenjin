
opensyllabusApp.controller('DeleteModalCtrl',  [ '$scope', '$translate', '$uibModalInstance', 'parent', 'element', 'SyllabusService', 'TreeService', 'AlertService', function ($scope, $translate, $uibModalInstance, parent, element, SyllabusService, TreeService, AlertService) {
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
        
        savePromise.$promise.then(function($data) {
            // alert ajout ok
            AlertService.display('success', $translate.instant('ALERT_SUCCESS_DELETE_ELEMENT'));
            SyllabusService.setSyllabus($data);
            // TreeService.setSelectedItemFromId(selectedItemId);
            TreeService.setSelectedItemFromEmplacement(emplacement);
        }, function ($error){
            // alert ajout ko
            AlertService.display('danger');

        });


        $uibModalInstance.close('');
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);

 




