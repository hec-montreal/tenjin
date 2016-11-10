﻿
tenjinApp.config( ['$translateProvider', function($translateProvider) {
    'use strict';

    $translateProvider.useSanitizeValueStrategy('escape');

    $translateProvider.translations('en', {
        MENU_LABEL: 'Course menu',
        MODAL_DELETE_CONFIRM_TITLE: 'Delete element',
        MODAL_DELETE_CONFIRM_MESSAGE: 'Are you sure to delete the element',
        MODAL_CREATE_ELEMENT_TITLE: 'Create element', 
        MODAL_EDIT_ELEMENT_TITLE: 'Modification element',
        TYPE_ELEMENT_TEXT: "Text",
        TYPE_ELEMENT_DOCUMENT: "Document",
        TYPE_ELEMENT_IMAGE: "Image",
        TYPE_ELEMENT_VIDEO: "Video",
        TYPE_ELEMENT_CONTACT: "Contact info",
        TYPE_ELEMENT_CITATION: "Ref biblio",
        TYPE_ELEMENT_HYPERLINK: "Hyperlink",
        TYPE_ELEMENT_SAKAIENTITY: "Tool",
        TYPE_ELEMENT_EVALUATION: "Evaluation",
        TYPE_ELEMENT_EXAM: "Exam",
        TYPE_ELEMENT_COMPOSITE: "Group",
        TYPE_ELEMENT_RUBRIC: "Course",
        TYPE_ELEMENT_TUTORIAL: "Tutorial",
        RESOURCE_BROWSER_TITLE: "Resource",
        RESOURCE_BROWSER_SELECTED: "Selected resource",
        CITATION_BROWSER_TITLE: "Citation",
        BIBLIO_BROWSER_SELECTED: "Selected citation",
        SAKAI_TOOL_BROWSER_TITLE: "Sakai entity",
        FORM_TITLE: "Title",
        FORM_DESCRIPTION: "Desription",
        FORM_IMPORTANT: "Important (add a header)",
        FORM_VISIBILITY: "Visibility limited to students of this course",
        FORM_DATE_DISPLAY_START: "Diffusion date",
        FORM_DATE_DISPLAY_END: "Ending date",
        FORM_URL: 'URL',
        FORM_URL_EMBED: 'URL or embed',
        CONTACTINFO_FIRSTNAME: "Firstname" ,
        CONTACTINFO_LASTNAME: "Lastname",
        CONTACTINFO_TITLE: "Title",
        CONTACTINFO_EMAIL: "Email",
        CONTACTINFO_TELEPHONE: "Phone number",
        CONTACTINFO_OFFICEROOM: "Office",
        CONTACTINFO_AVAILABILITY: "Availability",
        FORM_DOCUMENT_TYPE: "Type",
        FORM_CONTENT: "Content",
        FORM_CONTACT_TITLE_DEFAULT: '...',
        FORM_CONTACT_TITLE_FULLTIMEFACULTYLECTURER: 'Full-time Faculty Lecturer',
        FORM_CONTACT_TITLE_PARTTIMELECTURER: 'Part-time Lecturer',
        FORM_CONTACT_TITLE_PARTTIMEFACULTYLECTURER: 'Part-time Faculty Lecturer',
        FORM_CONTACT_TITLE_STUDENT: 'Student',
        FORM_CONTACT_TITLE_FULLTIMELECTURER: 'Full-time Lecturer',
        FORM_CONTACT_TITLE_ASSISTANTPROFESSOR: 'Assistant Professor',
        FORM_CONTACT_TITLE_AFFILIATEDPROFESSOR: 'Affiliated Professor',
        FORM_CONTACT_TITLE_ASSOCIATEPROFESSOR: 'Associate Professor',
        FORM_CONTACT_TITLE_ADJUNCTPROFESSOR: 'Adjunct Professor',
        FORM_CONTACT_TITLE_HONORARYPROFESSOR: 'Honorary Professor',
        FORM_CONTACT_TITLE_GUESTPROFESSOR: 'Guest Professor',
        FORM_CONTACT_TITLE_PROFESOR: 'Professor',
        FORM_CONTACT_TITLE_SECRETARY: 'Secretary',
        FORM_CONTACT_TITLE_TRAINEE: 'Trainee',
        FORM_DISPLAY_DEFAULT: 'Show this element',
        FORM_DISPLAY_INTERVAL: 'Show this element at a date',
        EVALUATION_TITLE: "Evaluation title",
        EVALUATION_WEIGHT: "Weight",
        EVALUATION_LOCATION: "Location: ",
        EVALUATION_INCLASS: "In class ",
        EVALUATION_ATHOME: "At home",
        EVALUATION_ORAL: "Oral",
        EVALUATION_WRITTEN: "Written",
        EVALUATION_PAPER: "Paper",
        EVALUATION_ELECTRONIC: "Electronic",
        EVALUATION_INDIVIDUAL: "Individual",
        EVALUATION_TEAM: "Team",
        EVALUATION_TYPE: "Evaluation type: ",
        REF_BIBLIO_FROM: "",
        EVALUATION_TERMS: "Term: ",
        EVALUATION_SUBMISSION_TYPE: "Submission: ",
        EVALUATION_ASSESSMENT_TYPE: "Work mode: ",
        EVALUATION_DATE: "Evaluation date: ",
        EXAM_TITLE: "Exam title",
        EXAM_WEIGHT: "Weight",
        EXAM_LOCATION: "Location: ",
        EXAM_INCLASS: "In class ",
        EXAM_ATHOME: "At home",
        EXAM_ORAL: "Oral",
        EXAM_WRITTEN: "Written",
        EXAM_PAPER: "Paper",
        EXAM_ELECTRONIC: "Electronic",
        EXAM_INDIVIDUAL: "Individual",
        EXAM_TEAM: "Team",
        EXAM_TYPE: "Evaluation type: ",
        EXAM_TERMS: "Term: ",
        EXAM_SUBMISSION_TYPE: "Submission: ",
        EXAM_ASSESSMENT_TYPE: "Work mode: ",
        EXAM_DATE: "Evaluation date: ",
        CONTACT_OFFICEROOM: "Office: ",
        CONTACT_AVAILABILITY: "Availability",
        REF_BIBLIO_DISPONIBILITY:"",
        REF_BIBLIO_FROM2: "FROM",
        REF_BIBLIO_ISSN: "ISSN:",
        REF_BIBLIO_ISBN: "ISBN:",
        ERROR_FORMAT_DATE_START: 'The format of the diffusion date is invalid',
        ERROR_FORMAT_DATE_END: 'The format of the ending date is invalid',
        ERROR_SAKAI_TOOL: 'A tool must be selected',
        ERROR_MISSING_DOCUMENT: 'A resource must be selected',
        ERROR_MISSING_CITATION: 'A citation must be selected',
        ERROR_MISSING_IMAGE: 'An image must be selected',
        ERROR_MISSING_CONTACTINFO_FIRSTNAME: 'Please enter a first name',
        ERROR_MISSING_CONTACTINFO_LASTNAME: 'Please enter a last name',
        ERROR_CONTENT_MANDATORY: 'The content field is mandatory',
        ERROR_START_DATE_GREATER: 'The end date must be later than the start date',
        ERROR_URL_MANDATORY: "The url field is mandatory",
        ALERT_ERROR: 'An error has occured. Please try later.',
        ALERT_SUCCESS: 'The operation succeeded.',
        ALERT_SUCCESS_ADD_ELEMENT: 'The element has been added.',
        ALERT_SUCCESS_DELETE_ELEMENT : 'The element has been deleted.',
        ALERT_SUCCESS_SAVE_SYLLABUS: 'The course outline has been saved.',
        ALERT_RUBRIC_EXISTS: 'The rubric already exists',
        ALERT_SUCCESS_ADD_SYLLABUS: 'The specific syllabus has been added.',
        ALERT_SUCCESS_DELETE_SYLLABUS: 'The suppression succeeded',
        CALENDAR_TODAY : 'Today',
        CALENDAR_NOW : 'Now',
        CALENDAR_DATE : 'Date',
        CALENDAR_TIME : 'Time',
        CALENDAR_CLEAR : 'Reset',
        CALENDAR_CLOSE : 'Close',
        ERROR_SYLLABUS : 'EN, Le chargement du plan de cours a échoué. Veuillez essayer ultérieurement ou contacter le support.',
        ERROR_TEMPLATE : 'EN, Le chargement du plan de cours a partiellement échoué. Celui ci est disponible en lecture seulement. Veuillez essayer ultérieurement ou contacter le support.',
        BUTTON_SAVE: 'Save',
        BUTTON_CANCEL: 'Cancel',
        SAVE_WORKING: 'Operation in progress...',
        DOCUMENT_TYPE_DEFAULT : '...',
        DOCUMENT_TYPE_CONFERENCE_ACT: 'Actes de conférence',
        DOCUMENT_TYPE_OLD_EXAM: 'Ancien examen',
        DOCUMENT_TYPE_ARTICLE: 'Article',
        DOCUMENT_TYPE_ARTICLE_NEWS: 'Article d\'actualité',
        DOCUMENT_TYPE_ARTICLE_SCIENCE: 'Article scientifique',
        DOCUMENT_TYPE_ARTICLE_PROFESSIONAL: 'Article professionnel',
        DOCUMENT_TYPE_ARTICLE_UNPUBLISHED: 'Article non publié',
        DOCUMENT_TYPE_AUDIO: 'Audio',
        DOCUMENT_TYPE_CASE: 'Cas',
        DOCUMENT_TYPE_BOOK_CHAPTER: 'Chapitre de livre',
        DOCUMENT_TYPE_SLIDES: 'Diapositives / Présentation',
        DOCUMENT_TYPE_PEDAGOGIC: 'Pédagogique',
        DOCUMENT_TYPE_DATA: 'Données',
        DOCUMENT_TYPE_POLL: 'Enquête / Sondage',
        DOCUMENT_TYPE_EXERCISE: 'Exercice / Problème',
        DOCUMENT_TYPE_IMAGE: 'Image / Graphique',
        DOCUMENT_TYPE_BOOK: 'Livre',
        DOCUMENT_TYPE_SOFTWARE: 'Logiciel',
        DOCUMENT_TYPE_REPORT: 'Rapport',
        DOCUMENT_TYPE_REPORT_ANNUAL: 'Rapport annuel',
        DOCUMENT_TYPE_REPORT_CONSULTANT: 'Rapport de consultant',
        DOCUMENT_TYPE_REPORT_ORGANIZATION: 'Rapport d\'organisation internationale',
        DOCUMENT_TYPE_REPORT_GOV: 'Rapport gouvernemental',
        DOCUMENT_TYPE_GAME: 'Simulation / Jeu',
        DOCUMENT_TYPE_WEBSITE: 'Site web',
        DOCUMENT_TYPE_SOLUTION: 'Solution',
        DOCUMENT_TYPE_THESIS: 'Thèse / Mémoire',
        DOCUMENT_TYPE_VIDEO: 'Vidéo',
        DOCUMENT_TYPE_OTHER: 'Autre',
        HYPERLINK_TYPE_DEFAULT: '...',
        HYPERLINK_TYPE_VIDEO: 'Video',
        HYPERLINK_TYPE_ARTICLE: 'Article',
        HYPERLINK_TYPE_NEWS_ARTICLE: 'News article',
        HYPERLINK_TYPE_CASE: 'Case',
        HYPERLINK_TYPE_REPORT: 'Report',
        HYPERLINK_TYPE_DATA: 'Data',
        HYPERLINK_TYPE_POLL: 'Poll',
        HYPERLINK_TYPE_WEB: 'Website',
        HYPERLINK_TYPE_SIMULATION: 'Simulation / Game',
        HYPERLINK_TYPE_SOFTWARE: 'Software',
        MOBILE_MENU_BACK: 'Back',
        BUTTON_MANAGEMENT: 'Course outline list',
        STATUS_INITIAL: 'Initial',
        STATUS_DRAFT: 'Draft',
        STATUS_PUBLISHED: 'Published' ,
        STATUS_NOT_ATTRIBUTED: 'Not attributed',
        BUTTON_CREATE_SYLLABUS: 'Create a specific course outline',
        LINK_SYLLABUS: 'Go',
        BUTTON_DELETE_SYLLABUS: 'Delete',
        MODAL_TITLE_NEW_SYLLABUS: 'Add course outline',
        MODAL_DESCRIPTION_NEW_SYLLABUS: 'Add a new specific course outline ?',
        MODAL_SECTIONS_NEW_SYLLABUS: 'Select the sections for this course outline',
        MODAL_NEW_SYLLABUS: 'Label',
        MODAL_TITLE_DELETE_SYLLABUS: 'Alert',
        MODAL_DESCRIPTION_DELETE_SYLLABUS: 'Delete the course outline ',
        MODAL_SECTIONS_DELETE_SYLLABUS: 'The following sections have been assigned to this course outline. You have to retire them from the course outline.',
        TABLE_NAME : 'Course outline',
        TABLE_AUTHOR : 'Author',
        TABLE_SECTIONS : 'Sections',
        TABLE_STATUS : 'Status',
        TABLE_LAST_PUBLISHED_DATE: 'Last publication',
        TABLE_LAST_MODIFICATION_DATE: 'Last modification',
        DELETE_SYLLABUS_OK : 'The following courses outlines will be deleted',
        DELETE_SYLLABUS_KO : 'The following courses outlines can\'t be deleted because there are sections attached to them',
        MANAGEMENT_NO_SECTION: 'The name must be specified',
        MANAGEMENT_ERREUR_NAME: 'No section',
        FORUM: 'Forum',
        ASSIGNMENT: 'Assignments',
        SAM_PUB: 'Tests et Quizzes',
        HOME_ERROR_LOADING: 'Error during loading.',
        CREATE_SYLLABUS_DEFAULT_NAME: 'Specific syllabus',
        DATA_MODIFIABLE_IN_RESOURCES: 'Les données suivantes sont modifiables dans l\'outil Ressources',
        COPYRIGHT_STATUS: 'Statut des droits d\'auteur',
        COPYRIGHT_UNDEFINED: 'Non défini',
        COPYRIGHT_I_HOLD: 'I hold the rights',
        VISIBILITY: 'Visibility',
        BUTTON_PUBLISH: 'Publish',
        PUBLISH_WORKING: 'Publishing operation in progress...',
        PUBLISHED_SYLLABUS: 'Published',
        DRAFTED_SYLLABUS: 'Not published',
        NOTATTRIBUTED_SYLLABUS: 'Not attributed',
        PUBLISH_TITLE_LABEL: 'Publish the course outline',
        PUBLISH_LAST_PUBLISH_LABEL: 'Last publication of the course outline:',
        PUBLISH_MODIFIED_SECTIONS_LABEL: 'Voulez-vous publier les modifications pour le plan de cours associé au(x) section(s)',
        PUBLISH_MODIFIED_PAGES_LABEL: 'Liste des pages modifiées',
        PUBLISH_CANCEL_BUTTON_LABEL: 'Annuler',
        BUTTON_OK: 'Ok',
        ADD: 'Add',
        ADD_DESCRIPTION: 'Ajouter une description',
        NO_VALID_SYLLABUS_TO_DELETE: 'Les plans de cours sélectionnés contiennent des sections et ne peuvent être supprimés',
        SOME_INVALID_SYLLABUS_TO_DELETE: 'Les plans de cours suivants contiennent des sections et ne peuvent être supprimés'
    })
    .translations('fr', {
        MENU_LABEL: 'Menu du cours',
        MODAL_DELETE_CONFIRM_TITLE: "Suppression de l'élément",
        MODAL_DELETE_CONFIRM_MESSAGE: "Êtes-vous sûr de vouloir supprimer l'élément",
        MODAL_CREATE_ELEMENT_TITLE: 'Ajout élément',
        MODAL_EDIT_ELEMENT_TITLE: 'Modification élément',
        TYPE_ELEMENT_TEXT: "Texte",
        TYPE_ELEMENT_DOCUMENT: "Document",
        TYPE_ELEMENT_IMAGE: "Image",
        TYPE_ELEMENT_VIDEO: "Vidéo",
        TYPE_ELEMENT_CONTACT: "Info contact",
        TYPE_ELEMENT_CITATION: "Référence bibliographique",
        TYPE_ELEMENT_HYPERLINK: "Hyperlien",
        TYPE_ELEMENT_SAKAIENTITY: "Lien vers outil",
        TYPE_ELEMENT_EVALUATION: "Évaluation",
        TYPE_ELEMENT_EXAM: "Examen",
        TYPE_ELEMENT_COMPOSITE: "Regroupement",
        TYPE_ELEMENT_RUBRIC: "Rubrique",
        TYPE_ELEMENT_LECTURE: "Séance de cours",
        TYPE_ELEMENT_TUTORIAL: "Scéance de travaux pratiques",
        RESOURCE_BROWSER_TITLE: "Ressource",
        RESOURCE_BROWSER_SELECTED: "Ressource sélectionnée",
        CITATION_BROWSER_TITLE: "Ressource bibliographique",
        BIBLIO_BROWSER_SELECTED: "Ressource bibliographique sélectionnée",
        SAKAI_TOOL_BROWSER_TITLE: "Entité Sakai",
        ERROR_SAKAI_TOOL: 'Un outil doit être sélectionnée',
        ERROR_MISSING_DOCUMENT: 'Une ressource doit être sélectionnée',
        ERROR_MISSING_CITATION: 'Une référence bibliographique doit être sélectionnée',
        ERROR_MISSING_IMAGE: 'Une image doit être sélectionnée',
        ERROR_MISSING_CONTACTINFO_FIRSTNAME: 'Le prénom est obligatoire',
        ERROR_MISSING_CONTACTINFO_LASTNAME: 'Le nom est obligatoire',
        FORM_TITLE: "Libellé",
        FORM_DESCRIPTION: "Description / Commentaire",
        FORM_IMPORTANT: "Important",
        FORM_VISIBILITY: "Visibilité limitée aux étudiants inscrits au cours",
        FORM_DATE_DISPLAY_START: "Date d'affichage",
        FORM_DATE_DISPLAY_END: "Date de retrait",
        FORM_URL: 'URL',
        FORM_URL_EMBED: 'URL ou embed',
        CONTACTINFO_FIRSTNAME: "Prénom",
        CONTACTINFO_LASTNAME: "Nom",
        CONTACTINFO_TITLE: "Titre",
        CONTACTINFO_EMAIL: "Courriel",
        CONTACTINFO_TELEPHONE: "Téléphone",
        CONTACTINFO_OFFICEROOM: "Bureau",
        CONTACTINFO_AVAILABILITY: "Disponibilités",
        FORM_DOCUMENT_TYPE: "Type",
        FORM_CONTENT: "Contenu",
        FORM_CONTACT_TITLE_DEFAULT: '...',
        FORM_CONTACT_TITLE_FULLTIMEFACULTYLECTURER: 'Attaché(e) d\'enseignement',
        FORM_CONTACT_TITLE_PARTTIMELECTURER: 'Chargé(e) d\'enseignement',
        FORM_CONTACT_TITLE_PARTTIMEFACULTYLECTURER: 'Chargé(e) de cours',
        FORM_CONTACT_TITLE_STUDENT: 'Étudiant(e)',
        FORM_CONTACT_TITLE_FULLTIMELECTURER: 'Maître d\'enseignement',
        FORM_CONTACT_TITLE_ASSISTANTPROFESSOR: 'Professeur(e) adjoint(e)',
        FORM_CONTACT_TITLE_AFFILIATEDPROFESSOR: 'Professeur(e) affilié(e)',
        FORM_CONTACT_TITLE_ASSOCIATEPROFESSOR: 'Professeur(e) agrégé(e)',
        FORM_CONTACT_TITLE_ADJUNCTPROFESSOR: 'Professeur(e) associé(e)',
        FORM_CONTACT_TITLE_HONORARYPROFESSOR: 'Professeur(e) honoraire',
        FORM_CONTACT_TITLE_GUESTPROFESSOR: 'Professeur(e) invité(e)',
        FORM_CONTACT_TITLE_PROFESSOR: 'Professeur(e) titulaire',
        FORM_CONTACT_TITLE_SECRETARY: 'Secrétaire',
        FORM_CONTACT_TITLE_TRAINEE: 'Stagiaire',
        FORM_DISPLAY_DEFAULT: 'Montrer cet élément',
        FORM_DISPLAY_INTERVAL: 'Afficher cet élément à une date précise',
        REF_BIBLIO_FROM: "Récupéré de ",
        REF_BIBLIO_DISPONIBILITY: "Disponible à la bibliothèque",
        REF_BIBLIO_FROM2: "DE",
        EVALUATION_TITLE: "Titre de l'évaluation",
        EVALUATION_WEIGHT: "Pondération",
        EVALUATION_LOCATION: "Lieu: ",
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
        EVALUATION_DATE: "Date de l\'évaluation: ",
        EVALUATION_TYPE: "Type d\'évaluation: ",
        EXAM_TITLE: "Titre de l'examen",
        EXAM_WEIGHT: "Pondération",
        EXAM_LOCATION: "Lieu: ",
        EXAM_INCLASS: "En classe ",
        EXAM_ATHOME: "A la maison",
        EXAM_TERMS: "Modalité: ",
        EXAM_ORAL: "Oral",
        EXAM_WRITTEN: "Écrit",
        EXAM_SUBMISSION_TYPE: "Mode de remise: ",
        EXAM_PAPER: "Papier",
        EXAM_ELECTRONIC: "Électronique",
        EXAM_ASSESSMENT_TYPE: "Mode de travail: ",
        EXAM_INDIVIDUAL: "Individuel",
        EXAM_TEAM: "En équipe",
        EXAM_DATE: "Date de l\'évaluation: ",
        EXAM_TYPE: "Type d\'évaluation: ",
        CONTACT_OFFICEROOM: "Bureau",
        CONTACT_AVAILABILITY: "Disponibilité",
        REF_BIBLIO_ISSN: "ISSN:",
        REF_BIBLIO_ISBN: "ISBN:",
        ERROR_FORMAT_DATE_START: 'Le format de la date d\'affichage est incorrect',
        ERROR_FORMAT_DATE_END: 'Le format de la date de retrait est incorrect',
        ERROR_CONTENT_MANDATORY: 'Le champ contenu est obligatoire',
        ERROR_START_DATE_GREATER: 'La date de retrait doit être ultérieure la date d\'affichage',
        ERROR_URL_MANDATORY: "Le champ URL est obligatoire",
        ALERT_ERROR: 'Une erreur s\'est produite. Veuillez réessayer ultérieurement.',
        ALERT_SUCCESS: 'L\' opération a réussi.',
        ALERT_SUCCESS_ADD_ELEMENT: 'L\' élément a été ajouté.',
        ALERT_SUCCESS_DELETE_ELEMENT : 'L\'élément a été supprimé.',
        ALERT_SUCCESS_SAVE_SYLLABUS: 'Le plan de cours a été sauvegardé.',
        ALERT_RUBRIC_EXISTS: 'La rubrique est déjà présente',
        ALERT_SUCCESS_ADD_SYLLABUS: 'Le syllabus a bien été ajouté.',
        ALERT_SUCCESS_DELETE_SYLLABUS: 'La suppression a réussi',
        CALENDAR_TODAY : 'Aujourd\'hui', 
        CALENDAR_NOW : 'Maintenant',
        CALENDAR_DATE : 'Date',
        CALENDAR_TIME : 'Heure',
        CALENDAR_CLEAR : 'Effacer',
        CALENDAR_CLOSE : 'Fermer',
        ERROR_SYLLABUS : 'Le chargement du plan de cours a échoué. Veuillez essayer ultérieurement ou contacter le support.',
        ERROR_TEMPLATE : 'Le chargement du plan de cours a partiellement échoué. Celui ci est disponible en lecture seulement. Veuillez essayer ultérieurement ou contacter le support.',
        BUTTON_SAVE: 'Enregistrer',
        BUTTON_CANCEL: 'Annuler',
        SAVE_WORKING: 'Opération en cours...',
        DOCUMENT_TYPE_DEFAULT : '...',
        DOCUMENT_TYPE_CONFERENCE_ACT: 'Actes de conférence',
        DOCUMENT_TYPE_OLD_EXAM: 'Ancien examen',
        DOCUMENT_TYPE_ARTICLE: 'Article',
        DOCUMENT_TYPE_ARTICLE_NEWS: 'Article d\'actualité',
        DOCUMENT_TYPE_ARTICLE_SCIENCE: 'Article scientifique',
        DOCUMENT_TYPE_ARTICLE_PROFESSIONAL: 'Article professionnel',
        DOCUMENT_TYPE_ARTICLE_UNPUBLISHED: 'Article non publié',
        DOCUMENT_TYPE_AUDIO: 'Audio',
        DOCUMENT_TYPE_CASE: 'Cas',
        DOCUMENT_TYPE_BOOK_CHAPTER: 'Chapitre de livre',
        DOCUMENT_TYPE_SLIDES: 'Diapositives / Présentation',
        DOCUMENT_TYPE_PEDAGOGIC: 'Pédagogique',
        DOCUMENT_TYPE_DATA: 'Données',
        DOCUMENT_TYPE_POLL: 'Enquête / Sondage',
        DOCUMENT_TYPE_EXERCISE: 'Exercice / Problème',
        DOCUMENT_TYPE_IMAGE: 'Image / Graphique',
        DOCUMENT_TYPE_BOOK: 'Livre',
        DOCUMENT_TYPE_SOFTWARE: 'Logiciel',
        DOCUMENT_TYPE_REPORT: 'Rapport',
        DOCUMENT_TYPE_REPORT_ANNUAL: 'Rapport annuel',
        DOCUMENT_TYPE_REPORT_CONSULTANT: 'Rapport de consultant',
        DOCUMENT_TYPE_REPORT_ORGANIZATION: 'Rapport d\'organisation internationale',
        DOCUMENT_TYPE_REPORT_GOV: 'Rapport gouvernemental',
        DOCUMENT_TYPE_GAME: 'Simulation / Jeu',
        DOCUMENT_TYPE_WEBSITE: 'Site web',
        DOCUMENT_TYPE_SOLUTION: 'Solution',
        DOCUMENT_TYPE_THESIS: 'Thèse / Mémoire',
        DOCUMENT_TYPE_VIDEO: 'Vidéo',
        DOCUMENT_TYPE_OTHER: 'Autre',
        HYPERLINK_TYPE_DEFAULT: '...',
        HYPERLINK_TYPE_VIDEO: 'Vidéo',
        HYPERLINK_TYPE_ARTICLE: 'Article',
        HYPERLINK_TYPE_NEWS_ARTICLE: 'Article d\'actualité',
        HYPERLINK_TYPE_CASE: 'Cas',
        HYPERLINK_TYPE_REPORT: 'Rapport',
        HYPERLINK_TYPE_DATA: 'Données',
        HYPERLINK_TYPE_POLL: 'Enquête / Sondage',
        HYPERLINK_TYPE_WEB: 'Site web',
        HYPERLINK_TYPE_SIMULATION: 'Simulation / Jeu',
        HYPERLINK_TYPE_SOFTWARE: 'Logiciel / Programme',
        MOBILE_MENU_BACK: 'Retour',
        BUTTON_MANAGEMENT: 'Liste des plans de cours',
        STATUS_INITIAL: 'Initial',
        STATUS_DRAFT: 'Brouillon',
        STATUS_PUBLISHED: 'Publié' ,
        STATUS_NOT_ATTRIBUTED: 'Non attribué',
        BUTTON_CREATE_SYLLABUS: 'Créer un plan de cours spécifique',
        LINK_SYLLABUS: 'Accéder',
        BUTTON_DELETE_SYLLABUS: 'Supprimer',
        MODAL_TITLE_NEW_SYLLABUS: 'Ajout plan de cours',
        MODAL_DESCRIPTION_NEW_SYLLABUS: 'Ajouter un nouveau plan de cours spécifique ?',
        MODAL_SECTIONS_NEW_SYLLABUS: 'Sélectionner les sections pour ce plan de cours',
        MODAL_NEW_SYLLABUS: 'Libellé',
        MODAL_TITLE_DELETE_SYLLABUS: 'Alerte',
        MODAL_DESCRIPTION_DELETE_SYLLABUS: 'Supprimer le plan de cours ',
        MODAL_SECTIONS_DELETE_SYLLABUS: 'Les sections suivantes sont assignées à ce plan de cours. Vous devez d\'abord les retirer du plan de cours.',
        TABLE_NAME : 'Plan de cours',
        TABLE_AUTHOR : 'Auteur',
        TABLE_SECTIONS : 'Sections',
        TABLE_STATUS : 'Statut',
        TABLE_LAST_PUBLISHED_DATE: 'Dernière publication',
        TABLE_LAST_MODIFICATION_DATE: 'Dernière modification',
        DELETE_SYLLABUS_OK : 'Les plans de cours suivant vont être supprimés',
        DELETE_SYLLABUS_KO : 'Les plans de cours suivant ne peuvent pas être supprimés car il y a des sections associées',
        MANAGEMENT_NO_SECTION: 'Aucune section',
        MANAGEMENT_ERREUR_NAME: 'Le nom doit être indiqué',
        FORUM: 'Forum',
        ASSIGNMENT: 'Remise de travaux',
        SAM_PUB: 'Tests et Quiz',
        HOME_ERROR_LOADING: 'Erreur durant le chargement.',
        CREATE_SYLLABUS_DEFAULT_NAME: 'Plan de cours spécifique',
        DATA_MODIFIABLE_IN_RESOURCES: 'Les données suivantes sont modifiables dans l\'outil Ressources',
        COPYRIGHT_STATUS: 'Statut des droits d\'auteur',
        COPYRIGHT_UNDEFINED: 'Non défini',
        COPYRIGHT_I_HOLD: 'Défini',
        VISIBILITY: 'Visibilité',
        VISIBILITY_PUBLIC: 'Ressource publique',
        VISIBILITY_STUDENTS: 'Ressource limitée aux étudiants inscrits au cours',
        BUTTON_PUBLISH: 'Publier',
        PUBLISH_WORKING: 'Opération de publication en cours...',
        PUBLISHED_SYLLABUS: 'Publié',
        DRAFTED_SYLLABUS: 'Non publié',
        PUBLISH_TITLE_LABEL: 'Publier le plan de cours',
        PUBLISH_LAST_PUBLISH_LABEL: 'Dernière publication du plan de cours:',
        PUBLISH_MODIFIED_SECTIONS_LABEL: 'Voulez-vous publier les modifications pour le plan de cours associé au(x) section(s)',
        PUBLISH_MODIFIED_PAGES_LABEL: 'Liste des pages modifiées',
        PUBLISH_CANCEL_BUTTON_LABEL: 'Annuler',
        NOTATTRIBUTED_SYLLABUS: 'Non attribué',
        BUTTON_OK: 'Ok',
        ADD: 'Ajouter',
        ADD_DESCRIPTION: 'Ajouter une description',
        NO_VALID_SYLLABUS_TO_DELETE: 'Les plans de cours sélectionnés contiennent des sections et ne peuvent être supprimés',
        SOME_INVALID_SYLLABUS_TO_DELETE: 'Les plans de cours suivants contiennent des sections et ne peuvent être supprimés'
    });

     $translateProvider.preferredLanguage('fr');
}]);
