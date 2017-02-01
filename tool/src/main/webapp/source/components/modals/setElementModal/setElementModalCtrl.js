tenjinApp.controller('SetElementModalCtrl', ['$scope', '$uibModalInstance', '$translate', 'type', 'parent', 'element', 'SyllabusService', 'config', function($scope, $uibModalInstance, $translate, type, parent, element, SyllabusService, config) {
	'use strict';

	$scope.parent = parent;

	// Edit or create mode
	if (element) {
		// Edit mode
		$scope.type = {
			'label': $translate.instant(config.types[element.type].label),
			'type': element.type
		};

		$scope.element = angular.copy(element);
		$scope.mode = 'edition';
		$scope.title = $translate.instant('MODAL_EDIT_ELEMENT_TITLE');
	} else {
		// Create mode
		$scope.type = type;

		$scope.element = {
			'attributes': {},
			'type': $scope.type.type,
			'parentId': $scope.parent.id,
			'templateStructureId': $scope.type.id,
			'availabilityStartDate': new Date(),
			'common': SyllabusService.syllabus.common
		};

		$scope.mode = 'creation';
		$scope.title = $translate.instant('MODAL_CREATE_ELEMENT_TITLE');
	}

	$scope.ok = function() {
		var errors = $scope.validateElement();

		if (errors.length <= 0) {
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
		if (!!validationFn) {
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
		$uibModalInstance.dismiss('cancel');
	};
}]);
