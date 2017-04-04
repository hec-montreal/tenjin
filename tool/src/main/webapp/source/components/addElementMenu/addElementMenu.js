tenjinApp.directive('addElementMenu', ['ModalService', 'UserService', 'SyllabusService', 'SyllabusLockService', 'AlertService', 'config', function(ModalService, UserService, SyllabusService, SyllabusLockService, AlertService, config) {
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
			$scope.syllabusLockService = SyllabusLockService;

			$scope.addElement = function($type) {
				$scope.isOpen = false;

				// If the type is rubric, add now
				if ($type.type === 'rubric') {
					var element = {
						'attributes': {},
						'type': $type.type,
						'composite': true,
						'parentId': $scope.element.id,
						'templateStructureId': $type.id,
						'availabilityStartDate': Date.now(),
						'title': $type.label,
						'important': false,
						'publicElement': true,
						'common': $scope.syllabusService.syllabus.common
					};

					$scope.mode = 'creation';

					var result = SyllabusService.addRubricToSyllabus(SyllabusService.syllabus, $scope.element, element);
					SyllabusService.setDirty(true);

				} else {
					// hide menu
					$scope.showAddMenu = false;

					ModalService.createElement($type, $scope.element).result.then(function(modalData) {
						modalData.element.equalsPublished = false;
						// define childrens list if it is not
						if (!modalData.parent.elements) {
							modalData.parent.elements = [];
						}
						modalData.parent.elements.push(modalData.element);
						SyllabusService.setDirty(true);
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
