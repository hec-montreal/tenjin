
opensyllabusApp.directive('evaluationElementForm', ['$anchorScroll', '$location', 'ModalService', function ($anchorScroll, $location, ModalService){
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

            $scope.status = {
                opened: false
            };

            $scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };

            $scope.open = function($event) {
                $scope.status.opened = true;
            };

            // Disable weekend selection
            $scope.disabled = function(date, mode) {
                return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
            };

        },
        link: function ($scope, $element) {
        }

    };

}]);

