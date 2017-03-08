tenjinApp.service('TreeService', ['SyllabusService', 'TenjinService', '$timeout', '$state', function(SyllabusService, TenjinService, $timeout, $state) {
	'use strict';

	// Keep track of the selected element
	this.selectedElement = null;
	this.lastSelectedPosition = null;

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

			this.forEachElement(element, fn, currentPosition);
		}
	};

	/**
	 * Unselect all Tree elements
	 */
	this.unselectAllElements = function() {
		this.forEachElement(SyllabusService.getSyllabus(), function(element) {
			element.$selected = false;
		});

		this.selectedElement = null;
	};

	/**
	 * Select a Tree element
	 */
	this.selectElement = function(element) {
		this.unselectAllElements();

		element.$selected = true;

		this.selectedElement = element;
		this.lastSelectedPosition = this.findSelectedElementPosition();

		$state.transitionTo(TenjinService.viewState.stateName, {
			id: SyllabusService.getSyllabus().id,
			elementId: this.selectedElement.id
		}, {
			location: true,
			inherit: true,
			relative: $state.$current,
			notify: false
		});
	};

	this.selectElementById = function(id) {
		var tthis = this;

		this.forEachElement(SyllabusService.getSyllabus(), function(element) {
			if (element.id === id) {
				tthis.selectElement(element);

				// Break
				return true;
			}
		});
	};

	this.findElementByPosition = function(position) {
		var elementCursor = SyllabusService.getSyllabus();

		// For each position depth
		for (var c = 0; c < position.length; c++) {
			if (elementCursor.elements) {
				elementCursor = elementCursor.elements[position[c]];
			}
		}

		return elementCursor;
	};

	this.findSelectedElement = function() {
		var ret = null;

		this.forEachElement(SyllabusService.getSyllabus(), function(element) {
			if (element.$selected) {
				ret = element;

				// Break
				return true;
			}
		});

		return ret;
	};

	this.findSelectedElementPosition = function() {
		var ret = null;

		this.forEachElement(SyllabusService.getSyllabus(), function(element, position) {
			if (element.$selected) {
				ret = position;

				// Break
				return true;
			}
		});

		return ret;
	};
}]);
