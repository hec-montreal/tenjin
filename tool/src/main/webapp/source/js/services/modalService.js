tenjinApp.service('ModalService', ['$uibModal', 'SyllabusService', function($uibModal, SyllabusService) {
	'use strict';

	/**
	 * Delete modal for an element
	 * @param {Object} $parent Parent element
	 * @param {Object} $element Element to be deleted
	 */
	this.confirmDeleteElement = function($parent, $element) {
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'modals/deleteElementModal/deleteElementModal.html',
			controller: 'DeleteElementModalCtrl',
			size: '',
			backdrop: 'static',
			keyboard: false,
			resolve: {
				parent: function() {
					return $parent;
				},

				element: function() {
					return $element;
				}
			}
		});

		return modalInstance;
	};

	/**
	 * Create modal for a new element
	 * @param {Object} $type Element type object (properties : id, type)
	 * @param {Object} $parent Parent element
	 */
	this.createElement = function($type, $parent) {
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'modals/setElementModal/setElementModal.html',
			controller: 'SetElementModalCtrl',
			size: '',
			backdrop: 'static',
			keyboard: false,
			resolve: {
				type: function() {
					return $type;
				},
				parent: function() {
					return $parent;
				},
				element: function() {
					return undefined;
				}
			}
		});

		return modalInstance;
	};

	/**
	 * Edit modal for a element
	 * @param {Object} $parent Parent element
	 * @param {Object} $element Element to be updated
	 */
	this.editElement = function($parent, $element) {
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'modals/setElementModal/setElementModal.html',
			controller: 'SetElementModalCtrl',
			size: '',
			backdrop: 'static',
			keyboard: false,
			resolve: {
				type: function() {
					return undefined;
				},
				parent: function() {
					return $parent;
				},
				element: function() {
					return $element;
				}
			}
		});

		return modalInstance;
	};

	/**
	 * Create modal for a syllabus
	 */
	this.createSyllabus = function() {
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'modals/createSyllabusModal/createSyllabusModal.html',
			controller: 'CreateSyllabusModalCtrl',
			size: '',
			backdrop: 'static',
			keyboard: false
		});

		return modalInstance;
	};

	/**
	 * Delete modal for a list of syllabus
	 * @param {Array} $syllabusList List of syllabus to be deleted
	 */
	this.deleteSyllabus = function($syllabusList) {
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'modals/deleteSyllabusModal/deleteSyllabusModal.html',
			controller: 'DeleteSyllabusModalCtrl',
			size: '',
			backdrop: 'static',
			keyboard: false,
			resolve: {
				syllabusList: {
					'syllabusList': $syllabusList
				}
			}
		});

		return modalInstance;
	};

	/**
	 * Unpublish modal for a list of syllabus
	 * @param {Array} $syllabusList List of syllabus to be unpublished
	 */
	this.unpublishSyllabus = function($syllabusList) {
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'modals/unpublishSyllabusModal/unpublishSyllabusModal.html',
			controller: 'UnpublishSyllabusModalCtrl',
			size: '',
			backdrop: 'static',
			keyboard: false,
			resolve: {
				syllabusList: {
					'syllabusList': $syllabusList
				}
			}
		});

		return modalInstance;
	};

	this.externalSyllabusImport = function() {
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'modals/externalImportModal/externalImportModal.html',
			controller: 'ExternalImportModalCtrl',
			size: '',
			backdrop: 'static',
			keyboard: false
		});

		return modalInstance;
	};

	this.confirmMakeSyllabusCommon = function(syllabusId) {
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'modals/makeSyllabusCommonModal/makeSyllabusCommonModal.html',
			controller: 'MakeSyllabusCommonCtrl',
			resolve: {
				params: function () {
					return {'syllabusId': syllabusId};
				}
			},
			size: '',
			backdrop: 'static',
			keyboard: false
		});

		return modalInstance;
	};

	this.openPermissionsModal = function() {
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'modals/permissionsModal/permissionsModal.html',
			controller: 'PermissionsModalCtrl',
			size: '',
			backdrop: 'static',
			keyboard: false
		});

		return modalInstance;
	};

	this.unassignSections = function(sections) {
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'modals/unassignSectionsModal/unassignSectionsModal.html',
			controller: 'UnassignSectionsModalCtrl',
			size: '',
			backdrop: 'static',
			keyboard: false
		});

		return modalInstance;
	};

	this.prePublishSyllabus = function() {
		return $uibModal.open({
			animation: true,
			templateUrl: 'modals/publishModal/publishModal.html',
			controller: 'PublishModalCtrl',
			size: '',
			backdrop: 'static',
			keyboard: false
		});
	};

	this.copySyllabus = function(syllabusToCopy) {
		return $uibModal.open({
			animation: true,
			templateUrl: 'modals/copySyllabusModal/copySyllabusModal.html',
			controller: 'CopySyllabusModal',
			size: '',
			backdrop: 'static',
			resolve: {
				'syllabusToCopy': syllabusToCopy
			},
			keyboard: false
		});
	};
}]);
