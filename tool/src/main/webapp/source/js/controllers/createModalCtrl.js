
opensyllabusApp.controller('CreateModalCtrl',  [ '$scope', '$modalInstance', 'type', 'parent', function ($scope, $modalInstance, type, parent) {
    'use strict';

    $scope.parent = parent;
    $scope.type = type;
    
    $scope.ok = function () {
        $modalInstance.close('');
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

}]);

 




