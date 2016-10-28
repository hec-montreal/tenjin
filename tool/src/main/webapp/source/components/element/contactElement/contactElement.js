tenjinApp.directive('contactElement', ['config', '$translate', function (config, $translate){
    'use strict';

    return {
        scope: {
            element: '=contactElement'
        },
        // scope: true,
        restrict: 'A',
        templateUrl: 'element/contactElement/contactElement.html',
        controller: function ($scope) {
            // Retrieve the label for the title
            if ($scope.element.attributes.contactInfoTitle && $scope.element.attributes.contactInfoTitle > 0) {
                for (var i = 0; i < config.contactInfoTitles.length; i++) {
                    if (parseInt($scope.element.attributes.contactInfoTitle) === config.contactInfoTitles[i].id) {
                        $scope.title = $translate.instant(config.contactInfoTitles[i].name);
                        break;
                    }
                }
            }
        }        
    };

}]);
