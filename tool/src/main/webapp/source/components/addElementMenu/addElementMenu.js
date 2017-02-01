tenjinApp.directive('addElementMenu', ['ModalService', 'SyllabusService', 'TreeService', 'AlertService', 'config', function(ModalService, SyllabusService, TreeService, AlertService, config) {
	'use strict';

	return {
		scope: {
			element: '=addElementMenu'
		},

		restrict: 'A',

		templateUrl: 'addElementMenu/addElementMenu.html',

		controller: function($scope) {
			$scope.modalService = ModalService;
			$scope.syllabusService = SyllabusService;
			$scope.treeService = TreeService;
			$scope.alertService = AlertService;
			$scope.config = config;

			$scope.addElement = function($type) {
				$scope.isOpen = false;

				// If the type is rubric, add now
				if ($type.type === 'rubric') {
					var element = {
						'attributes': {},
						'type': $type.type,
						'parentId': $scope.element.id,
						'templateStructureId': $type.id,
						'availabilityStartDate': Date.now(),
						'title': $type.label,
						'important': false,
						'publicElement': true,
						'common': $scope.syllabusService.syllabus.common
					};

					$scope.mode = 'creation';

					var data = angular.copy($scope.syllabusService.syllabus);
					var selectedItemId = TreeService.selectedElement.id;
					var location = TreeService.selectedElement.$location;

					var result = $scope.syllabusService.addRubricToSyllabus(data, $scope.element, element);

					if (result > 0) {
						SyllabusService.save(data).then(function(result) {
							SyllabusService.setSyllabus(result);
							TreeService.setSelectedItemFromLocation(location);
						}).catch(function(error) {
							AlertService.showAlert('cannotSaveSyllabus');
						});
					}
				} else {
					// hide menu
					$scope.showAddMenu = false;

					ModalService.createElement($type, $scope.element).result.then(function(modalData) {
						// We create a copy of the current syllabus and we add it the element to be added
						var data = angular.copy(SyllabusService.syllabus);
						var selectedItemId = TreeService.selectedElement.id;
						var location = TreeService.selectedElement.$location;

						modalData.element.equalsPublished = false;

						SyllabusService.addElementToSyllabus(data, modalData.parent, modalData.element);

						SyllabusService.save(data).then(function(result) {
							SyllabusService.setSyllabus(result);

							TreeService.setSelectedItemFromLocation(location);
						}).catch(function() {
							AlertService.showAlert('cannotSaveSyllabus');
						});
					});
				}
			};

			$scope.checkRubricsAlreadyPresent = function() {
				if ($scope.element.elements) {
					for (var k = 0; k < $scope.syllabusService.template[$scope.element.templateStructureId].elements.length; k++) {
						$scope.syllabusService.template[$scope.element.templateStructureId].elements[k].alreadyPresent = false;
					}

					// mark rubric already present
					for (var i = 0; i < $scope.element.elements.length; i++) {
						for (var j = 0; j < $scope.syllabusService.template[$scope.element.templateStructureId].elements.length; j++) {
							// check if the rubric is already present
							var ruleElement = $scope.syllabusService.template[$scope.element.templateStructureId].elements[j];
							if ($scope.element.elements[i].type === 'rubric' && ruleElement.id === $scope.element.elements[i].templateStructureId) {
								$scope.syllabusService.template[$scope.element.templateStructureId].elements[j].alreadyPresent = true;
								break;
							}
						}
					}
				}
			};

			$scope.toggleMenu = function() {
				$scope.showAddMenu = $scope.showAddMenu === false ? true : false;
			}
		}
	};
}]);
