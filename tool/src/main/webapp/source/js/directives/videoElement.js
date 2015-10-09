
opensyllabusApp.directive('videoElement', ['$sce', function ($sce){
    'use strict';

    return {
        scope: {
            element: '=videoElement' 
        },
        restrict: 'A',
        templateUrl: 'videoElement.html',
        controller: function ($scope) {

        },
        link: function ($scope, $element) {
            // Vérification sur l'url obligatoire avant insertion dans le src de l'iframe
            if ($scope.element.attributes.videoUrl) {
                $scope.videoUrl = $sce.trustAsResourceUrl($scope.element.attributes.videoUrl);
            }
        }

    };

}]);

