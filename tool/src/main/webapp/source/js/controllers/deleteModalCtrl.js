
opensyllabusApp.controller('DeleteModalCtrl',  [ '$scope', '$uibModalInstance', 'element', function ($scope, $uibModalInstance, element) {
    'use strict';

    $scope.element = element;

    $scope.ok = function () {
        $uibModalInstance.close('');
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);

 




