
opensyllabusApp.directive('imageElement', function (){
    'use strict';

    return {
        scope: {
            element: '=imageElement'
        },
        restrict: 'A',
        templateUrl: '/opensyllabus2-tool/views/imageElement.html',
        controller: function ($scope) {

        },
        link: function ($scope, $element) {
            if ($scope.element.attributes.imageComment){
                var elem = angular.element( $element[0].querySelector('.comment') );
                // console.log("text element : " + $scope.element.attributes.text);
                elem.html($scope.element.attributes.imageComment);
            }
        }

    };

});

