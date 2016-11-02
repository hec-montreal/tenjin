tenjinApp.directive('examElementForm', function() {
    'use strict';

    return {
        scope: {
            element: '=examElementForm',
            typelabel: '=' //Might need to link to rules for I18N purposes
        },

        restrict: 'A',

        templateUrl: 'form/examElementForm/examElementForm.html',
        
        controller: function($scope) {

        },

        link: function($scope, $element) {

            if (!$scope.element.attributes.examType) {
                $scope.element.attributes.examType = $scope.typelabel;
            }
        }
    };
});