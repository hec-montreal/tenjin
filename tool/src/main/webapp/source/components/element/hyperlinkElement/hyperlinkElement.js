tenjinApp.directive('hyperlinkElement', ['config', '$translate', function(config, $translate) {
    'use strict';

    return {
        scope: true,

        restrict: 'A',

        templateUrl: 'element/hyperlinkElement/hyperlinkElement.html',

        controller: function($scope) {
            if ($scope.element.attributes.hyperlinkType) {
                $scope.hyperlinkType = $translate.instant($scope.element.attributes.hyperlinkType);
            }
        }
    };
}]);
