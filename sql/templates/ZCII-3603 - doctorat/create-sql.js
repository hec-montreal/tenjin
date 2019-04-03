var TemplateGenerator = require('./template-generator');

var elementTypes = TemplateGenerator.elementTypes;
var elements = TemplateGenerator.elements;
var tg = new TemplateGenerator.TemplateGenerator();

// Helper functions
var standardElements = {
	text: {
		element: elements.text,
		mandatory: false,
		displayInMenu: false,
	},

	document: {
		element: elements.document,
		mandatory: false,
		displayInMenu: false,
	},

	image: {
		element: elements.image,
		mandatory: false,
		displayInMenu: false,
	},

	video: {
		element: elements.video,
		mandatory: false,
		displayInMenu: false,
	},

	link: {
		element: elements.link,
		mandatory: false,
		displayInMenu: false,
	},

	tool: {
		element: elements.tool,
		mandatory: false,
		displayInMenu: false
	},

	citation: {
		element: elements.citation,
		mandatory: false,
		displayInMenu: false
	}
};

function populateWithStandardElements(structureId, elements) {
	for (var i = 0; i < elements.length; i++) {
		var sEl = standardElements[elements[i]];

		tg.createElementStructure(sEl.element, i, {
			mandatory: sEl.mandatory,
			displayInMenu: sEl.displayInMenu,
			parentId: structureId
		});
	}
}

// Template
tg.addComment('Template');

var templateId = tg.createTemplate('Plan de cours simplifié (doctorat)', 'Plan de cours simplifié (doctorat)');

// Structure
tg.addComment('Présentation du cours');

var presentationElementId = tg.createElement(elementTypes.composite, {
	fr: 'Introduction et présentation du site',
	en: 'Introduction and presentation of the site',
	es: 'Introducción y presentación del sitio'
});

var presentationStructureId = tg.createElementStructure(presentationElementId, 0, {
	mandatory: true,
	displayInMenu: true,
	templateId: templateId
});

tg.addComment('Présentation du cours -> Description');

var descriptionStructureId = tg.createElementStructure(elements.description, 0, {
	mandatory: true,
	displayInMenu: false,
	parentId: presentationStructureId
});

populateWithStandardElements(descriptionStructureId, ['text', 'document', 'link', 'image', 'video']);

tg.addComment('Présentation du cours -> Objectifs');

var objectivesStructureId = tg.createElementStructure(elements.objectives, 1, {
	mandatory: false,
	displayInMenu: false,
	parentId: presentationStructureId
});

populateWithStandardElements(objectivesStructureId, ['text', 'document', 'link', 'image', 'video']);

tg.addComment('Présentation du cours -> approche');

var approcheStructureId = tg.createElementStructure(elements.approche, 2, {
	mandatory: false,
	displayInMenu: false,
	parentId: presentationStructureId
});

populateWithStandardElements(approcheStructureId, ['text', 'document', 'link', 'image', 'video']);

tg.addComment('Coordinates');

var coordinatesElementId = tg.createElement(elementTypes.composite, {
	fr: 'Coordonnées des personnes ressources',
	en: 'Contact information',
	es: 'Información de contacto'
});

var coordinatesStructureId = tg.createElementStructure(coordinatesElementId, 1, {
	mandatory: true,
	displayInMenu: true,
	templateId: templateId
});

tg.addComment('Coordinates -> coordinator');

var coordinatorStructureId = tg.createElementStructure(elements.coordinator, 0, {
	mandatory: false,
	displayInMenu: false,
	parentId: coordinatesStructureId
});

tg.createElementStructure(elements.contact, 0, {
	mandatory: false,
	displayInMenu: false,
	parentId: coordinatorStructureId
});

tg.addComment('Coordinates -> teacher');

var teacherStructureId = tg.createElementStructure(elements.teacher, 1, {
	mandatory: false,
	displayInMenu: false,
	parentId: coordinatesStructureId
});

tg.createElementStructure(elements.contact, 0, {
	mandatory: false,
	displayInMenu: false,
	parentId: teacherStructureId
});

