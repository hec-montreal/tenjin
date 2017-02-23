tenjinApp.directive('addElementMenu', ['ModalService', 'UserService', 'SyllabusService', 'AlertService', 'config', function(ModalService, UserService, SyllabusService, AlertService, config) {
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
			$scope.userService = UserService;
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
					var result = $scope.syllabusService.addRubricToSyllabus(data, $scope.element, element);

					if (result > 0) {
						SyllabusService.save(data).catch(function(e) {
							AlertService.showSyllabusSaveAlert(e);
						});
					}
				} else {
					// hide menu
					$scope.showAddMenu = false;

					ModalService.createElement($type, $scope.element).result.then(function(modalData) {
						// We create a copy of the current syllabus and we add it the element to be added
						var data = angular.copy(SyllabusService.syllabus);

						modalData.element.equalsPublished = false;

						SyllabusService.addElementToSyllabus(data, modalData.parent, modalData.element);

						SyllabusService.save(data).catch(function(e) {
							AlertService.showSyllabusSaveAlert(e);
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
