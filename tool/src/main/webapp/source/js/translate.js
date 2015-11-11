
opensyllabusApp.config( ['$translateProvider', function($translateProvider) {
    'use strict';

    $translateProvider.useSanitizeValueStrategy('escape');

    $translateProvider.translations('en', {
        MENU_LABEL: 'Course menu',
        MODALE_DELETE_CONFIRM_TITLE: 'Delete element',
        MODALE_DELETE_CONFIRM_MESSAGE: 'Are you sure to delete the element',
        MODALE_CREATE_ELEMENT_TITLE: 'Create element', 
        TYPE_ELEMENT_TEXTE: "Text",
        TYPE_ELEMENT_DOCUMENT: "Document",
        TYPE_ELEMENT_IMAGE: "Image",
        TYPE_ELEMENT_VIDEO: "Video",
        TYPE_ELEMENT_CONTACTINFO: "Contact info",
        TYPE_ELEMENT_REFBIBLIO: "Ref biblio",
        TYPE_ELEMENT_HYPERLINK: "Hyperlink",
        TYPE_ELEMENT_TOOL: "Tool",
        FORM_TITRE: "Title",
        FORM_DESCRIPTION: "Desription",
        FORM_IMPORTANT: "Important (add a header)",
        FORM_VISIBILITE: "Visibility limited to students of this course",
        FORM_DATE_AFFICHAGE_DEBUT: "Diffusion date",
        FORM_DATE_AFFICHAGE_FIN: "Ending date",
        REF_BIBLIO_RECUPERE: "",
        REF_BIBLIO_DISPONIBILITE:"",
        REF_BIBLIO_DE: "FROM",
        REF_BIBLIO_ISSN: "ISSN:",
        REF_BIBLIO_ISBN: "ISBN:",
        ERROR_FORMAT_DATE_DEBUT: 'The format of the diffusion date is invalid',
        ERROR_FORMAT_DATE_RETRAIT: 'The format of the ending date is invalid',
        ALERT_ERROR: 'An error has occured. Please try later.',
        ALERT_SUCCESS: 'The operation succeeded.',
        ALERT_SUCCESS_ADD_ELEMENT: 'The element has been added.'

    })
    .translations('fr', {
        MENU_LABEL: 'Menu du cours',
        MODALE_DELETE_CONFIRM_TITLE: "Suppression de l'élément",
        MODALE_DELETE_CONFIRM_MESSAGE: "Êtes-vous sûr de vouloir supprimer l'élément",
        MODALE_CREATE_ELEMENT_TITLE: 'Création élément',
        TYPE_ELEMENT_TEXTE: "Texte",
        TYPE_ELEMENT_DOCUMENT: "Document",
        TYPE_ELEMENT_IMAGE: "Image",
        TYPE_ELEMENT_VIDEO: "Vidéo",
        TYPE_ELEMENT_CONTACTINFO: "Info contact",
        TYPE_ELEMENT_REFBIBLIO: "Référence biblio",
        TYPE_ELEMENT_HYPERLINK: "Hyperlien",
        TYPE_ELEMENT_TOOL: "Lien vers outil",
        FORM_TITRE: "Libellé",
        FORM_DESCRIPTION: "Desription / Commentaire",
        FORM_IMPORTANT: "Important (ajoute une entête)",
        FORM_VISIBILITE: "Visibilité limitée aux étudiants inscrits au cours",
        FORM_DATE_AFFICHAGE_DEBUT: "Date d'affichage",
        FORM_DATE_AFFICHAGE_FIN: "Date de retrait",
        REF_BIBLIO_RECUPERE: "Récupéré de ",
        REF_BIBLIO_DISPONIBILITE:"Disponible à la bibliothèque",
        REF_BIBLIO_DE: "DE",
        REF_BIBLIO_ISSN: "ISSN:",
        REF_BIBLIO_ISBN: "ISBN:",
        ERROR_FORMAT_DATE_DEBUT: 'Le format de la date d\'affichage est incorrect',
        ERROR_FORMAT_DATE_RETRAIT: 'Le format de la date de retrait est incorrect',
        ALERT_ERROR: 'Une erreur s\'est produite. Veuillez réessayer ultérieurement.',
        ALERT_SUCCESS: 'L\' opération a réussi.',
        ALERT_SUCCESS_ADD_ELEMENT: 'L\' élément a été ajouté.'

    });

     $translateProvider.preferredLanguage('fr');
}]);
