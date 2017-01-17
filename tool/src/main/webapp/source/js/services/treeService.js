tenjinApp.service('TreeService', ['$timeout', 'SyllabusService', function($timeout, SyllabusService) {
	'use strict';

	// Current viewed item (mobile menu)
	this.viewedElement = undefined;

	/**
	 * Recursively look through the syllabus and unselect all elements
	 * @param {Object} $rootTree Root tree
	 */
	var unselectTreeElements = function($rootTree) {
		if ($rootTree.elements) {
			for (var i = 0; i < $rootTree.elements.length; i++) {
				$rootTree.elements[i].$selected = false;
				unselectTreeElements($rootTree.elements[i]);
			}
		}
	};

	/**
	 * Scan the tree and unselect all elements
	 * @param {Object} $rootTree Root tree
	 */
	var unselectTree = function($rootTree) {
		unselectTreeElements($rootTree);
	};

	/**
	 * Get the selected item
	 * @return {Object} The selected item
	 */
	this.getSelectedItem = function() {
		return this.selectedItem;
	};

	/**
	 * Set the new selected item
	 * Unselect the previous selected item
	 * Resize the iframe
	 * @param {Object} $item Item selected
	 * @param {Boolean} $firstTime First time an item is selected
	 */
	this.setSelectedItem = function($item, $firstTime) {
		if ($firstTime || !$item.$selected) {
			if (!$firstTime) {
				unselectTree(SyllabusService.getSyllabus());
			}

			// Level and position
			// ex : [2, 1, 3], in the syllabus tree, 2nd element on the 1st level,
			// then 1st element on the 2nd level, finally 3rd element on the 3rd level
			var location = {
				'location': []
			};

			var tmpLocation = {
				'location': []
			};

			var selectedItem = getItemFromId(SyllabusService.getSyllabus(), $item.id, location, tmpLocation);

			// set selected item
			this.selectedItem = $item;
			$item.$selected = true;
			$item.$location = location; // memorize the place of the element


			$timeout(function() {
				// anything you want can go here and will safely be run on the next digest.
				// resize frame (should be done also whenever we change content)
				if (window.frameElement) {
					setMainFrameHeight(window.frameElement.id);
				}
			});
		}
	};

	/**
	 * Compare two arrays and return true if there are equals
	 * @param {Array} $tab1 First array
	 * @param {Array} $tab2 Second array
	 * @param {Boolean} $tab2 Second array
	 */
	var arrayEquals = function($tab1, $tab2) {
		if ($tab1.length === $tab2.length && $tab1.length > 0) {
			for (var i = 0; i < $tab1.length; i++) {
				if ($tab1[i] !== $tab2[i]) {
					return false;
				}
			}
			return true; // all values are identical
		}

		return false;
	};


	/**
	 * Get the element giving his position in the tree
	 * @param {Object} $rootTree Root tree
	 * @param {Object} $location Final place for the element
	 * @param {Object} $tmpLocation Temporary place
	 * @return {Object} Returns the found element or undefined
	 */
	var getItemFromLocation = function($rootTree, $location, $tmpLocation) {
		// We look every element except the root element (which is the syllabus)
		if (SyllabusService.isSyllabusElement($rootTree) &&
			arrayEquals($location.location, $tmpLocation.location) === true) {
			return $rootTree;
		} else {
			if ($rootTree.elements) {
				for (var i = 0; i < $rootTree.elements.length; i++) {
					var newTmpLocation = {
						'location': $tmpLocation.location.slice()
					};

					newTmpLocation.location.push(i);

					var result = getItemFromLocation($rootTree.elements[i], $location, newTmpLocation);

					if (result) {
						return result;
					}
				}
			}
		}

		return undefined;
	};

	/**
	 * Get the element from id and calculate the position of this one
	 * @param {Object} $rootTree Root tree
	 * @param {Number} $id Element id
	 * @param {Object} $location Final place for the element
	 * @param {Object} $tmpLocation Temporary place
	 * @return {Object} Returns the found element or undefined
	 */
	var getItemFromId = function($rootTree, $id, $location, $tmpLocation) {
		if ($rootTree.id === $id && SyllabusService.isSyllabusElement($rootTree)) {
			$location.location = angular.copy($tmpLocation.location);
			return $rootTree;
		} else {
			if ($rootTree.elements) {
				for (var i = 0; i < $rootTree.elements.length; i++) {
					var newTmpLocation = {
						'location': $tmpLocation.location.slice()
					};

					newTmpLocation.location.push(i);

					var result = getItemFromId($rootTree.elements[i], $id, $location, newTmpLocation);

					if (result) {
						return result;
					}
				}
			}
		}

		return undefined;
	};

	/**
	 * Set the selected item from a given element id
	 * @param {Number} $id Id of the element
	 */
	this.setSelectedItemFromId = function($id) {
		var location = {
			'location': []
		};

		var tmpLocation = {
			'location': []
		};

		var selectedItem = getItemFromId(SyllabusService.getSyllabus(), $id, location);

		this.selectedItem = selectedItem;
		this.selectedItem.$selected = true;
		this.selectedItem.$location = location;
	};

	/**
	 * Set the selected item from a given place
	 * @param {Number} $location Place of the element
	 */
	this.setSelectedItemFromLocation = function($location) {
		var tmpLocation = {
			'location': []
		};

		var selectedItem = getItemFromLocation(SyllabusService.getSyllabus(), $location, tmpLocation);

		this.selectedItem = selectedItem;
		this.selectedItem.$selected = true;
		this.selectedItem.$location = $location;
	};
}]);
