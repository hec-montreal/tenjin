opensyllabusApp.directive('contactElement', function (){
    'use strict';

    return {
        scope: {
            element: '=contactElement'
        },
        restrict: 'A',
        templateUrl: '/opensyllabus2-tool/views/contactElement.html',
        controller: function ($scope) {
         
        }        
    };

});