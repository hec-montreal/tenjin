opensyllabusApp.directive('contactElementForm', ['$translate', function ($translate){
    'use strict';

    return {
        // scope: {
        //     element: '=contactElement'
        // },
        scope: true,
        restrict: 'A',
        templateUrl: 'form/contactElementForm.html', 
        controller: function ($scope) {
            var removeButtonsList = 'Maximize,Anchor,Source,PageBreak,Blockquote,NumberedList,BulletedList,Image,Table,SpecialChar,Outdent,Indent,RemoveFormat,Link,Unlink,JustifyBlock,Strike';
            // setup editor options
            $scope.editorOptionsDisponibilite = {
                language: 'fr',
                // uiColor: '#fff',
                height: '200',
                removeButtons: removeButtonsList
            };

            $scope.editorOptionsCommentaire = {
                language: 'fr',
                // uiColor: '#fff',
                height: '200',
                removeButtons: removeButtonsList
            };

            $scope.data = {
                availableOptions: [
                  {id: '1', name: ''},
                  {id: '2', name: 'Professeur'},
                  {id: '3', name: 'Coordonnateur'}
                ],
                selectedOption: {id: '1', name: ''} //This sets the default value of the select in the ui
            };
        }        
    };

}]);
