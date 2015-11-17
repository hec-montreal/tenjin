
opensyllabusApp.directive('documentElementForm', function (){
    'use strict';

    return {
        scope: {
            element: '=documentElementForm'
        },
        restrict: 'A',
        templateUrl: 'form/documentElementForm.html',
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
        }

    };

});

