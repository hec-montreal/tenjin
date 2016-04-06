
opensyllabusApp.controller('DeleteSyllabusModalCtrl',  [ '$scope', '$uibModalInstance', '$translate', 'SyllabusService', 'TreeService', 'AlertService', 'config', 'mockup', 'syllabusList' , function ($scope, $uibModalInstance, $translate, SyllabusService, TreeService, AlertService, config, mockup, syllabusList) {
    'use strict';

    // $scope.sections = mockup.sections;
    $scope.syllabusList = syllabusList.syllabusList;

    $scope.syllabusToDelete = [];
    $scope.syllabusNotToDelete = [];

    // Initialize a list with syllabus which can be deleted, and another which cannot be deleted
    for (var i = 0 ; i < $scope.syllabusList.length; i++ ) {
        if ( $scope.syllabusList[i].sections.length === 0 ) { 
            $scope.syllabusToDelete.push($scope.syllabusList[i]);
        }
        else if ( $scope.syllabusList[i].sections.length > 0 ) {
            $scope.syllabusNotToDelete.push($scope.syllabusList[i]);
        }
    }


    $scope.ok = function () {

        var deletePromise = SyllabusService.deleteSyllabusList($scope.syllabusToDelete);
        SyllabusService.setWorking(true);

        deletePromise.$promise.then(function($data) {
            // TODO : refresh syllabus list

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

 




