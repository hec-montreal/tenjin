tenjinApp.directive("mobileNavigation", ['SyllabusService', 'TreeService', function(SyllabusService, TreeService) {
	'use strict';

	return {
		scope: {},

		restrict: 'E',

		templateUrl: 'mobileNavigation/mobileNavigation.html',

		controller: function($scope) {
			$scope.syllabusService = SyllabusService;
			$scope.treeService = TreeService;

			$scope.mobileMenuVisible = false;

			$scope.toggleMobileMenu = function() {
				$scope.mobileMenuVisible = !$scope.mobileMenuVisible;
			};

			$scope.selectElement = function(element) {
				TreeService.selectElement(element);

				$scope.mobileMenuVisible = false;
			};

			$scope.goLeft = function() {
				var selectedElement = TreeService.findSelectedElement();
				var previousSibling = TreeService.findPeviousSibling(selectedElement);

				// A previous sibling was found
				if (previousSibling) {
					TreeService.selectElement(previousSibling);
				} else {
					// Otherwise select the parent (if it's not a syllabus)
					var parent = TreeService.findElementParent(selectedElement);

					// Parent is an element
					if (parent.type) {
						TreeService.selectElement(parent);
					} else {
						TreeService.selectElement(parent.elements[0]);
					}
				}
			};

			$scope.goRight = function() {
				var selectedElement = TreeService.findSelectedElement();

				// Try to go into selected element
				if (selectedElement.elements && selectedElement.elements.length > 0) {
					for (var i = 0; i < selectedElement.elements.length; i++) {
						if (TreeService.isElementSelectable(selectedElement.elements[i])) {
							TreeService.selectElement(selectedElement.elements[i]);

							return;
						}
					}
				}

				// Otherwise try to go to next sibling
				var nextSibling = TreeService.findNextSibling(selectedElement);

				if (nextSibling) {
					TreeService.selectElement(nextSibling);
				}
			};
		}
	};
}]);
