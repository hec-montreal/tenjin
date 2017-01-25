tenjinApp.controller('ManagementCtrl', ['$scope', '$timeout', '$translate', 'SyllabusService', 'AlertService', 'ModalService', 'UserService', 'config', function($scope,$timeout, $translate, SyllabusService, AlertService, ModalService, UserService, config) {
	'use strict';

	

	$scope.addSyllabus = function() {
				// Get sections and label
				var data = {};

				// Create modal
				var modal = ModalService.createSyllabus(data);

				// Processing result
				modal.result.then(function($syllabus) {
					// update syllabus list with last modified syllabus as param 
					updateSyllabusList($syllabus);
				}, function() {
					// alert add syllabus ko
					AlertService.display('danger');
				});
			};

	$scope.deleteSyllabus = function() {
				var syllabusList = [];

		for (var i = 0; i < $scope.syllabusService.syllabusList.length; i++) {
			if ($scope.syllabusService.syllabusList[i].checked === true) {
				syllabusList.push($scope.syllabusService.syllabusList[i]);
					}
				}

				// Create modal
				var modal = ModalService.deleteSyllabus(syllabusList);

				// Processing result
				modal.result.then(function(selectedItem) {

				}, function() {

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

	$scope.updateTitle = function($data, $syllabus) {
				if ($data.length === 0) {
					return $translate.instant("MANAGEMENT_ERREUR_NAME");
				}
				$syllabus.title = $data;
				return SyllabusService.save($syllabus).$promise;
			};

	$scope.updateSections = function($data, $syllabus) {
				var warn = false;
				var initialSections = $syllabus.sections;

				console.log("1");
				console.log("$data: ");
				console.log($data);
				console.log("$syllabus.sections");
				console.log($syllabus.sections);

				for (var i = 0; i < $syllabus.sections.length; i++) {
					var isIn = false;

					for (var j = 0; j < $data.length; j++) {
						if ($data[j] === $syllabus.sections[i]) {
							isIn = true;
							break;
						}
					}

					if (!isIn) {
						warn = true;

						break;
					}
				}

				var doUpdate = function () {
					// keep a reference on the old sections
					lastModifiedSyllabusBeforeUpdate = angular.copy($syllabus);
					// keep a reference to the last modified syllabus (to update sections of other syllabus)
					lastModifiedSyllabus = angular.copy($syllabus);
					// assign sections
					lastModifiedSyllabus.sections = $data;

		return SyllabusService.save(lastModifiedSyllabus).$promise;
	};

				if (warn) {
					// Create modal
					var modal = ModalService.unassignSections($data);

					// Processing result
					modal.result.then(function(selectedItem) {
						return doUpdate();
					}, function() {
						$syllabus.sections = initialSections;
					});					
				} else {
					return doUpdate();
				}
			};

			var updateSyllabusList = function($syllabusModified, $oldSyllabus) {
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
			};

	$scope.updateSyllabusList = function($syllabus) {
				// update syllabus
				$syllabus = angular.copy(lastModifiedSyllabus);

				// update syllabus list with last modified syllabus as param 
				updateSyllabusList(lastModifiedSyllabus, lastModifiedSyllabusBeforeUpdate);
				// reset tmp variables
				lastModifiedSyllabus = null;
				lastModifiedSyllabusBeforeUpdate = null;
			};

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

	$scope.infos = {};
	$scope.disableDelete = true;

	var lastModifiedSyllabus;
	var lastModifiedSyllabusBeforeUpdate;
	var objManagement = this;

	$scope.userSections = UserService.getProfile().sectionWrite; // user sections with write permissions
	$scope.allSections = UserService.getProfile().sections; // all sections

	

	// TODO: move to routing
	// $scope.loadSyllabusList = function() {
	// 	this.syllabusService.loadSyllabusList().then(function() {
	
	// 	});
	// };

	// $scope.loadSyllabusList();
	
	
}]);
