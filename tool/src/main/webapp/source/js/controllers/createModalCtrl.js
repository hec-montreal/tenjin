
opensyllabusApp.controller('CreateModalCtrl',  [ '$scope', '$uibModalInstance', '$translate','type', 'parent', 'SyllabusService', 'AlertService', function ($scope, $uibModalInstance, $translate, type, parent, SyllabusService, AlertService) {
    'use strict';

    $scope.parent = parent;
    $scope.type = type;

    $scope.element = {};
    $scope.element.attributes = {};
    $scope.element.type = $scope.type;

    

    
    $scope.ok = function () {

        // CHECK ELEMENT
        var result = $scope.checkElement();

        // RESULT
        if (result > 0) {

            var savePromise = SyllabusService.saveElement($scope.element);
            savePromise.$promise.then(function($data) {
                // alert ajout ok
                AlertService.display('success', $translate.instant('ALERT_SUCCESS_ADD_ELEMENT'));
                // ajout de l'élément au plan de cours
                
            }, function ($error){
                // alert ajout ko
                AlertService.display('danger');
                // TEST : ajout de l'élément au plan de cours
                // SyllabusService.addElement($scope.element);
            });

            // on ferme la modale dans tous les cas
            $uibModalInstance.close('');

        }
    };

    $scope.checkElement = function() {
        var result = 1;

        $scope.errors = {};

        // CONTROLE date affichage
        if ($scope.element.availabilityStartDate ) {
            // convert to timestamp
            if ( Object.prototype.toString.call($scope.element.availabilityStartDate) === '[object Date]' ) {
                $scope.element.availabilityStartDate = $scope.element.availabilityStartDate.getTime();
            }

        } else {       
            $scope.errors.isErrorDateDebut = true;
            result = -1;
        }

         // CONTROLE date retrait
        if ($scope.element.hasEndDate) {
            if ($scope.element.availabilityEndDate) {
                // convert to timestamp
                if ( Object.prototype.toString.call($scope.element.availabilityEndDate) === '[object Date]' ) {
                    $scope.element.availabilityEndDate = $scope.element.availabilityEndDate.getTime();
                }

            } else {       
                $scope.errors.isErrorDateRetrait = true;
                result = -1;
            }
        }

        return result;
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);

 




