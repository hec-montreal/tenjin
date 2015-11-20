
opensyllabusApp.directive('evaluationElementForm',  function (){
    'use strict';

    return {
        scope: {
            element: '=evaluationElementForm'
        },
        restrict: 'A',
        templateUrl: 'form/evaluationElementForm.html',
        controller: function ($scope) {
            $scope.formats = ['dd-MMMM-yyyy HH:mm']; 
            $scope.format = $scope.formats[0];

            $scope.statusDateEval = {
                opened: false
            };

            $scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };

            $scope.openDateEval = function($event) {
                $scope.statusDateEval.opened = true;
            };

            // Disable weekend selection
            $scope.disabled = function(date, mode) {
                return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
            };

        },
        link: function ($scope, $element) {
        }

    };

});

