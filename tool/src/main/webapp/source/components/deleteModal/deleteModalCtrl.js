tenjinApp.controller('DeleteModalCtrl', ['$scope', '$uibModalInstance', 'parent', 'element', 'SyllabusService', 'TreeService', 'AlertService', function($scope, $uibModalInstance, parent, element, SyllabusService, TreeService, AlertService) {
    'use strict';

    $scope.element = element;
    $scope.parent = parent;

    $scope.ok = function() {
        // We copy the current syllabus
        var data = angular.copy(SyllabusService.syllabus);
        var location = TreeService.selectedItem.$location;

        SyllabusService.deleteElementFromSyllabus(data, $scope.parent, $scope.element);

        var savePromise = SyllabusService.save(data);

        SyllabusService.setWorking(true);

        savePromise.$promise.then(function($data) {

            SyllabusService.setSyllabus($data);

            TreeService.setSelectedItemFromLocation(location);
        }, function($error) {
            AlertService.display('danger');

        }).finally(function() {
            SyllabusService.setWorking(false);
        });


        $uibModalInstance.close('');
    };

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
}]);