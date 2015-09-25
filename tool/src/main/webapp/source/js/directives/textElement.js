
opensyllabusApp.directive('textElement', function (){
    'use strict';

    return {
        scope: {
            element: '=textElement'
        },
        restrict: 'A',
        templateUrl: '/opensyllabus2-tool/views/textElement.html',
        controller: function ($scope) {

        },
        link: function ($scope, $element) {
            var elem = angular.element( $element[0].querySelector('.content') );
            // console.log("text element : " + $scope.element.attributes.text);
            elem.html($scope.element.attributes.text);
        }

    };

});

