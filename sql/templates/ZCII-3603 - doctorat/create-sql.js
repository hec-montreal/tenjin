var Sql = require('./sql').Sql;
var fs = require('fs');

var types = {
	composite: 1,
	rubric: 13
};

var locales = {
	en: 'en_US',
	fr: 'fr_CA',
	es: 'es_ES'
};

var templateElements = {
	text: 2,
	document: 3,
	image: 16,
	video: 17,
	link: 4,
	tool: 15,
	citation: 8,
	description: 18,
	objectives: 19,
	approche: 20,
	coordinator: 21,
	teacher: 22,
	teacherAssistant: 23,
	speaker: 24,
	secretary: 25,
	contact: 6
};

var tables = {
	template: {
		name: 'TENJIN_TEMPLATE',
		columns: ['TEMPLATE_ID', 'TITLE', 'DESCRIPTION', 'ACTIVE'],
		nextId: 3
	},

	templateElement: {
		name: 'TENJIN_TEMPLATEELEMENT',
		columns: ['TEMPLATEELEMENT_ID', 'TEMPLATEELEMENTTYPE_ID'],
		nextId: 48
	},

	templateElementI18n: {
		name: 'TENJIN_TEMPLATEELEMENT_I18N',
		columns: ['TEMPLATEELEMENT_ID', 'LABEL', 'LOCALE']
	},

	templateStructure: {
		name: 'TENJIN_TEMPLATESTRUCTURE',
		columns: ['TEMPLATESTRUCTURE_ID', 'MANDATORY', 'DISPLAY_IN_MENU', 'PARENT_ID', 'TEMPLATEELEMENT_ID', 'PROVIDER_ID', 'TEMPLATE_ID', 'DISPLAY_ORDER'],
		nextId: 1394
	}
};

var sql = new Sql();

// Delete
sql.addComment('Delete')
sql.addLine('delete from ' + tables.templateStructure.name + ' where TEMPLATESTRUCTURE_ID >= ' + tables.templateStructure.nextId);
sql.addLine('delete from ' + tables.templateElementI18n.name + ' where TEMPLATEELEMENT_ID >= ' + tables.templateElement.nextId);
sql.addLine('delete from ' + tables.templateElement.name + ' where TEMPLATEELEMENT_ID >= ' + tables.templateElement.nextId);
sql.addLine('delete from ' + tables.template.name + ' where TEMPLATE_ID = ' + tables.template.nextId);

// Template
sql.addComment('Template');

var templateId = sql.insert(tables.template, ['#', 'Plan de cours simplifié (doctorat)', 'Plan de cours simplifié (doctorat)', 1]);

// Elements
// Présentation du cours
sql.addComment('Présentation du cours');

var presentationElementId = sql.insert(tables.templateElement, ['#', types.composite]);

sql.insert(tables.templateElementI18n, [presentationElementId, 'Introduction et présentation du site', locales.fr]);
sql.insert(tables.templateElementI18n, [presentationElementId, 'Introduction and presentation of the site', locales.en]);
sql.insert(tables.templateElementI18n, [presentationElementId, 'Introducción y presentación del sitio', locales.es]);

var presentationStructureId = sql.insert(tables.templateStructure, ['#', 1, 1, null, presentationElementId, null, templateId, 0]);

sql.addComment('Présentation du cours -> Description');

var descriptionStructureId = sql.insert(tables.templateStructure, ['#', 1, 0, presentationStructureId, templateElements.description, null, null, 0]);

sql.insert(tables.templateStructure, ['#', 0, 0, descriptionStructureId, templateElements.text, null, null, 0]);
sql.insert(tables.templateStructure, ['#', 0, 0, descriptionStructureId, templateElements.document, null, null, 1]);
sql.insert(tables.templateStructure, ['#', 0, 0, descriptionStructureId, templateElements.image, null, null, 2]);
sql.insert(tables.templateStructure, ['#', 0, 0, descriptionStructureId, templateElements.video, null, null, 3]);
sql.insert(tables.templateStructure, ['#', 0, 0, descriptionStructureId, templateElements.link, null, null, 4]);

