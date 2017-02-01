tenjinApp.directive('elementButtons', ['ModalService', 'SyllabusService', 'TreeService', function(ModalService, SyllabusService, TreeService) {
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
					var location = TreeService.selectedElement.$location;

					SyllabusService.deleteElementFromSyllabus(data, parent, $element);

					SyllabusService.save(data).then(function(response) {
						SyllabusService.setSyllabus(response);
						TreeService.setSelectedItemFromLocation(location);
					}).catch(function(error) {
						AlertService.showAlert('cannotSaveSyllabus');
					});
				});
			};

			$scope.edit = function($element) {
				var parent = SyllabusService.getParent($element);

				ModalService.editElement(parent, $element).result.then(function(elementData) {
					var data = angular.copy(SyllabusService.syllabus);
					var selectedItemId = TreeService.selectedElement.id;
					var location = TreeService.selectedElement.$location;

					elementData.element.equalsPublished = false;

					SyllabusService.addElementToSyllabus(data, elementData.parent, elementData.element);

					SyllabusService.save(data).then(function(result) {
						SyllabusService.setSyllabus(result);

						TreeService.setSelectedItemFromLocation(location);
					}).catch(function() {
						AlertService.showAlert('cannotSaveSyllabus');
					});

				});
			}
		}
	};
}]);
