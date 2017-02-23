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
					// We copy the current syllabus
					var data = angular.copy(SyllabusService.syllabus);

					SyllabusService.deleteElementFromSyllabus(data, parent, $element);

					SyllabusService.save(data).catch(function(e) {
						AlertService.showSyllabusSaveAlert(e);
					});
				});
			};

			$scope.edit = function($element) {
				var parent = SyllabusService.getParent($element);

				ModalService.editElement(parent, $element).result.then(function(elementData) {
					var data = angular.copy(SyllabusService.syllabus);

					elementData.element.equalsPublished = false;

					SyllabusService.addElementToSyllabus(data, elementData.parent, elementData.element);

					SyllabusService.save(data).catch(function(e) {
						AlertService.showSyllabusSaveAlert(e);
					});
				});
			}
		}
	};
}]);