sql.addComment('Présentation du cours -> Objectifs');

var objectivesStructureId = sql.insert(tables.templateStructure, ['#', 0, 0, presentationStructureId, templateElements.objectives, null, null, 1]);

sql.insert(tables.templateStructure, ['#', 0, 0, objectivesStructureId, templateElements.text, null, null, 0]);
sql.insert(tables.templateStructure, ['#', 0, 0, objectivesStructureId, templateElements.document, null, null, 1]);
sql.insert(tables.templateStructure, ['#', 0, 0, objectivesStructureId, templateElements.image, null, null, 2]);
sql.insert(tables.templateStructure, ['#', 0, 0, objectivesStructureId, templateElements.video, null, null, 3]);
sql.insert(tables.templateStructure, ['#', 0, 0, objectivesStructureId, templateElements.link, null, null, 4]);

sql.addComment('Présentation du cours -> approche');

var approcheStructureId = sql.insert(tables.templateStructure, ['#', 0, 0, presentationStructureId, templateElements.approche, null, null, 2])

sql.insert(tables.templateStructure, ['#', 0, 0, approcheStructureId, templateElements.text, null, null, 0]);
sql.insert(tables.templateStructure, ['#', 0, 0, approcheStructureId, templateElements.document, null, null, 1]);
sql.insert(tables.templateStructure, ['#', 0, 0, approcheStructureId, templateElements.image, null, null, 2]);
sql.insert(tables.templateStructure, ['#', 0, 0, approcheStructureId, templateElements.video, null, null, 3]);
sql.insert(tables.templateStructure, ['#', 0, 0, approcheStructureId, templateElements.link, null, null, 4]);

sql.addComment('Coordinates');

var coordinatesElementId = sql.insert(tables.templateElement, ['#', types.composite]);

sql.insert(tables.templateElementI18n, [coordinatesElementId, 'Coordonnées des personnes ressources', locales.fr]);
sql.insert(tables.templateElementI18n, [coordinatesElementId, 'Contact information', locales.en]);
sql.insert(tables.templateElementI18n, [coordinatesElementId, 'Información de contacto', locales.es]);

var coordinatesStructureId = sql.insert(tables.templateStructure, ['#', 1, 1, null, coordinatesElementId, null, templateId, 1]);

sql.addComment('Coordinates -> coordinator');

var coordinatorStructureId = sql.insert(tables.templateStructure, ['#', 0, 0, coordinatesStructureId, templateElements.coordinator, null, null, 0]);

sql.insert(tables.templateStructure, ['#', 0, 0, coordinatorStructureId, templateElements.contact, null, null, 0]);

sql.addComment('Coordinates -> teacher');

var teacherStructureId = sql.insert(tables.templateStructure, ['#', 0, 0, coordinatesStructureId, templateElements.teacher, null, null, 1]);

sql.insert(tables.templateStructure, ['#', 0, 0, teacherStructureId, templateElements.contact, null, null, 0]);

sql.addComment('Coordinates -> assistant');

var assistantStructureId = sql.insert(tables.templateStructure, ['#', 0, 0, coordinatesStructureId, templateElements.teacherAssistant, null, null, 2]);

sql.insert(tables.templateStructure, ['#', 0, 0, assistantStructureId, templateElements.contact, null, null, 0]);

sql.addComment('Coordinates -> speaker');

var speakerStructureId = sql.insert(tables.templateStructure, ['#', 0, 0, coordinatesStructureId, templateElements.speaker, null, null, 3]);

sql.insert(tables.templateStructure, ['#', 0, 0, speakerStructureId, templateElements.contact, null, null, 0]);

sql.addComment('Coordinates -> secretary');

var secretaryStructureId = sql.insert(tables.templateStructure, ['#', 0, 0, coordinatesStructureId, templateElements.secretary, null, null, 4]);

sql.insert(tables.templateStructure, ['#', 0, 0, secretaryStructureId, templateElements.contact, null, null, 0]);

sql.addComment('Generated ' + new Date());

fs.writeFileSync('script.sql', sql.creationBuffer);
