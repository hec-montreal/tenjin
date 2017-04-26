﻿tenjinApp.config(['$translateProvider', function($translateProvider) {
	'use strict';

	$translateProvider.useSanitizeValueStrategy('escape');

	$translateProvider.translations('en_US', {
		MENU_LABEL: 'Course menu',
		MODAL_DELETE_CONFIRM_TITLE: 'Delete Element',
		MODAL_DELETE_CONFIRM_MESSAGE: 'Are you sure you want to delete this element',
		MODAL_CREATE_ELEMENT_TITLE: 'Add Element',
		MODAL_EDIT_ELEMENT_TITLE: 'Edit Element',
		TYPE_ELEMENT_TEXT: 'Text',
		TYPE_ELEMENT_DOCUMENT: 'Document',
		TYPE_ELEMENT_IMAGE: 'Image',
		TYPE_ELEMENT_VIDEO: 'Video',
		TYPE_ELEMENT_CONTACT: 'Contact information',
		TYPE_ELEMENT_CITATION: 'Citation',
		TYPE_ELEMENT_HYPERLINK: 'Hyperlink',
		TYPE_ELEMENT_SAKAIENTITY: 'Tool',
		TYPE_ELEMENT_EVALUATION: 'Evaluation',
		TYPE_ELEMENT_EXAM: 'Exam',
		TYPE_ELEMENT_COMPOSITE: 'Group',
		TYPE_ELEMENT_RUBRIC: 'Course',
		TYPE_ELEMENT_LECTURE: 'Lecture',
		TYPE_ELEMENT_TUTORIAL: 'Tutorial',
		RESOURCE_BROWSER_TITLE: 'Resource',
		RESOURCE_BROWSER_SELECTED: 'Selected Resource',
		CITATION_BROWSER_TITLE: 'Citation',
		BIBLIO_BROWSER_SELECTED: 'Selected Citation',
		SAKAI_TOOL_BROWSER_TITLE: 'Sakai Entity',
		ERROR_SAKAI_TOOL: 'A tool must be selected',
		ERROR_MISSING_DOCUMENT: 'A resource must be selected',
		ERROR_MISSING_CITATION: 'A citation must be selected',
		ERROR_MISSING_IMAGE: 'An image must be selected',
		ERROR_MISSING_CONTACTINFO_FIRSTNAME: 'Please enter a first name',
		ERROR_MISSING_CONTACTINFO_LASTNAME: 'Please enter a last name',
		ERROR_MISSING_VIDEO_URL: 'Please enter a video URL',
		ERROR_INVALID_VIDEO_URL: 'Please enter a valid video URL',
		FORM_TITLE: 'Title',
		FORM_DESCRIPTION: 'Description',
		FORM_IMPORTANT: 'Important (add a header)',
		FORM_VISIBILITY: 'Visibility limited to students of this course',
		FORM_DATE_DISPLAY_START: 'Diffusion Date',
		FORM_DATE_DISPLAY_END: 'Ending Date',
		FORM_URL: 'URL',
		FORM_URL_EMBED: 'URL',
		FORM_EMBED: 'Embed Code',
		CONTACTINFO_FIRSTNAME: 'First Name',
		CONTACTINFO_LASTNAME: 'Last Name',
		CONTACTINFO_TITLE: 'Title',
		CONTACTINFO_EMAIL: 'Email',
		CONTACTINFO_TELEPHONE: 'Phone number',
		CONTACTINFO_OFFICEROOM: 'Office',
		CONTACTINFO_AVAILABILITY: 'Availability',
		FORM_DOCUMENT_TYPE: 'Type',
		FORM_CONTENT: 'Content',
		CONTACT_TITLE: '...',
		CONTACT_TITLE_FULLTIMEFACULTYLECTURER: 'Full-time Faculty Lecturer',
		CONTACT_TITLE_PARTTIMELECTURER: 'Part-time Lecturer',
		CONTACT_TITLE_PARTTIMEFACULTYLECTURER: 'Part-time Faculty Lecturer',
		CONTACT_TITLE_STUDENT: 'Student',
		CONTACT_TITLE_FULLTIMELECTURER: 'Full-time Lecturer',
		CONTACT_TITLE_ASSISTANTPROFESSOR: 'Assistant Professor',
		CONTACT_TITLE_AFFILIATEDPROFESSOR: 'Affiliated Professor',
		CONTACT_TITLE_ASSOCIATEPROFESSOR: 'Associate Professor',
		CONTACT_TITLE_ADJUNCTPROFESSOR: 'Adjunct Professor',
		CONTACT_TITLE_HONORARYPROFESSOR: 'Honorary Professor',
		CONTACT_TITLE_GUESTPROFESSOR: 'Guest Professor',
		CONTACT_TITLE_PROFESOR: 'Professor',
		CONTACT_TITLE_SECRETARY: 'Secretary',
		CONTACT_TITLE_TRAINEE: 'Intern',
		CONTACT_TITLE_SEMINARY: 'Lecturer',
		FORM_DISPLAY_DEFAULT: 'Show this element',
		FORM_DISPLAY_INTERVAL: 'Show this element at a date',
		FORM_REFERENCE_TYPE: 'Type',
		EVALUATION_TITLE: 'Evaluation Title',
		EVALUATION_WEIGHT: 'Weight',
		EVALUATION_LOCATION: 'Location: ',
		EVALUATION_INCLASS: 'In class ',
		EVALUATION_ATHOME: 'At home',
		EVALUATION_ORAL: 'Oral',
		EVALUATION_WRITTEN: 'Written',
		EVALUATION_PAPER: 'Paper',
		EVALUATION_ELECTRONIC: 'Electronic',
		EVALUATION_INDIVIDUAL: 'Individual',
		EVALUATION_TEAM: 'Team',
		EVALUATION_TYPE: 'Evaluation type: ',
		REF_BIBLIO_FROM: 'From',
		EVALUATION_TERMS: 'Term: ',
		EVALUATION_SUBMISSION_TYPE: 'Submission: ',
		EVALUATION_ASSESSMENT_TYPE: 'Work Mode: ',
		EVALUATION_DATE: 'Evaluation Date: ',
		EXAM_TITLE: 'Exam Title',
		EXAM_WEIGHT: 'Weight',
		EXAM_LOCATION: 'Location: ',
		EXAM_INCLASS: 'In class ',
		EXAM_ATHOME: 'At home',
		EXAM_ORAL: 'Oral',
		EXAM_WRITTEN: 'Written',
		EXAM_PAPER: 'Paper',
		EXAM_ELECTRONIC: 'Electronic',
		EXAM_INDIVIDUAL: 'Individual',
		EXAM_TEAM: 'Team',
		EXAM_TYPE: 'Evaluation type: ',
		EXAM_TERMS: 'Term: ',
		EXAM_SUBMISSION_TYPE: 'Submission: ',
		EXAM_ASSESSMENT_TYPE: 'Work Mode: ',
		EXAM_DATE: 'Evaluation Date: ',
		CONTACT_OFFICEROOM: 'Office: ',
		CONTACT_AVAILABILITY: 'Availability',
		REF_BIBLIO_DISPONIBILITY: 'Available at the library',
		REF_BIBLIO_FROM2: 'FROM',
		REF_BIBLIO_ISSN: 'ISSN:',
		REF_BIBLIO_ISBN: 'ISBN:',
		ERROR: 'Error',
		ERROR_FORMAT_DATE_START: 'The format of the diffusion date is invalid',
		ERROR_FORMAT_DATE_END: 'The format of the ending date is invalid',
		ERROR_CONTENT_MANDATORY: 'The content field is mandatory',
		ERROR_START_DATE_GREATER: 'The end date must be later than the start date',
		ERROR_URL_MANDATORY: 'The URL field is mandatory',
		ERROR_TITLE_MANDATORY: 'Title is mandatory',
		ERROR_TITLE_TOO_LONG: 'Title is too long',
		ALERT_ERROR: 'An error has occurred. Please try later.',
		ALERT_SUCCESS: 'The operation succeeded.',
		ALERT_SUCCESS_ADD_ELEMENT: 'The element has been added.',
		ALERT_SUCCESS_DELETE_ELEMENT: 'The element has been deleted.',
		ALERT_SUCCESS_SAVE_SYLLABUS: 'The course outline has been saved.',
		ALERT_RUBRIC_EXISTS: 'The rubric already exists',
		ALERT_SUCCESS_ADD_SYLLABUS: 'The personalized course outline has been added.',
		ALERT_SUCCESS_DELETE_SYLLABUS: 'The course outline has been deleted',
		ALERT_CANNOT_CREATE_ANNOUNCEMENT: 'Cannot create announcement',
		ALERT_CANNOT_LOAD_BASE_DATA: 'Cannot load base data',
		ALERT_CANNOT_SAVE_SYLLABUS: 'Cannot save course outline',
		ALERT_CANNOT_DELETE_SYLLABUS_LIST: 'Cannot delete course outline list',
		ALERT_CANNOT_PUBLISH_SYLLABUS: 'Cannot publish course outline',
		ALERT_NO_SYLLABUS: 'No course outline',
		ALERT_IMPORT_SERVICE_UNDEFINED: 'No import service is defined',
		ALERT_NO_LOCK: 'You don\'t have the lock on this course outline',
		ALERT_LOCKED_BY: 'The current course outline is locked by %1',
		ALERT_IMPORT_SYLLABUS_PERMISSION_ERROR: 'You are not authorized to copy the specified course outline',
		ALERT_IMPORT_SYLLABUS_NOT_FOUND: 'The specified course outline does not exist',
		ALERT_IMPORT_SYLLABUS_ERROR: 'An error occurred importing the course outline',
		CALENDAR_TODAY: 'Today',
		CALENDAR_NOW: 'Now',
		CALENDAR_DATE: 'Date',
		CALENDAR_TIME: 'Time',
		CALENDAR_CLEAR: 'Reset',
		CALENDAR_CLOSE: 'Close',
		ERROR_SYLLABUS: 'The course outline failed to load. Please try again or contact IT support.',
		ERROR_TEMPLATE: 'An error occurred during the course outline load. Course outline is currently in read-only mode. Please try again or contact IT support.',
		BUTTON_SAVE: 'Save',
		BUTTON_CANCEL: 'Cancel',
		SAVE_WORKING: 'Operation in progress...',
		DOCUMENT_TYPE_DEFAULT: '...',
		DOCUMENT_TYPE_CONFERENCE_ACT: 'Conference proceedings',
		DOCUMENT_TYPE_OLD_EXAM: 'Past exam',
		DOCUMENT_TYPE_ARTICLE: 'Article',
		DOCUMENT_TYPE_ARTICLE_NEWS: 'News article',
		DOCUMENT_TYPE_ARTICLE_SCIENCE: 'Scientific article ',
		DOCUMENT_TYPE_ARTICLE_PROFESSIONAL: 'Professional article',
		DOCUMENT_TYPE_ARTICLE_UNPUBLISHED: 'Unpublished article',
		DOCUMENT_TYPE_AUDIO: 'Audio',
		DOCUMENT_TYPE_CASE: 'Case',
		DOCUMENT_TYPE_BOOK_CHAPTER: 'Book chapter',
		DOCUMENT_TYPE_SLIDES: 'Slides / Presentation',
		DOCUMENT_TYPE_PEDAGOGIC: 'Pedagogical document',
		DOCUMENT_TYPE_DATA: 'Data',
		DOCUMENT_TYPE_POLL: 'Survey',
		DOCUMENT_TYPE_EXERCISE: 'Exercise / Problem',
		DOCUMENT_TYPE_IMAGE: 'Image / Graphic',
		DOCUMENT_TYPE_BOOK: 'Book',
		DOCUMENT_TYPE_SOFTWARE: 'Software',
		DOCUMENT_TYPE_REPORT: 'Report',
		DOCUMENT_TYPE_REPORT_ANNUAL: 'Annual report',
		DOCUMENT_TYPE_REPORT_CONSULTANT: 'Consultant report',
		DOCUMENT_TYPE_REPORT_ORGANIZATION: 'International organization report',
		DOCUMENT_TYPE_REPORT_GOV: 'Government report',
		DOCUMENT_TYPE_GAME: 'Simulation / Game',
		DOCUMENT_TYPE_WEBSITE: 'Web site',
		DOCUMENT_TYPE_SOLUTION: 'Solution',
		DOCUMENT_TYPE_THESIS: 'Thesis',
		DOCUMENT_TYPE_VIDEO: 'Video',
		DOCUMENT_TYPE_OTHER: 'Other',
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
		REFERENCE_TYPE_DEFAULT: '...',
		REFERENCE_TYPE_BOOK: 'Book',
		REFERENCE_TYPE_BOOK_CHAPTER: 'Book chapter',
		REFERENCE_TYPE_CASE: 'Case',
		REFERENCE_TYPE_ARTICLE: 'Article',
		REFERENCE_TYPE_ARTICLE_NEWS: 'News article',
		REFERENCE_TYPE_SLIDES: 'Slides / Presentation',
		REFERENCE_TYPE_EXERCISE: 'Exercise / Problem',
		REFERENCE_TYPE_SOLUTION: 'Solution',
		REFERENCE_TYPE_REPORT: 'Report',
		REFERENCE_TYPE_DATA: 'Data',
		REFERENCE_TYPE_PEDAGOGIC: 'Pedagogical document',
		REFERENCE_TYPE_POLL: 'Survey / Poll',
		REFERENCE_TYPE_OLD_EXAM: 'Past exam',
		REFERENCE_TYPE_WEBSITE: 'Web site',
		REFERENCE_TYPE_AUDIO: 'Audio',
		REFERENCE_TYPE_VIDEO: 'Video',
		REFERENCE_TYPE_SIMULATION: 'Simulation / Game',
		REFERENCE_TYPE_SOFTWARE: 'Software',
		REFERENCE_TYPE_OTHER: 'Other',
		REFERENCE_LIBRARY_LINK: 'Available at the library',
		REFERENCE_OTHER_LINK: 'Other link',
		MOBILE_MENU_BACK: 'Back',
		BUTTON_MANAGEMENT: 'Course outline list',
		STATUS_INITIAL: 'Initial',
		STATUS_DRAFT: 'Draft',
		STATUS_PUBLISHED: 'Published',
		STATUS_NOT_ATTRIBUTED: 'Not attributed',
		BUTTON_CREATE_SYLLABUS: 'Create a personalized course outline',
		LINK_SYLLABUS: 'Go',
		BUTTON_DELETE_SYLLABUS: 'Delete',
		MODAL_TITLE_NEW_SYLLABUS: 'Add Course Outline',
		MODAL_DESCRIPTION_NEW_SYLLABUS: 'Add a new personalized course outline ?',
		MODAL_SECTIONS_NEW_SYLLABUS: 'Select the sections for this course outline',
		MODAL_NEW_SYLLABUS: 'Label',
		MODAL_TITLE_DELETE_SYLLABUS: 'Alert',
		MODAL_DESCRIPTION_DELETE_SYLLABUS: 'Delete the course outline ',
		MODAL_SECTIONS_DELETE_SYLLABUS: 'The following sections have been assigned to this course outline. You have to unassign those sections before deleting the course outline.',
		TABLE_NAME: 'Course Outline',
		TABLE_AUTHOR: 'Author',
		TABLE_SECTIONS: 'Sections',
		TABLE_STATUS: 'Status',
		TABLE_LAST_PUBLISHED_DATE: 'Last Publication',
		TABLE_LAST_MODIFICATION_DATE: 'Last Modification',
		DELETE_SYLLABUS_OK: 'The following courses outlines will be deleted',
		DELETE_SYLLABUS_KO: 'The following courses outlines can\'t be deleted because there are sections attached to them',
		MANAGEMENT_NO_SECTION: 'The name must be specified',
		MANAGEMENT_ERREUR_NAME: 'No section',
		FORUM: 'Forum',
		ASSIGNMENT: 'Assignments',
		SAM_PUB: 'Tests et Quizzes',
		HOME_ERROR_LOADING: 'Error during loading.',
		CREATE_SYLLABUS_DEFAULT_NAME: 'personalized course outline',
		DATA_MODIFIABLE_IN_RESOURCES: 'The following data are editable with the Resources tool',
		COPYRIGHT_STATUS: 'Copyright status',
		COPYRIGHT_UNDEFINED: 'Undefined',
		COPYRIGHT_I_HOLD: 'I hold the rights',
		VISIBILITY: 'Visibility',
		VISIBILITY_PUBLIC: 'Public resource',
		VISIBILITY_STUDENTS: 'Course students',
		BUTTON_PUBLISH: 'Publish',
		PUBLISH_WORKING: 'Publishing operation in progress...',
		PUBLISHED_SYLLABUS: 'Published',
		DRAFTED_SYLLABUS: 'Not published',
		NOTATTRIBUTED_SYLLABUS: 'Not attributed',
		PUBLISH_CHECK_COMMON: 'The common course outline must be published first before you can publish this course outline.',
		PUBLISH_TITLE_LABEL: 'Publish the course outline',
		PUBLISH_LAST_PUBLISH_LABEL: 'Last publication of the course outline:',
		PUBLISH_MODIFIED_SECTIONS_LABEL: 'Do you want to publish the course outline modifications for sections',
		PUBLISH_MODIFIED_PAGES_LABEL: 'List of modified pages',
		PUBLISH_CANCEL_BUTTON_LABEL: 'Cancel',
		PUBLISH_STATE_TITLE: 'Confirm',
		PUBLISH_ANNOUNCEMENT: 'Publish an announcement',
		PUBLISH_ANNOUNCEMENT_INFO: 'A message will be added to the site announcement tool. You can personalize the message with the fields below.',
		PUBLISH_ANNOUNCEMENT_TITLE: 'Title of the announcement',
		PUBLISH_ANNOUNCEMENT_MESSAGE: 'Text of the announcement',
		PUBLISH_SUCCESS: 'Publication succeeded',
		PUBLISH_FAILURE: 'Publication failed',
		ANNOUNCEMENT_TITLE: 'A new version of the course outline is available',
		ANNOUNCEMENT_MESSAGE: 'A new version of the course outline has been published on ',
		BUTTON_OK: 'Ok',
		ADD: 'Add',
		ADD_DESCRIPTION: 'Add description',
		NO_VALID_SYLLABUS_TO_DELETE: 'One or more course outlines have been assigned to sections. You need to unassign those sections before deleting the course outline.',
		SOME_INVALID_SYLLABUS_TO_DELETE: 'One or more course outlines have been assigned to sections. You need to unassign those sections before deleting the course outline.',
		SAKAI_TOOL: 'Sakai Tool',
		ACTIVATE_LIBRARY_LINK: 'Activate library link',
		ACTIVATE_COOP_LINK: 'Activate coop link',
		ACTIVATE_OTHER_LINK: 'Activate other link',
		SYLLABUS_NOT_AVAILABLE: 'Course outline is not available yet',
		MENU: 'Menu',
		NOT_PUBLISHED: 'Not published',
		WARNING: 'Warning',
		WARNING_UNSASSIGN_SECTIONS: 'Are you sure you want to unassign these sections ?',
		BUTTON_IMPORT_SYLLABUS: 'Import Course Outline',
		MODAL_DESCRIPTION_IMPORT_SYLLABUS: 'Import Course Outline',
		FORM_IMPORT_INSTRUCTIONS: 'This tool serves to import a course outline from the former course outline tool (prior to fall 2017). Enter the site id you would like to import the course outline from. All resources in the original course outline will be copied to this site automatically.',
		FORM_IMPORT_WARNING: 'Caution: the import will replace all existing course outlines in this site.',
		FORM_IMPORT_SITEID: 'Original Site Id',
		FORM_IMPORT_SITEID_PLACEHOLDER: '9-999-99.A2017(.A01)',
		FORM_IMPORT_CONFIRM: 'Are you sure you want to import this course outline? All existing course outlines in this site will be deleted and the common course outline will be replace.',
		ELEMENT_HIDDEN_BEFORE: 'Element hidden before ',
		ELEMENT_HIDDEN_BETWEEN: 'Element hidden before %1 and after %2',
		FROM_COMMON: 'From common',
		DATE_TIME_FORMAT: 'yyyy-MM-dd HH:mm',
		HIDDEN_BY_RESOURCE_FLAG: 'Hidden by resource',
		MISSING_SAKAI_ENTITY_FLAG: 'This link is pointing to an assignment or a quiz that does not exist',
		SOURCE: 'Source',
		SOURCE_URL: 'URL (Youtube, Vimeo, Dailymotion)',
		SOURCE_EMBED: 'Embed',
		COPY: 'Duplicate',
		COPY_SYLLABUS: 'Duplicate Course Outline',
		TITLE: 'Title',
		COPY_DEFAULT_NAME_PREFIX: 'Copy of',
		WARNING_UNSAVED: 'You have unsaved changes that will be lost if you leave this page, would you like to continue?'
	}).translations('fr_CA', {
		MENU_LABEL: 'Menu du cours',
		MODAL_DELETE_CONFIRM_TITLE: 'Suppression de l\'élément',
		MODAL_DELETE_CONFIRM_MESSAGE: 'Êtes-vous sûr de vouloir supprimer l\'élément',
		MODAL_CREATE_ELEMENT_TITLE: 'Ajout élément',
		MODAL_EDIT_ELEMENT_TITLE: 'Modification élément',
		TYPE_ELEMENT_TEXT: 'Texte',
		TYPE_ELEMENT_DOCUMENT: 'Document',
		TYPE_ELEMENT_IMAGE: 'Image',
		TYPE_ELEMENT_VIDEO: 'Vidéo',
		TYPE_ELEMENT_CONTACT: 'Info contact',
		TYPE_ELEMENT_CITATION: 'Référence bibliographique',
		TYPE_ELEMENT_HYPERLINK: 'Hyperlien',
		TYPE_ELEMENT_SAKAIENTITY: 'Lien vers outil',
		TYPE_ELEMENT_EVALUATION: 'Évaluation',
		TYPE_ELEMENT_EXAM: 'Examen',
		TYPE_ELEMENT_COMPOSITE: 'Regroupement',
		TYPE_ELEMENT_RUBRIC: 'Rubrique',
		TYPE_ELEMENT_LECTURE: 'Séance de cours',
		TYPE_ELEMENT_TUTORIAL: 'Séance de travaux pratiques',
		RESOURCE_BROWSER_TITLE: 'Ressource',
		RESOURCE_BROWSER_SELECTED: 'Ressource sélectionnée',
		CITATION_BROWSER_TITLE: 'Ressource bibliographique',
		BIBLIO_BROWSER_SELECTED: 'Ressource bibliographique sélectionnée',
		SAKAI_TOOL_BROWSER_TITLE: 'Entité Sakai',
		ERROR_SAKAI_TOOL: 'Un outil doit être sélectionné',
		ERROR_MISSING_DOCUMENT: 'Une ressource doit être sélectionnée',
		ERROR_MISSING_CITATION: 'Une référence bibliographique doit être sélectionnée',
		ERROR_MISSING_IMAGE: 'Une image doit être sélectionnée',
		ERROR_MISSING_CONTACTINFO_FIRSTNAME: 'Le prénom est obligatoire',
		ERROR_MISSING_CONTACTINFO_LASTNAME: 'Le nom est obligatoire',
		ERROR_MISSING_VIDEO_URL: 'L\'url du vidéo est obligatoire',
		ERROR_INVALID_VIDEO_URL: 'L\'url du vidéo est invalide',
		FORM_TITLE: 'Libellé',
		FORM_DESCRIPTION: 'Description / Commentaire',
		FORM_IMPORTANT: 'Important',
		FORM_VISIBILITY: 'Visibilité limitée aux étudiants inscrits au cours',
		FORM_DATE_DISPLAY_START: 'Date d\'affichage',
		FORM_DATE_DISPLAY_END: 'Date de retrait',
		FORM_URL: 'URL',
		FORM_URL_EMBED: 'URL',
		CONTACTINFO_FIRSTNAME: 'Prénom',
		CONTACTINFO_LASTNAME: 'Nom',
		CONTACTINFO_TITLE: 'Titre',
		CONTACTINFO_EMAIL: 'Courriel',
		CONTACTINFO_TELEPHONE: 'Téléphone',
		CONTACTINFO_OFFICEROOM: 'Bureau',
		CONTACTINFO_AVAILABILITY: 'Disponibilités',
		FORM_DOCUMENT_TYPE: 'Type',
		FORM_CONTENT: 'Contenu',
		CONTACT_TITLE: '...',
		CONTACT_TITLE_FULLTIMEFACULTYLECTURER: 'Attaché(e) d\'enseignement',
		CONTACT_TITLE_PARTTIMELECTURER: 'Chargé(e) d\'enseignement',
		CONTACT_TITLE_PARTTIMEFACULTYLECTURER: 'Chargé(e) de cours',
		CONTACT_TITLE_STUDENT: 'Étudiant(e)',
		CONTACT_TITLE_FULLTIMELECTURER: 'Maître d\'enseignement',
		CONTACT_TITLE_ASSISTANTPROFESSOR: 'Professeur(e) adjoint(e)',
		CONTACT_TITLE_AFFILIATEDPROFESSOR: 'Professeur(e) affilié(e)',
		CONTACT_TITLE_ASSOCIATEPROFESSOR: 'Professeur(e) agrégé(e)',
		CONTACT_TITLE_ADJUNCTPROFESSOR: 'Professeur(e) associé(e)',
		CONTACT_TITLE_HONORARYPROFESSOR: 'Professeur(e) honoraire',
		CONTACT_TITLE_GUESTPROFESSOR: 'Professeur(e) invité(e)',
		CONTACT_TITLE_PROFESSOR: 'Professeur(e) titulaire',
		CONTACT_TITLE_SECRETARY: 'Secrétaire',
		CONTACT_TITLE_TRAINEE: 'Stagiaire',
		CONTACT_TITLE_SEMINARY: 'Conférencier',
		FORM_DISPLAY_DEFAULT: 'Montrer cet élément',
		FORM_DISPLAY_INTERVAL: 'Afficher cet élément à une date précise',
		FORM_REFERENCE_TYPE: 'Type',
		REF_BIBLIO_FROM: 'Récupéré de ',
		REF_BIBLIO_DISPONIBILITY: 'Disponible à la bibliothèque',
		REF_BIBLIO_FROM2: 'DE',
		EVALUATION_TITLE: 'Titre de l\'évaluation',
		EVALUATION_WEIGHT: 'Pondération',
		EVALUATION_LOCATION: 'Lieu: ',
		EVALUATION_INCLASS: 'En classe ',
		EVALUATION_ATHOME: 'À la maison',
		EVALUATION_TERMS: 'Modalité: ',
		EVALUATION_ORAL: 'Oral',
		EVALUATION_WRITTEN: 'Écrit',
		EVALUATION_SUBMISSION_TYPE: 'Mode de remise: ',
		EVALUATION_PAPER: 'Papier',
		EVALUATION_ELECTRONIC: 'Électronique',
		EVALUATION_ASSESSMENT_TYPE: 'Mode de travail: ',
		EVALUATION_INDIVIDUAL: 'Individuel',
		EVALUATION_TEAM: 'En équipe',
		EVALUATION_DATE: 'Date de l\'évaluation: ',
		EVALUATION_TYPE: 'Type d\'évaluation: ',
		EXAM_TITLE: 'Titre de l\'examen',
		EXAM_WEIGHT: 'Pondération',
		EXAM_LOCATION: 'Lieu: ',
		EXAM_INCLASS: 'En classe ',
		EXAM_ATHOME: 'À la maison',
		EXAM_TERMS: 'Modalité: ',
		EXAM_ORAL: 'Oral',
		EXAM_WRITTEN: 'Écrit',
		EXAM_SUBMISSION_TYPE: 'Mode de remise: ',
		EXAM_PAPER: 'Papier',
		EXAM_ELECTRONIC: 'Électronique',
		EXAM_ASSESSMENT_TYPE: 'Mode de travail: ',
		EXAM_INDIVIDUAL: 'Individuel',
		EXAM_TEAM: 'En équipe',
		EXAM_DATE: 'Date de l\'évaluation: ',
		EXAM_TYPE: 'Type d\'évaluation: ',
		CONTACT_OFFICEROOM: 'Bureau',
		CONTACT_AVAILABILITY: 'Disponibilité',
		REF_BIBLIO_ISSN: 'ISSN:',
		REF_BIBLIO_ISBN: 'ISBN:',
		ERROR: 'Erreur',
		ERROR_FORMAT_DATE_START: 'Le format de la date d\'affichage est incorrect',
		ERROR_FORMAT_DATE_END: 'Le format de la date de retrait est incorrect',
		ERROR_CONTENT_MANDATORY: 'Le champ contenu est obligatoire',
		ERROR_START_DATE_GREATER: 'La date de retrait doit être ultérieure à la date d\'affichage',
		ERROR_URL_MANDATORY: 'Le champ URL est obligatoire',
		ERROR_TITLE_MANDATORY: 'Le champ libellé est obligatoire',
		ERROR_TITLE_TOO_LONG: 'Le champ libellé est trop long',
		ALERT_ERROR: 'Une erreur s\'est produite. Veuillez réessayer ultérieurement.',
		ALERT_SUCCESS: 'L\' opération a réussi.',
		ALERT_SUCCESS_ADD_ELEMENT: 'L\' élément a été ajouté.',
		ALERT_SUCCESS_DELETE_ELEMENT: 'L\'élément a été supprimé.',
		ALERT_SUCCESS_SAVE_SYLLABUS: 'Le plan de cours a été sauvegardé.',
		ALERT_RUBRIC_EXISTS: 'La rubrique est déjà présente',
		ALERT_SUCCESS_ADD_SYLLABUS: 'Le plan de cours a bien été ajouté.',
		ALERT_SUCCESS_DELETE_SYLLABUS: 'La suppression a réussi',
		ALERT_CANNOT_CREATE_ANNOUNCEMENT: 'Impossible de créer une annonce',
		ALERT_CANNOT_LOAD_BASE_DATA: 'Impossible de charger les données de base',
		ALERT_CANNOT_SAVE_SYLLABUS: 'Impossible d\'enregistrer le plan de cours',
		ALERT_CANNOT_DELETE_SYLLABUS_LIST: 'Impossible de supprimer la liste de plan de cours',
		ALERT_CANNOT_PUBLISH_SYLLABUS: 'Impossible de publier le plan de cours',
		ALERT_NO_SYLLABUS: 'Aucun plan de cours disponible',
		ALERT_IMPORT_SERVICE_UNDEFINED: 'Aucun service d\'import n\'as été défini',
		ALERT_NO_LOCK: 'Vous ne pouvez modifier ce plan de cours',
		ALERT_LOCKED_BY: 'Le plan de cours est présentement en édition par %1',
		ALERT_IMPORT_SYLLABUS_PERMISSION_ERROR: 'Vous n\'avez pas la permission d\'importer le plan de cours spécifié',
		ALERT_IMPORT_SYLLABUS_NOT_FOUND: 'Le plan de cours spécifié n\'existe pas',
		ALERT_IMPORT_SYLLABUS_ERROR: 'Une erreur s\'est produite lors de l\'import du plan de cours',
		CALENDAR_TODAY: 'Aujourd\'hui',
		CALENDAR_NOW: 'Maintenant',
		CALENDAR_DATE: 'Date',
		CALENDAR_TIME: 'Heure',
		CALENDAR_CLEAR: 'Effacer',
		CALENDAR_CLOSE: 'Fermer',
		ERROR_SYLLABUS: 'Le chargement du plan de cours a échoué. Veuillez essayer ultérieurement ou contacter le support.',
		ERROR_TEMPLATE: 'Le chargement du plan de cours a partiellement échoué. Celui-ci est disponible en lecture seulement. Veuillez essayer ultérieurement ou contacter le support.',
		BUTTON_SAVE: 'Enregistrer',
		BUTTON_CANCEL: 'Annuler',
		SAVE_WORKING: 'Opération en cours...',
		DOCUMENT_TYPE_DEFAULT: '...',
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
		REFERENCE_TYPE_DEFAULT: '...',
		REFERENCE_TYPE_BOOK: 'Livre',
		REFERENCE_TYPE_BOOK_CHAPTER: 'Chapitre de livre',
		REFERENCE_TYPE_CASE: 'Cas',
		REFERENCE_TYPE_ARTICLE: 'Article',
		REFERENCE_TYPE_ARTICLE_NEWS: 'Article d\'actualité',
		REFERENCE_TYPE_SLIDES: 'Diapositives / Présentation',
		REFERENCE_TYPE_EXERCISE: 'Exercice / Problème',
		REFERENCE_TYPE_SOLUTION: 'Solution',
		REFERENCE_TYPE_REPORT: 'Rapport',
		REFERENCE_TYPE_DATA: 'Données',
		REFERENCE_TYPE_PEDAGOGIC: 'Document de nature pédagogique',
		REFERENCE_TYPE_POLL: 'Enquête / Sondage',
		REFERENCE_TYPE_OLD_EXAM: 'Ancien examen',
		REFERENCE_TYPE_WEBSITE: 'Site web',
		REFERENCE_TYPE_AUDIO: 'Audio',
		REFERENCE_TYPE_VIDEO: 'Vidéo',
		REFERENCE_TYPE_SIMULATION: 'Simulation / Jeu',
		REFERENCE_TYPE_SOFTWARE: 'Logiciel / Programme',
		REFERENCE_TYPE_OTHER: 'Autre',
		REFERENCE_LIBRARY_LINK: 'Disponible à la bibliothèque',
		REFERENCE_OTHER_LINK: 'Autre lien',
		MOBILE_MENU_BACK: 'Retour',
		BUTTON_MANAGEMENT: 'Liste des plans de cours',
		STATUS_INITIAL: 'Initial',
		STATUS_DRAFT: 'Brouillon',
		STATUS_PUBLISHED: 'Publié',
		STATUS_NOT_ATTRIBUTED: 'Non attribué',
		BUTTON_CREATE_SYLLABUS: 'Créer un plan de cours personnalisé',
		LINK_SYLLABUS: 'Accéder',
		BUTTON_DELETE_SYLLABUS: 'Supprimer',
		MODAL_TITLE_NEW_SYLLABUS: 'Ajout plan de cours',
		MODAL_DESCRIPTION_NEW_SYLLABUS: 'Ajouter un nouveau plan de cours personnalisé ?',
		MODAL_SECTIONS_NEW_SYLLABUS: 'Sélectionner les sections pour ce plan de cours',
		MODAL_NEW_SYLLABUS: 'Libellé',
		MODAL_TITLE_DELETE_SYLLABUS: 'Alerte',
		MODAL_DESCRIPTION_DELETE_SYLLABUS: 'Supprimer le plan de cours ',
		MODAL_SECTIONS_DELETE_SYLLABUS: 'Les sections suivantes sont assignées à ce plan de cours. Vous devez d\'abord les retirer du plan de cours.',
		TABLE_NAME: 'Plan de cours',
		TABLE_AUTHOR: 'Auteur',
		TABLE_SECTIONS: 'Sections',
		TABLE_STATUS: 'Statut',
		TABLE_LAST_PUBLISHED_DATE: 'Dernière publication',
		TABLE_LAST_MODIFICATION_DATE: 'Dernière modification',
		DELETE_SYLLABUS_OK: 'Les plans de cours suivants vont être supprimés',
		DELETE_SYLLABUS_KO: 'Les plans de cours suivants ne peuvent pas être supprimés, car il y a des sections associées',
		MANAGEMENT_NO_SECTION: 'Aucune section',
		MANAGEMENT_ERREUR_NAME: 'Le nom doit être indiqué',
		FORUM: 'Forum',
		ASSIGNMENT: 'Remise de travaux',
		SAM_PUB: 'Tests et Quiz',
		HOME_ERROR_LOADING: 'Erreur durant le chargement.',
		CREATE_SYLLABUS_DEFAULT_NAME: 'Plan de cours personnalisé',
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
		PUBLISH_MODIFIED_SECTIONS_LABEL: 'Voulez-vous publier les modifications pour le plan de cours associé au(x) section(s):',
		PUBLISH_MODIFIED_PAGES_LABEL: 'Liste des pages modifiées:',
		PUBLISH_CANCEL_BUTTON_LABEL: 'Annuler',
		NOTATTRIBUTED_SYLLABUS: 'Non attribué',
		PUBLISH_CHECK_COMMON: 'Le plan de cours commun doit être publié avant de publier ce plan de cours.',
		PUBLISH_STATE_TITLE: 'Confirmation',
		PUBLISH_SUCCESS: 'La publication du plan de cours a réussi',
		PUBLISH_FAILURE: 'La publication du plan de cours a échoué',
		PUBLISH_ANNOUNCEMENT: 'Publier une annonce',
		PUBLISH_ANNOUNCEMENT_INFO: 'Un message s\'ajoutera aux Annonces du site. Vous pouvez personnaliser ce message à l\'aide du champ ci-dessous.',
		PUBLISH_ANNOUNCEMENT_TITLE: 'Titre de l\'annonce',
		PUBLISH_ANNOUNCEMENT_MESSAGE: 'Texte de l\'annonce',
		ANNOUNCEMENT_TITLE: 'Une nouvelle version du plan de cours est disponible',
		ANNOUNCEMENT_MESSAGE: 'Une nouvelle version du plan de cours a été publiée le',
		BUTTON_OK: 'Ok',
		ADD: 'Ajouter',
		ADD_DESCRIPTION: 'Ajouter une description',
		NO_VALID_SYLLABUS_TO_DELETE: 'Un ou des plans de cours sélectionnés sont associés à des sections. Veuillez les dissocier afin de pouvoir les supprimer.',
		SOME_INVALID_SYLLABUS_TO_DELETE: 'Un ou des plans de cours sélectionnés sont associés à des sections. Veuillez les dissocier afin de pouvoir les supprimer.',
		SAKAI_TOOL: 'Outil Sakai',
		ACTIVATE_LIBRARY_LINK: 'Activer le lien vers la bibliothèque',
		ACTIVATE_COOP_LINK: 'Activer le lien vers la Coop',
		ACTIVATE_OTHER_LINK: 'Activer un autre lien',
		SYLLABUS_NOT_AVAILABLE: 'Le plan de cours n\'est pas disponible',
		MENU: 'Menu',
		NOT_PUBLISHED: 'Non publié',
		WARNING: 'Avertissement',
		WARNING_UNSASSIGN_SECTIONS: 'Voulez-vous vraiment dissocier les sections du plan de cours? La (les) section(s) seront automatiquement associée(s) au plan de cours commun.',
		BUTTON_IMPORT_SYLLABUS: 'Importer un plan de cours',
		MODAL_DESCRIPTION_IMPORT_SYLLABUS: 'Importer un plan de cours',
		FORM_IMPORT_INSTRUCTIONS: 'Cette fonction sert à importer les plans de cours de l\'ancien outil de plan de cours (antérieur à l\'automne 2017). Entrez le sigle du cours que vous voulez importer. Les ressources contenues dans le plan de cours seront importées automatiquement.',
		FORM_IMPORT_WARNING: 'Attention :  l\'opération d\'import remplacera tous les plans de cours du site.',
		FORM_IMPORT_SITEID: 'Identifiant du site d\'origine',
		FORM_IMPORT_SITEID_PLACEHOLDER: '9-999-99.A2017(.A01)',
		FORM_IMPORT_CONFIRM: 'Êtes-vous certain de vouloir effectuer cet import? Les plans de cours exisants du site actuel seront supprimés et le plan de cours commun sera remplacé par le plan de cours importé.',
		ELEMENT_HIDDEN_BEFORE: 'Caché avant le ',
		ELEMENT_HIDDEN_BETWEEN: 'Caché avant le %1 et après le %2',
		FROM_COMMON: 'Provenant du commun',
		DATE_TIME_FORMAT: 'yyyy-MM-dd HH:mm',
		HIDDEN_BY_RESOURCE_FLAG: 'Caché par les propriétés de la ressource',
		MISSING_SAKAI_ENTITY_FLAG: 'Ce lien pointe vers un travail/quiz qui n\'existe pas',
		FORM_EMBED: 'Code d\'imbrication:',
		SOURCE: 'Source',
		SOURCE_URL: 'URL (Youtube, Vimeo, Dailymotion)',
		SOURCE_EMBED: 'Imbrication (Méliès)',
		COPY: 'Dupliquer',
		COPY_SYLLABUS: 'Dupliquer un plan de cours',
		TITLE: 'Titre',
		COPY_DEFAULT_NAME_PREFIX: 'Copie de',
		WARNING_UNSAVED: 'Vos modifications n\'ont pas été enregistré, voulez-vous quitter et perdre ces changements?'
	});

	$translateProvider.preferredLanguage('fr_CA');
	$translateProvider.registerAvailableLanguageKeys(['en_US', 'fr_CA']);
}]);
