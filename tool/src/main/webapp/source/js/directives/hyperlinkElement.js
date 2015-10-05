
opensyllabusApp.directive('hyperlinkElement', function (){
    'use strict';

    return {
        scope: {
            element: '=hyperlinkElement'
        },
        restrict: 'A',
        templateUrl: '/opensyllabus2-tool/views/hyperlinkElement.html',
        controller: function ($scope) {

        },
        link: function ($scope, $element) {
            if ($scope.element.attributes.hyperlinkComment){
                var elem = angular.element( $element[0].querySelector('.comment') );
                // console.log("text element : " + $scope.element.attributes.text);
                elem.html($scope.element.attributes.hyperlinkComment);
            }
        }

    };

});

