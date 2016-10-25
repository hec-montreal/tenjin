tenjinApp.directive('documentElement', ['config', '$translate', 'ResourcesService', function(config, $translate, ResourcesService) {
    'use strict';

    return {
        scope: {
            element: '=documentElement'
        },
        restrict: 'A',
        templateUrl: 'element/documentElement/documentElement.html',

        controller: function($scope) {
            // Get resource details
            $scope.resource = ResourcesService.getResource($scope.element.attributes.documentId);

            var documentTypeId = $scope.element.attributes.documentType;

            if (documentTypeId) {
                $scope.documentTypeId = parseInt(documentTypeId, 10);
            }

            // Retrieve the label for the document type id
            if ($scope.element.attributes.documentType) {
                for (var i = 0; i < config.documentTypes.length; i++) {
                    if (parseInt($scope.element.attributes.documentType) === config.documentTypes[i].id) {
                        $scope.documentType = $translate.instant(config.documentTypes[i].name);
                        break;
                    }
                }
            }

        },
        link: function($scope, $element) {

        }

    };

}]);