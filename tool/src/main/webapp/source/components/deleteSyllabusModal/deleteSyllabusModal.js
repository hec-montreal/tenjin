
opensyllabusApp.controller('DeleteSyllabusModalCtrl',  [ '$scope', '$uibModalInstance', '$translate', 'SyllabusService', 'TreeService', 'AlertService', 'data', 'config', 'mockup' , function ($scope, $uibModalInstance, $translate, SyllabusService, TreeService, AlertService, data, config, mockup) {
    'use strict';

    $scope.sections = mockup.sections;

    $scope.ok = function () {

        var savePromise = SyllabusService.saveSyllabusSpec(data);
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

        // on ferme la modale dans tous les cas
        $uibModalInstance.close('');

    };


    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);

 




