tenjinApp.controller('DeleteSyllabusModalCtrl', ['$scope', '$uibModalInstance', 'SyllabusService', 'AlertService', 'syllabusList', function($scope, $uibModalInstance, SyllabusService, AlertService, syllabusList) {
    'use strict';

    // get the list of syllabus to be deleted
    $scope.syllabusList = syllabusList.syllabusList;

    $scope.syllabusToDelete = [];
    $scope.syllabusNotToDelete = []; // syllabus with assigned sections can't be deleted

    // Initialize a list with syllabus which can be deleted, and another which cannot be deleted
    for (var i = 0; i < $scope.syllabusList.length; i++) {
        console.log($scope.syllabusList[i]);      

        if ($scope.syllabusList[i].sections.length === 0) {
            $scope.syllabusToDelete.push($scope.syllabusList[i]);
        } else if ($scope.syllabusList[i].sections.length > 0) {
            $scope.syllabusNotToDelete.push($scope.syllabusList[i]);
        }
    }

    /**
     * Callback ok button
     */
    $scope.ok = function() {
        var deletePromise = SyllabusService.deleteSyllabusList($scope.syllabusToDelete);

        SyllabusService.setWorking(true);

        deletePromise.$promise.then(function($data) {
            // TODO : refresh syllabus list

        }, function($error) {
            AlertService.display('danger');

        }).finally(function() {
            SyllabusService.setWorking(false);
        });

        $uibModalInstance.close('');

    };

    /**
     * Callback cancel button
     */
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
}]);
