opensyllabusApp.directive('contactElementForm', function (){
    'use strict';

    return {
        // scope: {
        //     element: '=contactElement'
        // },
        scope: true,
        restrict: 'A',
        templateUrl: 'form/contactElementForm.html', 
        controller: function ($scope) {
         
        }        
    };

});
