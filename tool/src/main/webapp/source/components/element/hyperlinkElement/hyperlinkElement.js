tenjinApp.directive('hyperlinkElement', ['config', '$translate', function(config, $translate) {
    'use strict';

    return {
        scope: {
            element: '=hyperlinkElement'
        },

        restrict: 'A',

        templateUrl: 'element/hyperlinkElement/hyperlinkElement.html',

        controller: function($scope) {
            var hyperlinkType = $scope.element.attributes.hyperlinkType;

            if (hyperlinkType) {
                $scope.hyperlinkTypeId = parseInt(hyperlinkType, 10);
            } else {
                $scope.hyperlinkTypeId = -1;
            }

            if ($scope.element.attributes.hyperlinkType) {
                for (var i = 0; i < config.hyperlinkTypes.length; i++) {
                    if (parseInt($scope.element.attributes.hyperlinkType) === config.hyperlinkTypes[i].id) {
                        $scope.hyperlinkType = $translate.instant(config.hyperlinkTypes[i].name);
                        break;
                    }
                }
            }
        }
    };
}]);