tg.addComment('Coordinates -> assistant');

var assistantStructureId = tg.createElementStructure(elements.teacherAssistant, 2, {
	mandatory: false,
	displayInMenu: false,
	parentId: coordinatesStructureId
});

tg.createElementStructure(elements.contact, 0, {
	mandatory: false,
	displayInMenu: false,
	parentId: assistantStructureId
});

tg.addComment('Coordinates -> speaker');

var speakerStructureId = tg.createElementStructure(elements.speaker, 3, {
	mandatory: false,
	displayInMenu: false,
	parentId: coordinatesStructureId
});

tg.createElementStructure(elements.contact, 0, {
	mandatory: false,
	displayInMenu: false,
	parentId: speakerStructureId
});

tg.addComment('Coordinates -> secretary');

var secretaryStructureId = tg.createElementStructure(elements.secretary, 4, {
	mandatory: false,
	displayInMenu: false,
	parentId: coordinatesStructureId
});

tg.createElementStructure(elements.contact, 0, {
	mandatory: false,
	displayInMenu: false,
	parentId: secretaryStructureId
});

tg.addComment('Organisation du cours');

var organisationElementId = tg.createElement(elementTypes.composite, {
	fr: 'Contenu et informations pertinentes',
	en: 'Content and relevant information',
	es: 'Contenido e información relevante'
});

var organisationStructureId = tg.createElementStructure(organisationElementId, 2, {
	mandatory: true,
	displayInMenu: true,
	templateId: templateId
});

tg.addComment('Oganisation du cours -> regroupement');

var regroupementStructureId = tg.createElementStructure(elements.regroupement, 0, {
	mandatory: false,
	displayInMenu: true,
	parentId: organisationStructureId
});

tg.addComment('Oganisation du cours -> regroupement -> séance');

var seanceStructureId = tg.createElementStructure(elements.seance, 0, {
	mandatory: false,
	displayInMenu: true,
	parentId: regroupementStructureId
});

tg.addComment('Oganisation du cours -> regroupement -> séance -> description');

descriptionStructureId = tg.createElementStructure(elements.description, 0, {
	mandatory: false,
	displayInMenu: false,
	parentId: seanceStructureId
});

populateWithStandardElements(descriptionStructureId, ['text', 'document', 'image', 'video', 'link', 'tool', 'citation']);

tg.addComment('Oganisation du cours -> regroupement -> séance -> objectives');

objectivesStructureId = tg.createElementStructure(elements.objectives, 1, {
	mandatory: false,
	displayInMenu: false,
	parentId: seanceStructureId
});

populateWithStandardElements(objectivesStructureId, ['text', 'document', 'image', 'video', 'link', 'tool', 'citation']);

tg.addComment('Oganisation du cours -> regroupement -> séance -> avant la séance');

beforeSeanceStructureId = tg.createElementStructure(elements.beforeSeance, 2, {
	mandatory: false,
	displayInMenu: false,
	parentId: seanceStructureId
});

populateWithStandardElements(beforeSeanceStructureId, ['text', 'document', 'image', 'video', 'link', 'tool', 'citation']);

tg.addComment('Oganisation du cours -> regroupement -> séance -> durant la séance');

duringSeanceStructureId = tg.createElementStructure(elements.duringSeance, 3, {
	mandatory: false,
	displayInMenu: false,
	parentId: seanceStructureId
});

populateWithStandardElements(duringSeanceStructureId, ['text', 'document', 'image', 'video', 'link', 'tool', 'citation']);

tg.addComment('Oganisation du cours -> regroupement -> séance -> après la séance');

afterSeanceStructureId = tg.createElementStructure(elements.afterSeance, 4, {
	mandatory: false,
	displayInMenu: false,
	parentId: seanceStructureId
});

populateWithStandardElements(afterSeanceStructureId, ['text', 'document', 'image', 'video', 'link', 'tool', 'citation']);

tg.save('script.sql');
