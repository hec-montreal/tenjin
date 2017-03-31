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
					SyllabusService.deleteElementFromSyllabus(SyllabusService.syllabus, parent, $element);
					SyllabusService.setDirty(true);
				});
			};

			$scope.edit = function($element) {
				var parent = SyllabusService.getParent($element);

				ModalService.editElement(parent, $element).result.then(function(elementData) {
					elementData.element.equalsPublished = false;
					SyllabusService.addElementToSyllabus(SyllabusService.syllabus, elementData.parent, elementData.element);
					SyllabusService.setDirty(true);
				});
			}
		}
	};
}]);
