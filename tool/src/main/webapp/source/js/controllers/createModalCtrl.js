
opensyllabusApp.controller('CreateModalCtrl',  [ '$scope', '$uibModalInstance', 'type', 'parent', function ($scope, $uibModalInstance, type, parent) {
    'use strict';

    $scope.parent = parent;
    $scope.type = type;
    
    $scope.ok = function () {
        $uibModalInstance.close('');
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);

 




