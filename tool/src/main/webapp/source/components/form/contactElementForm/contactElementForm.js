opensyllabusApp.directive('contactElementForm', ['$translate', function ($translate){
    'use strict';

    return {
        // scope: {
        //     element: '=contactElement'
        // },
        scope: true,
        restrict: 'A',
        templateUrl: 'form/contactElementForm/contactElementForm.html', 
        controller: function ($scope) {
            var removeButtonsList = 'Maximize,Anchor,Source,PageBreak,Blockquote,NumberedList,BulletedList,Image,Table,SpecialChar,Outdent,Indent,RemoveFormat,Link,Unlink,JustifyBlock,Strike';
            // setup editor options
            $scope.editorOptionsDisponibilite = {
                language: 'fr',
                height: '120',
                removeButtons: removeButtonsList,
                removePlugins: 'elementspath,resize'
            };

            $scope.editorOptionsCommentaire = {
                language: 'fr',
                height: '120',
                removeButtons: removeButtonsList,
                removePlugins: 'elementspath,resize'
            };

            $scope.data = {
                availableOptions: [
                    {id: '1', name: ''},
                    {id: '2', name: $translate.instant( 'FORM_CONTACT_TITLE_ATTACHE') },
                    {id: '3', name: $translate.instant('FORM_CONTACT_TITLE_CHARGE_ENS') },
                    {id: '4', name: $translate.instant('FORM_CONTACT_TITLE_CHARGE_COURS') },
                    {id: '5', name: $translate.instant('FORM_CONTACT_TITLE_ETUDIANT') },
                    {id: '6', name: $translate.instant('FORM_CONTACT_TITLE_MAITRE') },
                    {id: '7', name: $translate.instant('FORM_CONTACT_TITLE_PROF_ADJOINT') },
                    {id: '8', name: $translate.instant('FORM_CONTACT_TITLE_PROF_AFFILIE') },
                    {id: '9', name: $translate.instant('FORM_CONTACT_TITLE_PROF_AGREGE') },
                    {id: '10', name: $translate.instant('FORM_CONTACT_TITLE_PROF_ASSOCIE') },
                    {id: '11', name: $translate.instant('FORM_CONTACT_TITLE_PROF_HONORAIRE') },
                    {id: '12', name: $translate.instant('FORM_CONTACT_TITLE_PROF_INVITE') },
                    {id: '13', name: $translate.instant('FORM_CONTACT_TITLE_PROF_TITULAIRE') },
                    {id: '14', name: $translate.instant('FORM_CONTACT_TITLE_SECRETAIRE') },
                    {id: '15', name: $translate.instant('FORM_CONTACT_TITLE_STAGIAIRE') }

                ],


                selectedOption: {id: '1', name: ''} //This sets the default value of the select in the ui
            };
        }        
    };

}]);
