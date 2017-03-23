tenjinApp.controller('ManagementCtrl', ['$scope', '$rootScope', '$timeout', '$translate', 'SyllabusService', 'SyllabusLockService', 'AlertService', 'ModalService', 'UserService', 'ResourcesService', 'CitationsService', 'config', '$q', function($scope, $rootScope, $timeout, $translate, SyllabusService, SyllabusLockService, AlertService, ModalService, UserService, ResourcesService, CitationsService, config, $q) {
	'use strict';

	var refresh = function(refreshResources) {
		var ret = $q.defer();

		UserService.loadProfile().then(function() {
			SyllabusService.loadSyllabusList().then(function() {
				$scope.checkStatus();

				ret.resolve();
			}).catch(function() {
				AlertService.showAlert("cannotLoadBaseData");

				ret.reject();
			});
		}).catch(function() {
			AlertService.showAlert("cannotLoadBaseData");

			ret.reject();
		});
		
		if (refreshResources === true) {
			ResourcesService.loadResources(UserService.getProfile().siteId).then(function() {
				CitationsService.loadCitations().then(function() {
					ret.resolve();
				}).catch(function() {
					ret.reject();
				});
			}).catch(function(e) {
				ret.reject(e);
			});
		}

		return ret.promise;
	};

	var createSyllabus = function(chosenSections) {
		SyllabusService.save(newSyllabus).then(function(data) {
			SyllabusService.syllabusList.push(data);

			syllabusAdded = data;
		}).catch(function(e) {
			AlertService.showSyllabusSaveAlert(e);
		});
	};

	SyllabusLockService.stopRenewLoop();

	AlertService.reset();

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
			}).catch(function(e) {
				AlertService.showSyllabusSaveAlert(e);
			});
		});
	};

	$scope.deleteSyllabus = function() {
		var syllabusList = [];

		for (var i = 0; i < SyllabusService.syllabusList.length; i++) {
			if (SyllabusService.syllabusList[i].checked) {
				syllabusList.push(SyllabusService.syllabusList[i]);
			}
		}

		ModalService.deleteSyllabus(syllabusList).result.then(function(syllabusToDelete) {
			SyllabusService.deleteSyllabusList(syllabusToDelete).catch(function(data) {
				AlertService.showAlert('cannotDeleteSyllabusList');
			}).finally(function() {
				$scope.refresh();
			});
		});
	};

	$scope.copySyllabus = function() {
		var syllabus = null;

		for (var i = 0; i < SyllabusService.syllabusList.length; i++) {
			if (SyllabusService.syllabusList[i].checked) {
				syllabus = SyllabusService.syllabusList[i];

				break;
			}
		}

		if (syllabus === null) {
			return;
		}

		ModalService.copySyllabus(syllabus);
	};

	$scope.externalSyllabusImport = function() {
		ModalService.externalSyllabusImport();
	};

	$scope.checkStatus = function() {
		$scope.disableDelete = true;
		$scope.disableCopy = true;

		var checkCount = 0;
		var isCommonChecked = false;

		// if a syllabus is checked then the delete button should be enabled
		for (var i = 0; i < $scope.syllabusService.syllabusList.length; i++) {
			if ($scope.syllabusService.syllabusList[i].checked) {
				checkCount++;

				if ($scope.syllabusService.syllabusList[i].common) {
					isCommonChecked = true;
				}

				$scope.disableDelete = false;
			}
		}

		if (checkCount === 1 && !isCommonChecked) {
			$scope.disableCopy = false;
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

		SyllabusLockService.lockSyllabus(syllabus.id).then(function() {
			SyllabusService.save(syllabus).then(function() {
				ret.resolve();

				refresh();
			}).catch(function(e) {
				AlertService.showSyllabusSaveAlert(e);

				ret.reject();
			});
		}).catch(function(e) {
			AlertService.showSyllabusSaveAlert(e);

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

			SyllabusLockService.lockSyllabus(lastModifiedSyllabus.id).then(function() {
				SyllabusService.save(lastModifiedSyllabus).then(function() {
					ret.resolve();

					refresh();
				}).catch(function(e) {
					AlertService.showSyllabusSaveAlert(e);

					ret.reject();
				});
			}).catch(function(e) {
				AlertService.showSyllabusSaveAlert(e);

				ret.reject();
			});

			return ret.promise;
		};

		if (warn) {
			// Create modal
			var modal = ModalService.unassignSections(data);

			// Processing result
			modal.result.then(function() {
				return doUpdate();
			}, function() {
				syllabus.sections = initialSections;
			});
		} else {
			return doUpdate();
		}
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

	$scope.$on('copy', function(e, data) {
		SyllabusService.copy(data.data.syllabusId, data.data.name).then(function() {
			refresh().then(function() {
				$rootScope.$broadcast('copied');
			})
		});
	});

	// Should maybe move these calls to the modals?
	$scope.$on('import', function(e, data) {
		SyllabusService.importSyllabusFromSite(data.data.siteId).then(function() {
			refresh(true);
		}).catch(function(status) {
			if (status === 404) {
				AlertService.showAlert('importSyllabusNotFound');
			} else if (status === 403) {
				AlertService.showAlert('importSyllabusPermissionError');
			} else if (status === 503) {
				AlertService.showAlert('importServiceUndefined');
			} else {
				AlertService.showAlert('importSyllabusError');
			}
		}).finally(function() {
			$rootScope.$broadcast('imported');
		});
	});

	$scope.syllabusService = SyllabusService;
	$scope.alertService = AlertService;
	$scope.userService = UserService;
	$scope.config = config;

	$scope.disableDelete = true;
	$scope.disableCopy = true;

	var lastModifiedSyllabus;
	var lastModifiedSyllabusBeforeUpdate;
	var objManagement = this;

	$scope.userSections = UserService.getProfile().sectionAssign;
	$scope.allSections = UserService.getProfile().sections;
}]);
