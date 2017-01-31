﻿tenjinApp.controller('ManagementCtrl', ['$scope', '$timeout', '$translate', 'SyllabusService', 'AlertService', 'ModalService', 'UserService', 'config', '$q', function($scope, $timeout, $translate, SyllabusService, AlertService, ModalService, UserService, config, $q) {
	'use strict';

	var refresh = function() {
		UserService.loadProfile().then(function() {
			SyllabusService.loadSyllabusList().catch(function() {
				AlertService.showAlert("cannotLoadBaseData");
			});
		}).catch(function() {
			AlertService.showAlert("cannotLoadBaseData");
		});
	};

	var createSyllabus = function(chosenSections) {
		SyllabusService.save(newSyllabus).then(function(data) {
			SyllabusService.syllabusList.push(data);

			syllabusAdded = data;
		}).catch(function(data) {
			AlertService.showAlert('cannotSaveSyllabus');
		});
	};

	$scope.refresh = refresh;

	$scope.addSyllabus = function() {
		ModalService.createSyllabus().result.then(function(data) {
			var sections = [];

			for (var i = 0; i < data.sections.length; i++) {
				if (data.sections[i].checked) {
					sections.push(data.sections[i].id);
				}
			}

			SyllabusService.create(UserService.getProfile().siteId, data.name, sections).then(function() {
				refresh();
			}).catch(function() {
				AlertService.showAlert('cannotSaveSyllabus');
			});
		});
	};

	$scope.deleteSyllabus = function() {
		var syllabusList = [];

		for (var i = 0; i < $scope.syllabusService.syllabusList.length; i++) {
			if ($scope.syllabusService.syllabusList[i].checked === true) {
				syllabusList.push($scope.syllabusService.syllabusList[i]);
			}
		}

		ModalService.deleteSyllabus(syllabusList).result.then(function(syllabusToDelete) {
			SyllabusService.deleteSyllabusList(syllabusToDelete).catch(function(data) {
				AlertService.showAlert('cannotDeleteSyllabusList');
			});
		});
	};

	$scope.enableDelete = function() {
		$scope.disableDelete = true;

		// if a syllabus is checked then the delete button should be enabled
		for (var i = 0; i < $scope.syllabusService.syllabusList.length; i++) {
			if ($scope.syllabusService.syllabusList[i].checked === true) {
				$scope.disableDelete = false;
			}
		}
	};

	/**
	 * Display the sections for a syllabus
	 * @param {Object} $syllabus Syllabus
	 * @return {String} A string containing the list of the sections or no section
	 */
	$scope.showSections = function($syllabus) {
		var selected = [];

		angular.forEach($scope.allSections, function(s) {
			if ($syllabus.sections.indexOf(s.id) >= 0) {
				selected.push(s.name);
			}
		});

		return selected.length ? selected.join(', ') : $translate.instant("MANAGEMENT_NO_SECTION");
	};

	$scope.updateTitle = function(data, syllabus) {
		if (data.length === 0) {
			return $translate.instant("MANAGEMENT_ERREUR_NAME");
		}

		syllabus.title = data;

		var ret = $q.defer();

		SyllabusService.save(syllabus).then(function() {
			ret.resolve();

			refresh();
		}).catch(function() {
			AlertService.showAlert('cannotSaveSyllabus');

			ret.reject();
		});

		return ret.promise;
	};

	$scope.updateSections = function(data, syllabus) {
		var warn = false;
		var initialSections = syllabus.sections;

		for (var i = 0; i < syllabus.sections.length; i++) {
			var isIn = false;

			for (var j = 0; j < data.length; j++) {
				if (data[j] === syllabus.sections[i]) {
					isIn = true;

					break;
				}
			}

			if (!isIn) {
				warn = true;

				break;
			}
		}

		var doUpdate = function() {
			// keep a reference on the old sections
			lastModifiedSyllabusBeforeUpdate = angular.copy(syllabus);
			// keep a reference to the last modified syllabus (to update sections of other syllabus)
			lastModifiedSyllabus = angular.copy(syllabus);
			// assign sections
			lastModifiedSyllabus.sections = data;

			var ret = $q.defer();

			SyllabusService.save(lastModifiedSyllabus).then(function() {
				ret.resolve();

				refresh();
			}).catch(function() {
				AlertService.showAlert('cannotSaveSyllabus');

				ret.reject();
			});

			return ret.promise;
		};

		if (warn) {
			// Create modal
			var modal = ModalService.unassignSections(data);

			// Processing result
			modal.result.then(function(selectedItem) {
				return doUpdate();
			}, function() {
				syllabus.sections = initialSections;
			});
		} else {
			return doUpdate();
		}
	};

	/*var updateSyllabusList = function($syllabusModified, $oldSyllabus) {
		if ($syllabusModified) {
			var syllabusList = SyllabusService.getSyllabusList();

			var sectionsForCommon = [];
			var sectionsToReassign = [];
			// check sections differences between the old and the updated syllabus
			// edition
			if ($oldSyllabus) {
				for (var i = 0; i < $syllabusModified.sections.length; i++) {
					if ($oldSyllabus.sections.indexOf($syllabusModified.sections[i]) === -1) {
						sectionsToReassign.push($syllabusModified.sections[i]);
					}
				}
				for (i = 0; i < $oldSyllabus.sections.length; i++) {
					if ($syllabusModified.sections.indexOf($oldSyllabus.sections[i]) === -1) {
						sectionsForCommon.push($oldSyllabus.sections[i]);
					}
				}
			} // creation
			else {
				sectionsToReassign = sectionsToReassign.concat($syllabusModified.sections);
			}

			// 1- first check all syllabus and remove sections (present in the syllabus modified) 
			for (var i = 0; i < syllabusList.length; i++) {
				if (syllabusList[i].id !== $syllabusModified.id) {
					for (var j = 0; j < sectionsToReassign.length; j++) {
						var index = syllabusList[i].sections.indexOf(sectionsToReassign[j]);
						if (index > -1) {
							syllabusList[i].sections.splice(index, 1);
						}
					}
				}
			}

			// 2- second add orphan sections to the shareable
			var commonSyllabus = SyllabusService.getCommonSyllabus();
			if ($oldSyllabus) {
				commonSyllabus.sections = commonSyllabus.sections.concat(sectionsForCommon);
			}

			//TODO - check if correct still - Awa
			// 3- remove syllabus if the user does not still have access to it
			var sectionsWrite = UserService.getProfile().sectionWrite;

			for (var i = syllabusList.length - 1; i >= 0; i--) {

				var sectionsSyllabus = syllabusList[i].sections;
				var sectionWritePresent = false;
				for (var j = 0; j < sectionsWrite.length; j++) {
					if (sectionsSyllabus.indexOf(sectionsWrite[j].id) > -1) {
						sectionWritePresent = true;
						break;
					}
				}

				if (UserService.isAllowed('syllabusWrite')) {
					// remove syllabus from the syllabus list
					syllabusList.splice(i, 1);
				}
			}
		}
	};*/

	/*$scope.updateSyllabusList = function($syllabus) {
		// update syllabus
		$syllabus = angular.copy(lastModifiedSyllabus);

		// update syllabus list with last modified syllabus as param 
		updateSyllabusList(lastModifiedSyllabus, lastModifiedSyllabusBeforeUpdate);

		// reset tmp variables
		lastModifiedSyllabus = null;
		lastModifiedSyllabusBeforeUpdate = null;
	};*/

	$scope.redirectToSyllabus = function($syllabusId) {
		SyllabusService.setCurrentSyllabusId($syllabusId);
	};

	$scope.getSyllabusRoute = function($id) {
		return "syllabus/" + $id;
	};

	$scope.showStatus = function($statusId) {
		return $translate.instant(config.statusLabel[$statusId]);
	};

	$scope.syllabusService = SyllabusService;
	$scope.alertService = AlertService;
	$scope.userService = UserService;
	$scope.config = config;

	$scope.disableDelete = true;

	var lastModifiedSyllabus;
	var lastModifiedSyllabusBeforeUpdate;
	var objManagement = this;

	$scope.userSections = UserService.getProfile().sectionWrite;
	$scope.allSections = UserService.getProfile().sections;
}]);
