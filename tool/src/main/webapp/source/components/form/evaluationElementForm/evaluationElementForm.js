
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

            //init special variables
            if ($scope.element.attributes.evalDate){
                $scope.element.attributes.evalDate =  new Date($scope.element.attributes.evalDate);
            }
            if ($scope.element.availabilityEndDate)
                $scope.element.hasEndDate = true;

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
                //$scope.element.attributes.evalDate = new Date('2002-04-26T09:00:00');
                $scope.statusDateEval.opened = true;
            };

            // Disable weekend selection
            $scope.disabled = function(date, mode) {
                return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
            };

        },
        link: function ($scope, $element) {
            
          $scope.element.attributes.evalType = $scope.typelabel;

          
            console.log ("le type est" + $scope.element.attributes.evalDate );
            
        }

    };

});



