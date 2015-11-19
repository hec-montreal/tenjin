﻿
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
        TYPE_ELEMENT_CONTACT: "Contact info",
        TYPE_ELEMENT_CITATION: "Ref biblio",
        TYPE_ELEMENT_HYPERLINK: "Hyperlink",
        TYPE_ELEMENT_SAKAI_TOOL: "Tool",
        FORM_TITRE: "Title",
        FORM_DESCRIPTION: "Desription",
        FORM_IMPORTANT: "Important (add a header)",
        FORM_VISIBILITE: "Visibility limited to students of this course",
        FORM_DATE_AFFICHAGE_DEBUT: "Diffusion date",
        FORM_DATE_AFFICHAGE_FIN: "Ending date",
        FORM_DOCUMENT_PRENOM: "Firstname" ,
        FORM_DOCUMENT_NOM: "Lastname",
        FORM_DOCUMENT_TITRE: "Title",
        FORM_DOCUMENT_COURRIEL: "Email",
        FORM_DOCUMENT_TELEPHONE: "Phone number",
        FORM_DOCUMENT_BUREAU: "Office",
        FORM_DOCUMENT_DISPONIBILITES: "Disponibilities",
		EVALUATION_LOCALISATION: "Location: ",
		EVALUATION_INCLASS: "In class ",
		EVALUATION_ATHOME: "At home",
        EVALUATION_ORAL: "Oral",
		EVALUATION_WRITTEN: "Written",
        EVALUATION_PAPER: "Paper",
		EVALUATION_ELECTRONIC: "Electronic",
        EVALUATION_INDIVIDUAL: "Individual",
        EVALUATION_TEAM: "Team",
        REF_BIBLIO_RECUPERE: "",
	    EVALUATION_TERMS: "Term: ",
        EVALUATION_SUBMISSION_TYPE: "Submission: ",
        EVALUATION_ASSESSMENT_TYPE: "Work mode: ",
        EVALUATION_DATE: "Evaluation date: ",
        CONTACT_OFFICEROOM: "Office: ",
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
        TYPE_ELEMENT_CONTACT: "Info contact",
        TYPE_ELEMENT_CITATION: "Référence biblio",
        TYPE_ELEMENT_HYPERLINK: "Hyperlien",
        TYPE_ELEMENT_SAKAI_TOOL: "Lien vers outil",
        FORM_TITRE: "Libellé",
        FORM_DESCRIPTION: "Desription / Commentaire",
        FORM_IMPORTANT: "Important (ajoute une entête)",
        FORM_VISIBILITE: "Visibilité limitée aux étudiants inscrits au cours",
        FORM_DATE_AFFICHAGE_DEBUT: "Date d'affichage",
        FORM_DATE_AFFICHAGE_FIN: "Date de retrait",
        FORM_URL: 'URL',
        FORM_DOCUMENT_PRENOM: "Prénom",
        FORM_DOCUMENT_NOM: "Nom",
        FORM_DOCUMENT_TITRE: "Titre",
        FORM_DOCUMENT_COURRIEL: "Courriel",
        FORM_DOCUMENT_TELEPHONE: "Téléphone",
        FORM_DOCUMENT_BUREAU: "Bureau",
        FORM_DOCUMENT_DISPONIBILITES: "Disponibilités",
        FORM_CONTACT_TITLE_ATTACHE: 'Attaché(e) d\'enseignement',
        FORM_CONTACT_TITLE_CHARGE_ENS: 'Chargé(e) d\'enseignement',
        FORM_CONTACT_TITLE_CHARGE_COURS: 'Chargé(e) de cours',
        FORM_CONTACT_TITLE_ETUDIANT: 'Étudiant(e)',
        FORM_CONTACT_TITLE_MAITRE: 'Maître d\'enseignement',
        FORM_CONTACT_TITLE_PROF_ADJOINT: 'Professeur(e) adjoint(e)',
        FORM_CONTACT_TITLE_PROF_AFFILIE: 'Professeur(e) affilié(e)',
        FORM_CONTACT_TITLE_PROF_AGREGE: 'Professeur(e) agrégé(e)',
        FORM_CONTACT_TITLE_PROF_ASSOCIE: 'Professeur(e) associé(e)',
        FORM_CONTACT_TITLE_PROF_HONORAIRE: 'Professeur(e) honoraire',
        FORM_CONTACT_TITLE_PROF_INVITE: 'Professeur(e) invité(e)',
        FORM_CONTACT_TITLE_PROF_TITULAIRE: 'Professeur(e) titulaire',
        FORM_CONTACT_TITLE_SECRETAIRE: 'Attaché(e) d\'enseignement',
        FORM_CONTACT_TITLE_STAGIAIRE: 'Attaché(e) d\'enseignement',
        REF_BIBLIO_RECUPERE: "Récupéré de ",
        REF_BIBLIO_DISPONIBILITE:"Disponible à la bibliothèque",
        REF_BIBLIO_DE: "DE",
		EVALUATION_LOCALISATION: "Localisation: ",
		EVALUATION_INCLASS: "En classe ",
		EVALUATION_ATHOME: "A la maison",
        EVALUATION_TERMS: "Modalité: ",
		EVALUATION_ORAL: "Oral",
		EVALUATION_WRITTEN: "Écrit",
        EVALUATION_SUBMISSION_TYPE: "Mode de remise: ",
		EVALUATION_PAPER: "Papier",
		EVALUATION_ELECTRONIC: "Électronique",
        EVALUATION_ASSESSMENT_TYPE: "Mode de travail: ",
        EVALUATION_INDIVIDUAL: "Individuel",
        EVALUATION_TEAM: "En équipe",
        EVALUATION_DATE: "Date de l'évaluation: ",
        CONTACT_OFFICEROOM: "Bureau: ",
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
