﻿tenjinApp.service('ModalService', ['$uibModal', function($uibModal) {
	'use strict';

	/**
	 * Delete modal for an element
	 * @param {Object} $parent Parent element
	 * @param {Object} $element Element to be deleted
	 */
	this.confirmDelete = function($parent, $element) {
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'deleteModal/deleteModalContent.html',
			controller: 'DeleteModalCtrl',
			size: '',
			backdrop: 'static',
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
			templateUrl: 'setElementModal/setElementModal.html',
			controller: 'SetElementModalCtrl',
			size: '',
			backdrop: 'static',
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
			templateUrl: 'setElementModal/setElementModal.html',
			controller: 'SetElementModalCtrl',
			size: '',
			backdrop: 'static',
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
			templateUrl: 'createSyllabusModal/createSyllabusModal.html',
			controller: 'CreateSyllabusModalCtrl',
			size: '',
			backdrop: 'static'
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
			templateUrl: 'deleteSyllabusModal/deleteSyllabusModal.html',
			controller: 'DeleteSyllabusModalCtrl',
			size: '',
			backdrop: 'static',
			resolve: {
				syllabusList: {
					'syllabusList': $syllabusList
				}
			}
		});

		return modalInstance;
	};

	this.prePublishSyllabus = function() {
		return $uibModal.open({
			animation: true,
			templateUrl: 'publishModal/publishModal.html',
			controller: 'PublishModalCtrl',
			size: '',
			backdrop: 'static'
		});
	};
}]);
