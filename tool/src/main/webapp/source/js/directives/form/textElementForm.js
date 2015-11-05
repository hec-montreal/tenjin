
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
            $scope.element = {};

            // CKEDITOR.replace( 'cke_mytextarea',
            // {
            //     extraPlugins : 'uicolor',
            //     height: '200px',
            // } );
                        
            // CKEDITOR.editorConfig = function( config )
            // {
            //    // misc options
            //    config.height = '200px';
            // };
        }

    };

});

