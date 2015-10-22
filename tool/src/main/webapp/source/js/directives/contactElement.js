opensyllabusApp.directive('contactElement', function (){
    'use strict';

    return {
        scope: {
            element: '=contactElement'
        },
        restrict: 'A',
        templateUrl: 'contactElement.html',
        controller: function ($scope) {
         
        }        
    };

});
