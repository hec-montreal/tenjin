tenjinApp.service('SyllabusService', ['AlertService', 'ResourcesService', 'SyllabusLockService', '$translate', '$q', '$http', '$rootScope', function(AlertService, ResourcesService, SyllabusLockService, $translate, $q, $http, $rootScope) {
	'use strict';

	this.syllabus = null;
	this.syllabusSaved = null;
	this.template = null;
	this.syllabusList = null;

	this.dirty = false;
	this.working = false;

	this.viewMode = "edit";

	// temporary id to use for new elements, decremented after every use
	var tempId = -1;

	// variable used to look through the syllabus tree
	this.navigation = {
		'level': 1
	};

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

	// Save a syllabus
	this.save = function(syllabus) {
		var tthis = this;
		var ret = $q.defer();
		var url = syllabus.id ? 'v1/syllabus/' + syllabus.id + '.json' : 'v1/syllabus.json';

		this.working = true;

		$http.post(url, syllabus).success(function(data) {
			tthis.updateCurrentSyllabus(data);

			$rootScope.$broadcast('syllabusService:save');

			ret.resolve(data);
		}).error(function(data) {
			ret.reject(data);
		}).finally(function() {
			tthis.working = false;
		});

		return ret.promise;
	};

	this.updateSections = function(syllabus) {
		var tthis = this;
		var ret = $q.defer();

		this.working = true;

		$http.post('v1/syllabus/sections.json', syllabus).success(function(data) {
			$rootScope.$broadcast('syllabusService:save');

			ret.resolve(data);
		}).error(function(data) {
			ret.reject(data);
		}).finally(function() {
			tthis.working = false;
		});

		return ret.promise;
	};

	this.create = function(siteId, name, sections) {
		var common = this.getCommonSyllabus();

		var newSyllabus = {
			'id': null,
			'siteId': siteId,
			'sections': sections,
			'title': name,
			'common': false,
			'templateId': (common ? common.templateId : null),
			'elements': null,
			'locale': 'fr_CA'
		};

		return this.save(newSyllabus);
	};

	this.copy = function(id, newTitle) {
		var tthis = this;
		var ret = $q.defer();

		$http.post('v1/syllabus/copy/' + id + '.json', {
			'title': newTitle
		}).then(function(data) {
			ret.resolve(data);
		});

		return ret.promise;
	};

	this.importSyllabusFromSite = function(siteId) {
		var tthis = this;
		var ret = $q.defer();
		var url = 'v1/import/' + siteId + '.json';

		$http.post(url, siteId).success(function(data) {
			ret.resolve(data);
		}).error(function(data, status) {
			ret.reject(status);
		});

		return ret.promise;
	}

	// Load a syllabus and set it as the current one
	this.loadSyllabus = function(id) {
		var tthis = this;
		var ret = $q.defer();

		this.working = true;

		$http.get('v1/syllabus/' + id + '.json').success(function(data) {
			tthis.setSyllabus(data);

			ret.resolve(tthis.getSyllabus());
		}).error(function(data) {
			ret.reject(data);
		}).finally(function() {
			tthis.working = false;
		});

		return ret.promise;
	};

	// Load the list of syllabus
	this.loadSyllabusList = function() {
		var tthis = this;
		var ret = $q.defer();

		this.working = true;

		$http.get('v1/syllabus.json').success(function(data) {
			tthis.setSyllabusList(data);

			ret.resolve(data);
		}).error(function(data) {
			ret.reject(data);
		}).finally(function() {
			tthis.working = false;
		})

		return ret.promise;
	};

	// Web service to load a published syllabus
	this.loadPublishedSyllabus = function(id) {
		var tthis = this;
		var ret = $q.defer();
		var getUrl = 'v1/syllabus/' + id + '.json?published=true';

		this.working = true;

		$http.get(getUrl).success(function(data) {
			tthis.setSyllabus(data);
			ret.resolve(tthis.getSyllabus());
		}).error(function(data) {
			ret.reject(data);
		}).finally(function() {
			tthis.working = false;
		});

		return ret.promise;
	};

	// Web service to load a public syllabus
	this.loadPublicSyllabus = function(id) {
		var tthis = this;
		var ret = $q.defer();
		var getUrl = 'v1/syllabus/' + id + '/public.json';

		this.working = true;

		$http.get(getUrl).success(function(data) {
			tthis.setSyllabus(data);
			ret.resolve(tthis.getSyllabus());
		}).error(function(data) {
			ret.reject(data);
		}).finally(function() {
			tthis.working = false;
		});

		return ret.promise;
	};

	/**
	 * Delete a list of syllabus
	 * @param {Array} $syllabusList Syllabus list to delete
	 * @return {Object} Promise
	 */
	this.deleteSyllabusList = function(syllabusListToDelete) {
		var idList = [];
		var newSyllabusList = [];

		for (var i = 0; i < syllabusListToDelete.length; i++) {
			idList.push(syllabusListToDelete[i].id);
		}

		for (var i = 0; i < this.syllabusList.length; i++) {
			var keep = true;

			for (var j = 0; j < idList.length; j++) {
				if (this.syllabusList[i].id === idList[j]) {
					keep = false;

					break;
				}
			}

			if (keep) {
				newSyllabusList.push(this.syllabusList[i]);
			}
		}

		this.syllabusList = newSyllabusList;

		var tthis = this;
		var ret = $q.defer();

		this.working = true;

		$http.get('v1/syllabus/' + idList.join(',') + '/delete.json').success(function(data) {
			ret.resolve(data);
		}).error(function(data) {
			ret.reject(data);
		}).finally(function() {
			tthis.working = false;
		});

		return ret.promise;
	};

	/**
	 * Save current syllabus
	 * @return {Object} Promise
	 */
	this.saveCurrent = function() {
		return this.save(this.syllabus);
	};

	/**
	 * Reload the syllabus from the backend
	 * @return {Object} Promise
	 */
	this.reloadSyllabus = function() {
		return this.loadSyllabus(this.syllabus.id);
	}

	/**
	 * Load the template rules
	 * @return {Object} Promise
	 */
	this.loadTemplate = function() {
		var tthis = this;
		var ret = $q.defer();

		// use the language of the common syllabus to get the locale of the rules
		var common = this.getCommonSyllabus();

		$http.get('v1/template/1/rules.json' + (common ? '?locale=' + common.locale : '')).success(function(data) {
			tthis.setTemplate(data);

			ret.resolve(tthis.getTemplate());
		}).error(function(data) {
			ret.reject(data);
		});

		return ret.promise;
	};

	/*
	 * Get the list of elements that can be added to a composite element (according to the template rules)
	 */
	this.getAddableElementsFromTemplateRules = function(element) {
		return this.template[element.templateStructureId].elements;
	};

	/**
	 * Get the syllabus list
	 * @return {Array} Syllabus list
	 */
	this.getSyllabusList = function() {
		return this.syllabusList;
	};

	/**
	 * Set the syllabus list
	 * @param {Array} $syllabusList Syllabus list
	 */
	this.setSyllabusList = function(syllabusList) {
		this.syllabusList = syllabusList;
	};

	/**
	 * Get the current syllabus
	 * @return {Object} Current syllabus viewed
	 */
	this.getSyllabus = function() {
		return this.syllabus;
	};

	/**
	 * Get the common syllabus from the syllabus list
	 * @return {Object} Common syllabus or undefined
	 */
	this.getCommonSyllabus = function() {
		if (this.syllabusList) {
			for (var i = 0; i < this.syllabusList.length; i++) {
				if (this.syllabusList[i].common === true) {
					return this.syllabusList[i];
				}
			}
		}
		return null;
	};

	// TODO : to delete 
	this.getSyllabusSaved = function() {
		return this.syllabusSaved;
	};



	/**
	 * Set the current syllabus
	 * @param {Object} $syllabus The future current syllabus
	 */
	this.setSyllabus = function(syllabus) {
		this.syllabus = syllabus;


		// numbering
		this.numberSyllabus(this.syllabus);
		// save a copy
		this.syllabusSaved = angular.copy(this.syllabus);
		// set dirty flag to false
		this.dirty = false;
	};

	/**
	 * Get the template rules
	 * @return {Object} The template rules
	 */
	this.getTemplate = function() {
		return this.template;
	};

	/**
	 * Set the template rules
	 * @param {Object} $template The template rules
	 */
	this.setTemplate = function($template) {
		this.template = $template;
	};

	/**
	 * Get a temporary id for a new element
	 * otherwise adding and modifying sub-elements (prior to a save) is problematic
	 */
	this.getTemporaryId = function() {
		return tempId--;
	};

	/**
	 * Set the dirty flag
	 * @param {Boolean} $dirty Dirty flag
	 */
	this.setDirty = function($dirty) {
		this.dirty = $dirty;
	};

	/**
	 * Get the value of the dirty flag
	 * @return {Boolean} Dirty flag value
	 */
	this.isDirty = function($dirty) {
		return this.dirty;
	};

	/**
	 * Get the value of the working flag
	 * @return {Boolean} Working flag value
	 */
	this.isWorking = function($working) {
		return this.working;
	};

	/**
	 * Return whether or not the provided object is a syllabus element 
	 * as opposed to the syllabus object itself (useful for recursive traversal
	 * of the syllabus)
	 * @param {Object} $object Element
	 * @return {Boolean} True if the element is a syllabus element
	 */
	var isSyllabusElement = function($object) {
		// a syllabus element does not have a templateId property
		return typeof($object.templateId) === 'undefined';
	};

	/**
	 * Return whether or not the provided object is a syllabus element 
	 * as opposed to the syllabus object itself (useful for recursive traversal
	 * of the syllabus)
	 * @param {Object} $object Element
	 * @return {Boolean} True if the element is a syllabus element
	 */
	this.isSyllabusElement = function($object) {
		return isSyllabusElement($object);
	};

	/**
	 * Add a new rubric to the syllabus
	 * @param {Object} $parent Parent of the element
	 * @param {Object} $element Element to be inserted
	 * @return {Number} If the rubric already exists then return -1, else return 1
	 */
	this.addRubricToSyllabusElement = function($parent, $element) {

		var rules = this.template[$parent.templateStructureId];

		if (!$parent.elements)
			$parent.elements = [];

		if ($parent.elements.length > 0) {

			// Check if the rubric already exists
			for (var i = 0; i < $parent.elements.length; i++) {
				if ($parent.elements[i].templateStructureId === $element.templateStructureId) {
					// Rubric already present
					return -1;
				}
			}

			// Check where the rubric must be inserted
			var listTemp = [];
			var index = -1;
			for (var i = 0; i < rules.elements.length; i++) {
				for (var j = 0; j < $parent.elements.length; j++) {
					if (rules.elements[i].id === $parent.elements[j].templateStructureId) {
						listTemp.push($parent.elements[j]);
						break;
					}
				}

				if (rules.elements[i].id === $element.templateStructureId) {
					listTemp.push($element);
				}
			}

			for (var i = 0; i < listTemp.length; i++) {
				if (listTemp[i].templateStructureId === $element.templateStructureId) {
					index = i;
					break;
				}
			}

			// Add the rubric to the syllabus
			if (index !== -1) {
				$parent.elements.splice(index, 0, $element);
				return 1;
			}
		} else {
			$parent.elements.push($element);
			return 1;
		}

		return 1;

	};

	/**
	 * Get the parent of an element
	 * @param {Object} $rootTree Syllabus root tree
	 * @param {Object} $element Element
	 * @return {Object} The parent element or undefined
	 */
	var getParent = function($rootTree, $element) {
		if ($rootTree.id === $element.parentId) {
			return $rootTree;
		} else {
			if ($rootTree.elements) {
				for (var i = 0; i < $rootTree.elements.length; i++) {
					var result = getParent($rootTree.elements[i], $element);
					if (result) {
						return result;
					}
				}
			}
		}
		return null;
	};

	/**
	 * Get the parent of an element
	 * @param {Object} $element Element
	 * @return {Object} The parent element or undefined
	 */
	this.getParent = function($element) {
		return getParent(this.syllabus, $element);
	};

	/**
	 * Numbering the syllabus element (lecture, tutorial and evaluation)
	 * @param {Object} $rootTree Syllabus root tree
	 * @param {Object} $numberingInfo Param inout with properties (nbLecture, nbTutorial, nbEvalAndExam)
	 */
	var numberSyllabus = function($rootTree, $numberingInfo) {
		if ($rootTree.elements) {
			for (var i = 0; i < $rootTree.elements.length; i++) {
				if ($rootTree.elements[i].type === 'lecture') {
					$numberingInfo.nbLecture++;
					$rootTree.elements[i].$numero = $numberingInfo.nbLecture;
				} else if ($rootTree.elements[i].type === 'tutorial') {
					$numberingInfo.nbTutorial++;
					String.fromCharCode('65');
					$rootTree.elements[i].$numero = String.fromCharCode(64 + $numberingInfo.nbTutorial);
				} else if ($rootTree.elements[i].type === 'evaluation' || $rootTree.elements[i].type === 'exam') {
					$rootTree.elements[i].$numero = $numberingInfo.nbEvalAndExam++;
				}

				numberSyllabus($rootTree.elements[i], $numberingInfo);
			}
		}
	};

	/**
	 * Numbering the syllabus element (lecture, tutorial and evaluation)
	 * @param {Object} $rootTree Syllabus root tree
	 */
	this.numberSyllabus = function($data) {
		var numberingInfo = {
			'nbLecture': 0,
			'nbTutorial': 0,
			'nbEvalAndExam': 1
		};

		numberSyllabus($data, numberingInfo);
	};

	this.itemHasChildInMenu = function(item) {
		if (!item.elements) {
			return false;
		}

		for (var i = 0; i < item.elements.length; i++) {
			if (this.template[item.elements[i].templateStructureId].displayInMenu) {
				return true;
			}
		}

		return false;
	};

	this.itemHasParentInMenu = function(item) {
		return this.getParent(item) !== this.$rootTree;
	};

	// Return the name of the resourceId in the element
	this.findElementResourceIdName = function(element) {
		if (element.type === 'image') {
			return 'imageId';
		} else if (element.type === 'document') {
			return 'documentId';
		} else if (element.type === 'citation') {
			return 'citationId';
		}

		return null;
	};

	/**
	 * Get the visibility dates of an element
	 */
	this.getElementVisibilityDates = function(element) {
		var start = null;
		var end = null;
		var elementResourceIdName = this.findElementResourceIdName(element);

		// Use the resource to check date
		if (elementResourceIdName) {
			var res = ResourcesService.getResource(element.attributes[elementResourceIdName]);

			if (res) {
				if (elementResourceIdName === 'citationId') {
					res = ResourcesService.getResource(res.parentId);
				}

				if (res.release) {
					start = moment(res.release.time);
				}

				if (res.retract) {
					end = moment(res.retract.time);
				}
			}
		}
		// Use the element date fields
		else if (element.hasDatesInterval) {
			if (element.availabilityStartDate) {
				start = moment(element.availabilityStartDate);
			}

			if (element.availabilityEndDate) {
				end = moment(element.availabilityEndDate);
			}
		}

		return {
			start: start,
			end: end,
			usingResource: !!element.$selectedResource
		};
	};

	this.getElementResource = function(element) {
		var elementResourceIdName = this.findElementResourceIdName(element);

		if (!elementResourceIdName) {
			return null;
		}

		var res = ResourcesService.getResource(element.attributes[elementResourceIdName]);

		if (res && elementResourceIdName === 'citationId') {
			res = ResourcesService.getResource(res.parentId);
		}

		return res;
	};

	this.updateCurrentSyllabus = function(syllabus) {
		this.setSyllabus(syllabus);

		for (var i = 0; i < this.syllabusList.length; i++) {
			if (this.syllabusList[i].id === syllabus.id) {
				this.syllabusList[i] = syllabus;

				break;
			}
		}
	};

	window.sss = this;
}]);
