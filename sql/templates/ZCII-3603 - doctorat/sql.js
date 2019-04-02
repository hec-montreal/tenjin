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

var Sql = function() {
	this.creationBuffer = '';
};

Sql.prototype = {
	addLine: function(line) {
		this.creationBuffer += line + ';\n';
	},

	addComment: function(comment) {
		var nl = this.creationBuffer.length > 0 ? '\n' : '';

		this.creationBuffer += nl + '-- ' + comment + '\n';
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
	}
};

module.exports = {
	Sql: Sql
};
