var fs = require('fs');

/* Return the value of the path in an object */
function path(p, obj) {
	p = p.replace(/\$/g, '');

	var ret = obj;
	var pa = p.split('.');

	pa.forEach((pai) => {
		ret = ret[pai];
	});

	return ret;
}

/* Return the variable names in a template string */
function getVariables(str) {
	var isVarChar = (c) => {
		return /\d/.test(c) || /[a-zA-Z]/.test(c) || c === '.';
	};

	var ret = [];
	var nextVar = '';
	var fInVar = false;

	for (var i = 0; i < str.length; i++) {
		if (str[i] === '$') {
			fInVar = true;
		} else if (fInVar && !isVarChar(str[i])) {
			ret.push(nextVar);

			nextVar = '';
			fInVar = false;
		}

		if (fInVar) {
			nextVar += str[i];
		}
	}

	if (fInVar) {
		ret.push(nextVar);
	}

	return ret;
}

/* Quote a string value */
function quote(val) {
	return '\'' + val + '\'';
}

/* Render a value to string */
function renderValue(val, noQuotes) {
	var ret = '';

	if (val === null) {
		ret = 'NULL';
	} else if (typeof val === 'number') {
		ret = val;
	} else if (typeof val === 'string') {
		ret = noQuotes ? val : quote(val);
	} else if (Array.isArray(val)) {
		val.forEach((v) => {
			ret += renderValue(v, noQuotes) + ', '
		});

		ret = ret.substring(0, ret.length - 2);
	}

	return ret;
}

/* Apply a template on a string */
function template(str, model) {
	var variables = getVariables(str);

	if (variables.length === 0) {
		return str;
	}

	variables.forEach((variable) => {
		var value = renderValue(path(variable, model), variable.indexOf('$$') === 0);

		str = str.replace(variable, value);
	});

	return str;
}

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

var elementTypes = {
	composite: 1,
	rubric: 13
};

var locales = {
	en: 'en_US',
	fr: 'fr_CA',
	es: 'es_ES'
};

var elements = {
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
	contact: 6,
	regroupement: 14,
	seance: 12,
	tutorial: 13,
	beforeSeance: 35,
	duringSeance: 36,
	afterSeance: 37
};

var TemplateGenerator = function() {
	this.creationBuffer = '';
};

TemplateGenerator.prototype = {
	addLine: function(line) {
		this.creationBuffer += line + ';\n';
	},

	addComment: function(comment) {
		var nl = this.creationBuffer.length > 0 ? '\n' : '';

		this.creationBuffer += nl + '-- ' + comment + '\n';
	},

	save: function(filename) {
		this.addComment('Generated ' + new Date());

		fs.writeFileSync(filename, this.creationBuffer);
	},

	insert: function(table, values) {
		var model = {
			'table': table,
			'values': values
		};

		var ret = null;

		for (var i = 0; i < values.length; i++) {
			if (values[i] === '#') {
				values[i] = table.nextId;

				ret = table.nextId;
			}
		}

		if (ret) {
			table.nextId++;
		}

		this.addLine(template('insert into $$table.name ($$table.columns) values ($values)', model));

		return ret;
	},

	createTemplate: function(name, description) {
		return this.insert(tables.template, ['#', name, description, 1]);
	},

	createElement: function(type, names) {
		var ret = this.insert(tables.templateElement, ['#', type]);

		this.insert(tables.templateElementI18n, [ret, names['fr'], locales.fr]);
		this.insert(tables.templateElementI18n, [ret, names['en'], locales.en]);
		this.insert(tables.templateElementI18n, [ret, names['es'], locales.es]);

		return ret;
	},

	createElementStructure: function(elementId, displayOrder, opts) {
		return this.insert(tables.templateStructure, ['#', opts.mandatory ? 1 : 0, opts.displayInMenu ? 1 : 0, opts.parentId ? opts.parentId : null, elementId, null, opts.templateId ? opts.templateId : null, displayOrder]);
	}
};

module.exports = {
	TemplateGenerator: TemplateGenerator,
	elementTypes: elementTypes,
	elements: elements
};
