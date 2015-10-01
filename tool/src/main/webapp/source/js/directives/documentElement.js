
opensyllabusApp.directive('documentElement', function (){
    'use strict';

    return {
        scope: {
            element: '=documentElement'
        },
        restrict: 'A',
        templateUrl: '/opensyllabus2-tool/views/documentElement.html',
        controller: function ($scope) {

        },
        link: function ($scope, $element) {
            if ($scope.element.attributes.comment){
                var elem = angular.element( $element[0].querySelector('.comment') );
                // console.log("text element : " + $scope.element.attributes.text);
                elem.html($scope.element.attributes.comment);
            }
        }

    };

});

