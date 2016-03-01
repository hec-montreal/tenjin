opensyllabusApp.directive('buttonsForm', ['$anchorScroll', '$location', 'ModalService', function ($anchorScroll, $location, ModalService){
    'use strict';

    return {
        scope: {
            element: '=buttonsForm',
            noedit: '='
        },
        restrict: 'A',
        templateUrl: 'form/buttonsForm/buttonsForm.html',
        controller: function ($scope) {

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
                $scope.status.opened = true;
            };

            // Disable weekend selection
            $scope.disabled = function(date, mode) {
                return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
            };

            $scope.openRetrait = function($event) {
                $scope.statusRetrait.opened = true;
            };
        },
        link: function ($scope, $element) {

            $scope.element.availability_start_date = Date.now();
          

            $scope.element.$formHasDates = true;

            $scope.element.hasDatesInterval = $scope.element.hasDatesInterval || false;
        }


    };

}]);

