
opensyllabusApp.directive('textElementForm', function (){
    'use strict';

    return {
        scope: { 
            element: '=textElementForm'
        },
        restrict: 'A',
        templateUrl: 'form/textElementForm.html',
        controller: function ($scope) {

            // setup editor options
            $scope.editorOptions = {
                language: 'fr',
                // uiColor: '#fff',
                height: '200',
                removeButtons: 'Maximize,Anchor,Source,PageBreak'
            };

        },
        link: function ($scope, $element) {
            // Date actuelle par défaut
            $scope.element.availabilityStartDate = Date.now();
        }

    };

});

