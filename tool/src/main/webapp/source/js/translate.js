
opensyllabusApp.config( ['$translateProvider', function($translateProvider) {
    'use strict';

    $translateProvider.translations('en', {
        MENU_LABEL: 'Course menu',
        MODALE_DELETE_CONFIRM_TITLE: 'Delete element',
        MODALE_DELETE_CONFIRM_MESSAGE: 'Are you sure to delete the element'
    })
    .translations('fr', {
        MENU_LABEL: 'Menu du cours',
        MODALE_DELETE_CONFIRM_TITLE: "Suppression de l'élément",
        MODALE_DELETE_CONFIRM_MESSAGE: "Êtes-vous sûr de vouloir supprimer l'élément"
    });

     $translateProvider.preferredLanguage('fr'); 
}]);
