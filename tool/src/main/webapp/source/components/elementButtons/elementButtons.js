tenjinApp.directive('elementButtons', ['ModalService', 'SyllabusService', 'AlertService', function(ModalService, SyllabusService, AlertService) {
	'use strict';

	return {
		scope: {
			element: '=elementButtons',
			noedit: '=noedit',
			nodelete: '=nodelete',
			nodrag: '=nodrag',
			disabled: '=disabled'
		},

		restrict: 'A',

		templateUrl: 'elementButtons/elementButtons.html',

		controller: function($scope) {
			$scope.modalService = ModalService;
			$scope.syllabusService = SyllabusService;

			$scope.confirmDelete = function($element) {
				var parent = SyllabusService.getParent($element);

				ModalService.confirmDeleteElement(parent, $element).result.then(function() {
					// identify and remove element from it's parent
					for (var i = 0; i < parent.elements.length; i++) {
						if (parent.elements[i].id === $element.id) {
							parent.elements.splice(i, 1);
						}
					}
					SyllabusService.setDirty(true);
				});
			};

			$scope.edit = function($element) {
				var parent = SyllabusService.getParent($element);

				ModalService.editElement(parent, $element).result.then(function(elementData) {
					elementData.element.equalsPublished = false;

					// identify and replace this element in the parent
					var parentsChildren = elementData.parent.elements;
					for (var i = 0; i < parentsChildren.length; i++) {
						if (parentsChildren[i].id === elementData.element.id) {
							parentsChildren[i] = elementData.element;
							break;
						}
					}

					SyllabusService.numberSyllabus(SyllabusService.syllabus);

					SyllabusService.setDirty(true);
				});
			}
		}
	};
}]);
