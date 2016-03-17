
opensyllabusApp.directive('evaluationElementForm',  function (){
    'use strict';

    return {
        scope: {
            element: '=evaluationElementForm',
            typelabel: '=' //Might need to link to rules for I18N purposes
        },
        restrict: 'A',
        templateUrl: 'form/evaluationElementForm/evaluationElementForm.html',
        controller: function ($scope) {
            $scope.formats = ['dd-MM-yyyy']; 
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

            console.log ($scope.type);

            // Disable weekend selection
            $scope.disabled = function(date, mode) {
                return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
            };

        },
        link: function ($scope, $element) {
            $scope.element.attributes.evalType = $scope.typelabel;
          
            console.log ("le type est" + $scope.typelabel );
            
        }

    };

});



