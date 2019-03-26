tenjinApp.controller('SetElementModalCtrl', ['$scope', '$uibModalInstance', '$translate', 'type', 'parent', 'element', 'SyllabusService', 'UserService', 'config', function($scope, $uibModalInstance, $translate, type, parent, element, SyllabusService, UserService, config) {
	'use strict';

	$scope.parent = parent;

	SyllabusService.editingElement = true;

	// Edit or create mode
	if (element) {
		// Edit mode
		$scope.type = {
			'label': '',
			'type': element.type
		};

		$scope.element = angular.copy(element);
		$scope.mode = 'edition';
		$scope.title = $translate.instant('MODAL_EDIT_ELEMENT_TITLE');
	} else {
		// Create mode
		$scope.type = type;

		$scope.element = {
			'id': SyllabusService.getTemporaryId(),
			'attributes': {},
			'type': $scope.type.type,
			'parentId': $scope.parent.id,
			'templateStructureId': $scope.type.id,
			'availabilityStartDate': new Date(),
			'common': SyllabusService.syllabus.common
		};

		if (type.type === 'composite') {
		    $scope.element.elements = [];
		}

		$scope.mode = 'creation';
		$scope.title = $translate.instant('MODAL_CREATE_ELEMENT_TITLE');

		// Is element checkable by default
		var annotationTypeCheck = UserService.profile.userAnnotationTypes['CHECK'];
		
		for (var i = 0; i < annotationTypeCheck.defaultElementTypes.length; i++) {
			if (annotationTypeCheck.defaultElementTypes[i] === $scope.element.type) {
				$scope.element.attributes['checkable'] = 'true';

				break;
			}
		}
	}

	$scope.ok = function() {
		if ($scope.element.preSave) {
			$scope.element.preSave.call($scope.element);
		}

        //delete empty attributes
        var keys = Object.keys($scope.element.attributes);
        for (var j=0; j < keys.length; j++){
            if ($scope.element.attributes[keys[j]] === ""){
                delete $scope.element.attributes[keys[j]];
            }
        }

		// Ensure the public field has a value
		if ($scope.element.publicElement === null || $scope.element.publicElement === undefined) {
			$scope.element.publicElement = true;
		}

		var errors = $scope.validateElement();

		if (errors.length <= 0) {
			SyllabusService.editingElement = false;

			$uibModalInstance.close({
				element: $scope.element,
				parent: $scope.parent
			});
		} else {
			$scope.validationErrors = errors;
		}
	};

	$scope.validateElement = function() {
		// Get element validation function
		var validationFn = $scope.element.validate;
		var ret = [];

		// If the validation function exists
		if (validationFn) {
			ret = validationFn.call($scope.element);
		}

		// Common fields to validate
		// Dates
		if ($scope.element.hasDatesInterval) {
			if ($scope.element.availabilityStartDate) {
				// convert to timestamp
				if (Object.prototype.toString.call($scope.element.availabilityStartDate) === '[object Date]') {
					$scope.element.availabilityStartDate = $scope.element.availabilityStartDate.getTime();
				}
			} else {
				ret.push({
					field: 'availabilityStartDate',
					message: 'ERROR_FORMAT_DATE_START'
				});
			}

			if ($scope.element.hasEndDate) {
				if ($scope.element.availabilityEndDate) {
					// convert to timestamp
					if (Object.prototype.toString.call($scope.element.availabilityEndDate) === '[object Date]') {
						$scope.element.availabilityEndDate = $scope.element.availabilityEndDate.getTime();
					}

					if ($scope.element.availabilityStartDate > $scope.element.availabilityEndDate) {
						ret.push({
							field: 'availabilityEndDate',
							message: 'ERROR_START_DATE_GREATER'
						});
					}
				} else {
					ret.push({
						field: 'availabilityEndDate',
						message: 'ERROR_FORMAT_DATE_END'
					});
				}
			}
		}

		// Assign messages from localization
		for (var i = 0; i < ret.length; i++) {
			ret[i].message = $translate.instant(ret[i].message);
		}

		return ret;
	};

	$scope.cancel = function() {
		SyllabusService.editingElement = false;
		
		$uibModalInstance.dismiss('cancel');
	};
}]);
