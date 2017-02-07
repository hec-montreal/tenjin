tenjinApp.service('SyllabusService', ['AlertService', '$translate', '$q', '$http', '$rootScope', function(AlertService, $translate, $q, $http, $rootScope) {
	'use strict';

	this.syllabus = null;
	this.syllabusSaved = null;
	this.template = null;
	this.syllabusList = null;

	this.dirty = false;
	this.working = false;

	// variable used to look through the syllabus tree
	this.navigation = {
		'level': 1
	};

	// Save a syllabus
	this.save = function(syllabus) {
		var tthis = this;
		var ret = $q.defer();
		var url = syllabus.id ? 'v1/syllabus/' + syllabus.id + '.json' : 'v1/syllabus.json';

		this.working = true;

		$http.post(url, syllabus).success(function(data) {
			tthis.setSyllabus(data);

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

	this.importSyllabusFromSite = function(siteId) {
		var tthis = this;
		var ret = $q.defer();
		var url = 'v1/import/' + siteId + '.json';

		$http.post(url, siteId).success(function(data) {
			ret.resolve(data);
		}).error(function(data) {
			ret.reject(data);
		}).finally(function() {
			tthis.working = false;
		})
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
		var getUrl = "";

		this.working = true;

		// if no id is specified, we can try and get the single published syllabus available to this user
		if (typeof(id) === "undefined") {
			getUrl = 'v1/syllabus/published.json';
		} else {
			getUrl = 'v1/syllabus/' + id + '.json?published=true';
		}

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

		// TODO : load template for the given syllabus
		$http.get('v1/template/1/rules.json').success(function(data) {
			tthis.setTemplate(data);

			ret.resolve(tthis.getTemplate());
		}).error(function(data) {
			ret.reject(data);
		});

		return ret.promise;
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
		return undefined;
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
		return typeof($object.templateId) === "undefined";
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
	 * Add a new element to the syllabus
	 * @param {Object} $rootTree Root tree
	 * @param {Object} $parent Parent of the element
	 * @param {Object} $element Element to be inserted
	 * @param {Object} $position Position of the element in the list
	 */
	var addElementToSyllabus = function($rootTree, $parent, $element, $position) {

		if ($rootTree.elements) {

			if ($rootTree.id === $parent.id && isSyllabusElement($rootTree)) {
				// If the element already exists, replace it (update)
				var modification = false;
				for (var i = 0; i < $rootTree.elements.length; i++) {
					if ($rootTree.elements[i].id === $element.id) {
						// modification
						$rootTree.elements[i] = $element;
						modification = true;
						break;
					}
				}
				// add element
				if (!modification) {
					$rootTree.elements.push($element);
				}

			} else {

				for (var i = 0; i < $rootTree.elements.length; i++) {
					addElementToSyllabus($rootTree.elements[i], $parent, $element, $position);
				}

			}

		}

	};

	/**
	 * Add a new element to the syllabus
	 * @param {Object} $data Syllabus root tree
	 * @param {Object} $parent Parent of the element
	 * @param {Object} $element Element to be inserted
	 * @param {Object} $position Position of the element in the list
	 */
	this.addElementToSyllabus = function($data, $parent, $element, $position) {
		addElementToSyllabus($data, $parent, $element, $position);
	};

	/**
	 * Add a new rubric to the syllabus
	 * @param {Object} $rootTree Syllabus root tree
	 * @param {Object} $parent Parent of the element
	 * @param {Object} $element Element to be inserted
	 * @param {Object} $rules Template rules
	 * @return {Number} If the rubric already exists then return -1, else return 1
	 */
	var addRubricToSyllabus = function($rootTree, $parent, $element, $rules) {

		if ($rootTree.elements) {

			if ($rootTree.id === $parent.id && isSyllabusElement($rootTree)) {
				if ($rootTree.elements.length > 0) {

					// Check if the rubric already exists
					for (var i = 0; i < $rootTree.elements.length; i++) {
						if ($rootTree.elements[i].templateStructureId === $element.templateStructureId) {
							// Rubric already present
							return -1;
						}
					}

					// Check where the rubric must be inserted
					var listTemp = [];
					var index = -1;
					for (var i = 0; i < $rules.elements.length; i++) {
						for (var j = 0; j < $rootTree.elements.length; j++) {
							if ($rules.elements[i].id === $rootTree.elements[j].templateStructureId) {
								listTemp.push($rootTree.elements[j]);
								break;
							}
						}

						if ($rules.elements[i].id === $element.templateStructureId) {
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
						$rootTree.elements.splice(index, 0, $element);
						return 1;
					}


				} else {
					$rootTree.elements.push($element);
					return 1;
				}

			} else {

				for (var i = 0; i < $rootTree.elements.length; i++) {
					var results = addRubricToSyllabus($rootTree.elements[i], $parent, $element, $rules);
					if (results === -1) {
						return results;
					}
				}

			}

		}

		return 1;

	};

	/**
	 * Add a new rubric to the syllabus
	 * @param {Object} $data Syllabus root tree
	 * @param {Object} $parent Parent of the element
	 * @param {Object} $element Element to be inserted
	 * @return {Number} If the rubric already exists then return -1, else return 1
	 */
	this.addRubricToSyllabus = function($data, $parent, $element) {
		// We get the template rules of the parent element 
		// to add the rubric to the right place
		var rules = this.template[$parent.templateStructureId];


		return addRubricToSyllabus($data, $parent, $element, rules);
	};

	/**
	 * Delete an element from the syllabus
	 * @param {Object} $data Syllabus root tree
	 * @param {Object} $parent Parent of the element
	 * @param {Object} $element Element to be deleted
	 */
	var deleteElementFromSyllabus = function($rootTree, $parent, $element) {

		if ($rootTree.elements) {

			if ($rootTree.id === $parent.id && isSyllabusElement($rootTree)) {
				// si l'élément existe déjà on le supprime et on le remplace
				for (var i = 0; i < $rootTree.elements.length; i++) {
					if ($rootTree.elements[i].id === $element.id) {
						$rootTree.elements.splice(i, 1);
					}
				}

			} else {

				for (var i = 0; i < $rootTree.elements.length; i++) {
					deleteElementFromSyllabus($rootTree.elements[i], $parent, $element);
				}

			}

		}

	};

	/**
	 * Delete an element from the syllabus
	 * @param {Object} $data Syllabus root tree
	 * @param {Object} $parent Parent of the element
	 * @param {Object} $element Element to be deleted
	 */
	this.deleteElementFromSyllabus = function($data, $parent, $element) {
		deleteElementFromSyllabus($data, $parent, $element);
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
					var resultat = getParent($rootTree.elements[i], $element);
					if (resultat) {
						return resultat;
					}
				}
			}
		}
		return undefined;
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
				if ($rootTree.elements[i].type === "lecture") {
					$numberingInfo.nbLecture++;
					$rootTree.elements[i].$numero = $numberingInfo.nbLecture;
				} else if ($rootTree.elements[i].type === "tutorial") {
					$numberingInfo.nbTutorial++;
					String.fromCharCode('65');
					$rootTree.elements[i].$numero = String.fromCharCode(64 + $numberingInfo.nbTutorial);
				} else if ($rootTree.elements[i].type === "evaluation" || $rootTree.elements[i].type === "exam") {
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
	}

	this.itemHasParentInMenu = function(item) {
		return this.getParent(item) !== this.$rootTree;
	}
}]);
