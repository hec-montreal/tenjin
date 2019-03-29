tenjinApp.service('TreeService', ['SyllabusService', 'TenjinService', '$timeout', '$state', function(SyllabusService, TenjinService, $timeout, $state) {
	'use strict';

	// Keep track of the selected element
	this.selectedElement = null;
	this.lastSelectedPosition = null;

	/**
	 * Unselect all Tree elements
	 */
	this.unselectAllElements = function() {
		SyllabusService.forEachElement(SyllabusService.getSyllabus(), function(element) {
			element.$selected = false;
		});

		this.selectedElement = null;
	};

	/**
	 * Select a Tree element
	 */
	this.selectElement = function(element) {
		if (!element) {
			this.selectFirstElement();

			return;
		}

		this.unselectAllElements();

		element.$selected = true;

		this.selectedElement = element;
		this.lastSelectedPosition = this.findSelectedElementPosition();
		
		if (SyllabusService.getTemplate()[element.templateStructureId].createEvent === true){
			SyllabusService.createReadEvent(SyllabusService.syllabus.id, element.id);
		}
		
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

	this.selectFirstElement = function () {
		this.selectElement(this.findElementByPosition([0]));
	};

	this.selectElementById = function(id) {
		var foundElement = null;

		SyllabusService.forEachElement(SyllabusService.getSyllabus(), function(element) {
			if (element.id === id) {
				foundElement = element;

				// Break
				return true;
			}
		});

		if (foundElement) {
			this.selectElement(foundElement);
		} else {
			this.selectFirstElement();
		}
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

		SyllabusService.forEachElement(SyllabusService.getSyllabus(), function(element) {
			if (element.$selected) {
				ret = element;

				// Break
				return true;
			}
		});

		return ret;
	};

	this.findElementPosition = function(el) {
		var ret = null;

		SyllabusService.forEachElement(SyllabusService.getSyllabus(), function(element, position) {
			if (el.id === element.id) {
				ret = position;

				// Break
				return true;
			}
		});

		return ret;
	};

	this.findSelectedElementPosition = function() {
		var ret = null;

		SyllabusService.forEachElement(SyllabusService.getSyllabus(), function(element, position) {
			if (element.$selected) {
				ret = position;

				// Break
				return true;
			}
		});

		return ret;
	};

	this.isElementSelectable = function(el) {
		return SyllabusService.template[el.templateStructureId].displayInMenu;
	};

	this.findElementParent = function(el) {
		var ret = SyllabusService.getParent(el);

		if (!ret) {
			return SyllabusService.getSyllabus();
		}

		return ret;
	};

	this.findPeviousSibling = function(el) {
		var pos = this.findElementPosition(el);
		var tail = pos[pos.length - 1];

		if (tail === 0) {
			return null;
		}

		pos[pos.length - 1] = tail - 1;

		return this.findElementByPosition(pos);
	};

	this.findNextSibling = function(el) {
		var pos = this.findElementPosition(el);
		var tail = pos[pos.length - 1];
		var parent = this.findElementParent(el);

		if (tail >= parent.elements.length) {
			return null;
		}

		pos[pos.length - 1] = tail + 1;

		return this.findElementByPosition(pos);
	};	
}]);
