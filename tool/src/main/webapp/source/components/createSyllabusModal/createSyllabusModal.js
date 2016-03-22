
opensyllabusApp.controller('CreateSyllabusModalCtrl',  [ '$scope', '$uibModalInstance', '$translate', 'SyllabusService', 'TreeService', 'AlertService', 'data', 'config', 'mockup' , function ($scope, $uibModalInstance, $translate, SyllabusService, TreeService, AlertService, data, config, mockup) {
    'use strict';

    $scope.data = {
        'sections' : angular.copy(mockup.sectionsFree),
        'name' : 'Specific syllabus'
    };
    // $scope.sections = angular.copy(mockup.sections);

    $scope.ok = function () {

        // keep only the selected sections
        var sections = [];
        for( var i = 0 ; i < $scope.data.sections.length; i++) {
            if ($scope.data.sections[i].checked === true) {
                sections.push($scope.data.sections[i]);
            }
        }
        $scope.data.sections = sections;

        var savePromise = SyllabusService.saveSyl($scope.data);
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

 




