﻿
opensyllabusApp.config( ['$translateProvider', function($translateProvider) {
    'use strict';

    $translateProvider.useSanitizeValueStrategy('escape');

    $translateProvider.translations('en', {
        MENU_LABEL: 'Course menu',
        MODALE_DELETE_CONFIRM_TITLE: 'Delete element',
        MODALE_DELETE_CONFIRM_MESSAGE: 'Are you sure to delete the element',
        MODALE_CREATE_ELEMENT_TITLE: 'Create element', 
        MODALE_EDIT_ELEMENT_TITLE: 'Modification element',
        TYPE_ELEMENT_TEXTE: "Text",
        TYPE_ELEMENT_DOCUMENT: "Document",
        TYPE_ELEMENT_IMAGE: "Image",
        TYPE_ELEMENT_VIDEO: "Video",
        TYPE_ELEMENT_CONTACT: "Contact info",
        TYPE_ELEMENT_CITATION: "Ref biblio",
        TYPE_ELEMENT_HYPERLINK: "Hyperlink",
        TYPE_ELEMENT_SAKAI_TOOL: "Tool",
        TYPE_ELEMENT_EVALUATION: "Evaluation",
        TYPE_ELEMENT_COMPOSITE: "Group",
        TYPE_ELEMENT_RUBRIC: "Course",
        TYPE_ELEMENT_TUTORIAL: "Tutorial",
        RESOURCE_BROWSER_TITRE: "Resource",
        RESOURCE_BROWSER_SELECTED: "Selected resource",
        FORM_TITRE: "Title",
        FORM_DESCRIPTION: "Desription",
        FORM_IMPORTANT: "Important (add a header)",
        FORM_VISIBILITE: "Visibility limited to students of this course",
        FORM_DATE_AFFICHAGE_DEBUT: "Diffusion date",
        FORM_DATE_AFFICHAGE_FIN: "Ending date",
        FORM_URL: 'URL',
        FORM_URL_EMBED: 'URL or embed',
        FORM_DOCUMENT_PRENOM: "Firstname" ,
        FORM_DOCUMENT_NOM: "Lastname",
        FORM_DOCUMENT_TITRE: "Title",
        FORM_DOCUMENT_COURRIEL: "Email",
        FORM_DOCUMENT_TELEPHONE: "Phone number",
        FORM_DOCUMENT_BUREAU: "Office",
        FORM_DOCUMENT_DISPONIBILITES: "Disponibilities",
        FORM_DOCUMENT_TYPE: "Type",
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
        FORM_TITRE_EVALUATION: "Evaluation title",
        FORM_PONDERATION_EVALUATION: "Weight",
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
        ERROR_RESSOURCE: 'A resource must be selected',
        ALERT_ERROR: 'An error has occured. Please try later.',
        ALERT_SUCCESS: 'The operation succeeded.',
        ALERT_SUCCESS_ADD_ELEMENT: 'The element has been added.',
        ALERT_SUCCESS_DELETE_ELEMENT : 'The element has been deleted.',
        ALERT_SUCCESS_SAVE_SYLLABUS: 'The course plan has been saved.',
        ALERT_RUBRIC_EXISTS: 'The rubric already exists',
        CALENDAR_TODAY : 'Today',
        CALENDAR_NOW : 'Now',
        CALENDAR_DATE : 'Date',
        CALENDAR_TIME : 'Time',
        CALENDAR_CLEAR : 'Reset',
        CALENDAR_CLOSE : 'Close',
        ERROR_PLAN_COURS : 'EN, Le chargement du plan de cours a échoué. Veuillez essayer ultérieurement ou contacter le support.',
        ERROR_TEMPLATE : 'EN, Le chargement du plan de cours a partiellement échoué. Celui ci est disponible en lecture seulement. Veuillez essayer ultérieurement ou contacter le support.',
        BUTTON_SAVE: 'Save',
        SAVE_WORKING: 'Operation in progress...',
        DOCUMENT_TYPE_DEFAULT : '...',
        DOCUMENT_TYPE_PRESENTATION : 'Slides/presentation',
        DOCUMENT_TYPE_EXERCICE : 'Exercise/problem',
        DOCUMENT_TYPE_SOLUTION : 'Solution',
        DOCUMENT_TYPE_CAS : 'Case',
        DOCUMENT_TYPE_RAPPORT : 'Report',
        DOCUMENT_TYPE_DONNEES : 'Data',
        DOCUMENT_TYPE_LIVRE : 'Book chapter',
        DOCUMENT_TYPE_OLDEXAMEN : 'Old exam',
        DOCUMENT_TYPE_PEDAGOGIQUE : 'Pedagogical document'
    })
    .translations('fr', {
        MENU_LABEL: 'Menu du cours',
        MODALE_DELETE_CONFIRM_TITLE: "Suppression de l'élément",
        MODALE_DELETE_CONFIRM_MESSAGE: "Êtes-vous sûr de vouloir supprimer l'élément",
        MODALE_CREATE_ELEMENT_TITLE: 'Ajout élément',
        MODALE_EDIT_ELEMENT_TITLE: 'Modification élément',
        TYPE_ELEMENT_TEXTE: "Texte",
        TYPE_ELEMENT_DOCUMENT: "Document",
        TYPE_ELEMENT_IMAGE: "Image",
        TYPE_ELEMENT_VIDEO: "Vidéo",
        TYPE_ELEMENT_CONTACT: "Info contact",
        TYPE_ELEMENT_CITATION: "Référence biblio",
        TYPE_ELEMENT_HYPERLINK: "Hyperlien",
        TYPE_ELEMENT_SAKAI_TOOL: "Lien vers outil",
        TYPE_ELEMENT_EVALUATION: "Évaluation",
        TYPE_ELEMENT_COMPOSITE: "Regroupement",
        TYPE_ELEMENT_RUBRIC: "Rubrique",
        TYPE_ELEMENT_LECTURE: "Séance de cours",
        TYPE_ELEMENT_TUTORIAL: "Scéance de travaux pratiques",
        RESOURCE_BROWSER_TITRE: "Ressource",
        RESOURCE_BROWSER_SELECTED: "Ressource sélectionnée",
        ERROR_RESSOURCE: 'Une ressource doit être sélectionnée',
        FORM_TITRE: "Libellé",
        FORM_DESCRIPTION: "Desription / Commentaire",
        FORM_IMPORTANT: "Important (ajoute une entête)",
        FORM_VISIBILITE: "Visibilité limitée aux étudiants inscrits au cours",
        FORM_DATE_AFFICHAGE_DEBUT: "Date d'affichage",
        FORM_DATE_AFFICHAGE_FIN: "Date de retrait",
        FORM_URL: 'URL',
        FORM_URL_EMBED: 'URL ou embed',
        FORM_DOCUMENT_PRENOM: "Prénom",
        FORM_DOCUMENT_NOM: "Nom",
        FORM_DOCUMENT_TITRE: "Titre",
        FORM_DOCUMENT_COURRIEL: "Courriel",
        FORM_DOCUMENT_TELEPHONE: "Téléphone",
        FORM_DOCUMENT_BUREAU: "Bureau",
        FORM_DOCUMENT_DISPONIBILITES: "Disponibilités",
        FORM_DOCUMENT_TYPE: "Type",
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
        FORM_TITRE_EVALUATION: "Titre de l'évaluation",
        FORM_PONDERATION_EVALUATION: "Pondération",
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
        ALERT_SUCCESS_ADD_ELEMENT: 'L\' élément a été ajouté.',
        ALERT_SUCCESS_DELETE_ELEMENT : 'L\'élément a été supprimé.',
        ALERT_SUCCESS_SAVE_SYLLABUS: 'Le plan de cours a été sauvegardé.',
        ALERT_RUBRIC_EXISTS: 'La rubrique est déjà présente',
        CALENDAR_TODAY : 'Aujourd\'hui', 
        CALENDAR_NOW : 'Maintenant',
        CALENDAR_DATE : 'Date',
        CALENDAR_TIME : 'Heure',
        CALENDAR_CLEAR : 'Effacer',
        CALENDAR_CLOSE : 'Fermer',
        ERROR_PLAN_COURS : 'Le chargement du plan de cours a échoué. Veuillez essayer ultérieurement ou contacter le support.',
        ERROR_TEMPLATE : 'Le chargement du plan de cours a partiellement échoué. Celui ci est disponible en lecture seulement. Veuillez essayer ultérieurement ou contacter le support.',
        BUTTON_SAVE: 'Enregistrer',
        SAVE_WORKING: 'Opération en cours...',
        DOCUMENT_TYPE_DEFAULT : '...',
        DOCUMENT_TYPE_PRESENTATION : 'Diapositives/présentation',
        DOCUMENT_TYPE_EXERCICE : 'Exercice/problème',
        DOCUMENT_TYPE_SOLUTION : 'Solution',
        DOCUMENT_TYPE_CAS : 'Cas',
        DOCUMENT_TYPE_RAPPORT : 'Rapport',
        DOCUMENT_TYPE_DONNEES : 'Données',
        DOCUMENT_TYPE_LIVRE : 'Chapitre de livre',
        DOCUMENT_TYPE_OLDEXAMEN : 'Ancien examen',
        DOCUMENT_TYPE_PEDAGOGIQUE : 'Document de nature pédagogique'
    });

     $translateProvider.preferredLanguage('fr');
}]);
