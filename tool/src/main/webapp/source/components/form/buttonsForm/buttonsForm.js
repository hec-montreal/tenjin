tenjinApp.directive('buttonsForm', ['$anchorScroll', '$location', 'ModalService', function ($anchorScroll, $location, ModalService){
    'use strict';

    return {
        scope: {
            element: '=buttonsForm',
            noedit: '='
        },
        restrict: 'A',
        templateUrl: 'form/buttonsForm/buttonsForm.html',
        controller: function ($scope) {

            //init special variables
            if ($scope.element.attributes.evalDate){
                $scope.element.attributes.evalDate =  new Date($scope.element.attributes.evalDate);
            }
            if ($scope.element.availabilityEndDate){
                $scope.element.hasEndDate = true;
            }

            $scope.formats = ['dd-MMMM-yyyy HH:mm']; 
            $scope.format = $scope.formats[0];

            $scope.status = {
                opened: false
            };

            $scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };

            // calendrier date retrait
            $scope.statusRetrait = {
                opened: false
            };

            $scope.$watch('isDateRetrait', function() {
                 if (!$scope.isDateRetrait) {
                    $scope.element.dtRetrait = null;
                 }

                 var inputRetrait = angular.element(document.getElementById('input-date-retrait'));
                 inputRetrait.prop('required');

            });

            $scope.open = function($event) {
                console.log("OPEN");
                $scope.status.opened = true;
                $scope.element.$formHasDates = true;
                $scope.element.availability_start_date = new Date();
            };

            
            // Disable weekend selection
            $scope.disabled = function(date, mode) {
                return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
            };

            $scope.openRetrait = function($event) {
                $scope.statusRetrait.opened = true;
                 $scope.element.$formHasDates = true;
                 $scope.element.$hasEndDate = true;
                 $scope.element.availabilityEndDate = new Date();
                
            };

            $scope.updateDateRetrait = function($event){
                $scope.element.availabilityEndDate = "";
            };
        },
        link: function ($scope, $element) {

           // $scope.element.availability_start_date = new Date();
          

           

            $scope.element.hasDatesInterval = $scope.element.hasDatesInterval || false;
            $scope.element.$formHasDates = $scope.element.hasDatesInterval;
        }


    };

}]);

