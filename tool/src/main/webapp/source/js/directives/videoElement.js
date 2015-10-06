
opensyllabusApp.directive('videoElement', ['$sce', function ($sce){
    'use strict';

    return {
        scope: {
            element: '=videoElement' 
        },
        restrict: 'A',
        templateUrl: '/opensyllabus2-tool/views/videoElement.html',
        controller: function ($scope) {

        },
        link: function ($scope, $element) {
            if ($scope.element.attributes.videoComment){
                var elem = angular.element( $element[0].querySelector('.comment') );
                // console.log("text element : " + $scope.element.attributes.text);
                elem.html($scope.element.attributes.videoComment);
            }

            if ($scope.element.attributes.videoUrl) {
                $scope.videoUrl = $sce.trustAsResourceUrl($scope.element.attributes.videoUrl);
            }
        }

    };

}]);

