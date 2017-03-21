tenjinApp.directive('contactElement', ['config', '$translate', function(config, $translate) {
    'use strict';

    return {
        scope: true,

        restrict: 'A',

        templateUrl: 'element/contactElement/contactElement.html',

        controller: function($scope) {
            // Retrieve the label for the title
            if ($scope.element.attributes.contactInfoTitle) {
                $scope.title = $translate.instant($scope.element.attributes.contactInfoTitle);
            }
        }
    };
}]);
