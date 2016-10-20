tenjinApp.directive('documentElement', ['config', '$translate', 'ResourcesService' ,function (config, $translate, ResourcesService){
    'use strict';

    return {
        scope: {
            element: '=documentElement'
        },
        restrict: 'A',
        templateUrl: 'element/documentElement/documentElement.html',
        controller: function ($scope) {
          // Get ressources informations
            $scope.resource = ResourcesService.getResource($scope.element.attributes.resourceId);
 
            // si le type du document est retrouvé alors on cherche le libellé associé
            if ($scope.element.attributes.docType) {
                for (var i = 0; i < config.documentTypes.length; i++) {
                    if (parseInt($scope.element.attributes.docType) === config.documentTypes[i].id) {
                        $scope.documentType = $translate.instant(config.documentTypes[i].name);
                        break;
                    }
                }
            }

        },
        link: function ($scope, $element) {

         }

    };

}]);