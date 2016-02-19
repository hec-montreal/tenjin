
opensyllabusApp.controller('CreateSyllabusModalCtrl',  [ '$scope', '$uibModalInstance', '$translate', 'SyllabusService', 'TreeService', 'AlertService', 'data', 'config', 'mockup' , function ($scope, $uibModalInstance, $translate, SyllabusService, TreeService, AlertService, data, config, mockup) {
    'use strict';

    $scope.data = {
        'sections' : angular.copy(mockup.sections),
        'syllabusName' : 'Specific syllabus'
    };
    // $scope.sections = angular.copy(mockup.sections);

    $scope.ok = function () {

        var savePromise = SyllabusService.saveSyllabusSpec($scope.data);
        SyllabusService.setWorking(true);

        savePromise.$promise.then(function($data) {
            // alert add syllabus ok
            AlertService.display('success', $translate.instant('ALERT_SUCCESS_ADD_SYLLABUS'));

            // refresh the list 
            
        }, function ($error){
            // alert add syllabus ko
            AlertService.display('danger');

        }).finally(function() {
             SyllabusService.setWorking(false);
        });

        // close the popup
        $uibModalInstance.close('');

    };


    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);

 




