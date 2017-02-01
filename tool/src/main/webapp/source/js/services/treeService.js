tenjinApp.service('TreeService', ['$timeout', function($timeout) {
	'use strict';

	// Keep track of the selected element for performance
	this.selectedElement = null;

	this.forEachElement = function(syllabus, fn, position) {
		if (!syllabus || !syllabus.elements) {
			return;
		}

		if (!position) {
			position = [];
		}

		for (var i = 0; i < syllabus.elements.length; i++) {
			var element = syllabus.elements[i];
			var currentPosition = position.concat([i]);

			// If fn returns true, we break (gives a way for fn to break the loop)
			if (fn(element, currentPosition) === true) {
				break;
			}

			this.forEachElement(element, fn, position);
		}
	};

	/**
	 * Unselect all Tree elements
	 */
	this.unselectAllElements = function(syllabus) {
		this.forEachElement(syllabus, function(element) {
			element.$selected = false;
		});

		this.selectedElement = null;
	};

	/**
	 * Select a Tree element
	 */
	this.selectElement = function(element) {
		this.unselectAllElements();
		this.selectedElement = element;

		element.$selected = true;
	};

	this.selectElementById = function(id, syllabus) {
		var tthis = this;

		this.forEachElement(syllabus, function(element) {
			if (element.id === id) {
				tthis.selectElement(element);

				// Break
				return true;
			}
		});
	};

	this.selectElementByPosition = function(position, syllabus) {
		this.unselectAllElements();

		var elementCursor = syllabus;

		// For each position depth
		for (var c = 0; c < position.length; c++) {
			if (elementCursor.elements) {
				elementCursor = elementCursor.elements[position[c]];
			}
		}

		this.selectElement(elementCursor);
	};

	this.findSelectedElement = function(syllabus) {
		var ret = null;

		this.forEachElement(syllabus, function(element) {
			if (element.$selected) {
				ret = element;

				// Break
				return true;
			}
		});

		return ret;
	};

	this.findSelectedElementPosition = function(syllabus) {

	};
}]);
