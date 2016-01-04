opensyllabusApp.directive('contactElement', function (){
    'use strict';

    return {
        scope: {
            element: '=contactElement'
        },
        // scope: true,
        restrict: 'A',
        templateUrl: 'element/contactElement/contactElement.html',
        controller: function ($scope) {
         
        }        
    };

});
