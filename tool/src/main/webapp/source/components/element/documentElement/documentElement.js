tenjinApp.directive('documentElement', ['config', '$translate', 'ResourcesService', function(config, $translate, ResourcesService) {
    'use strict';

    return {
        scope: true,

        restrict: 'A',

        templateUrl: 'element/documentElement/documentElement.html',

        controller: function($scope) {
            // Get resource details
            $scope.resource = ResourcesService.getResource($scope.element.attributes.documentId);

            var documentTypeId = $scope.element.attributes.documentType;

            if (documentTypeId) {
				$scope.documentType = $translate.instant(documentTypeId);
            }

            $scope.submitForm = function(){
                document.getElementById('resourcePropertiesForm').submit();
            }
        }
    };
}]);
