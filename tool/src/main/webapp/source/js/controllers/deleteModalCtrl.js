	
opensyllabusApp.controller('DeleteModalCtrl',  [ '$scope', '$modalInstance', 'element', function ($scope, $modalInstance, element) {
    'use strict';

    $scope.element = element;

    $scope.ok = function () {
        $modalInstance.close('');
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

}]);

 




