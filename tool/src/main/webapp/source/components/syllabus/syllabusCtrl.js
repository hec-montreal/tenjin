﻿tenjinApp.controller('SyllabusCtrl', ['$rootScope', '$scope', '$timeout', '$q', '$state', 'SyllabusService', 'SyllabusLockService', 'TreeService', 'ResourcesService', 'CitationsService', 'SakaiToolsService', 'UserService', 'PublishService', 'TenjinService', 'config', 'AlertService', 'ModalService', function($rootScope, $scope, $timeout, $q, $state, SyllabusService, SyllabusLockService, TreeService, ResourcesService, CitationsService, SakaiToolsService, UserService, PublishService, TenjinService, config, AlertService, ModalService) {
	'use strict';

	$scope.syllabusService = SyllabusService;
	$scope.resourcesService = ResourcesService;
	$scope.userService = UserService;
	$scope.config = config;
	$scope.showNavigation = true;
	$scope.alertService = AlertService;

	// Load syllabus
	var loadSyllabus = function(syllabusId) {
		var ret = $q.defer();

		AlertService.reset();

		SyllabusLockService.lockSyllabus(syllabusId).then(function() {
			SyllabusLockService.startRenewLoop(syllabusId);
		}).catch(function(e) {
			e = e.data;

			if (e && e.lock) {
				AlertService.showAlert('syllabusLocked', [e.lock.createdByName]);
			} else if (e && e.locked) {
				AlertService.showAlert('noSyllabusLock');
			} else {
				AlertService.showAlert('cannotSaveSyllabus');
			}

			ret.reject();
		}).finally(function() {
			TenjinService.viewState.loadSyllabus({
				syllabusId: syllabusId
			}).then(function() {
				$scope.syllabusLoaded = true;

				TreeService.selectElement(TreeService.findElementByPosition([0]));

				ret.resolve();
			}).catch(function() {
				$scope.syllabusLoaded = false;

				AlertService.showAlert('noSyllabus');

				ret.reject();
			});
		});

		return ret.promise;
	};

	$scope.selectSyllabus = function(syllabus) {
		$scope.showGlobalLoading();

		loadSyllabus(syllabus.id).finally(function() {
			$scope.hideGlobalLoading();
		});
	};

	$scope.toggleNavigation = function() {
		$scope.showNavigation = !$scope.showNavigation;
	};

	$scope.save = function() {
		SyllabusService.saveCurrent().catch(function() {
			AlertService.showAlert('cannotSaveSyllabus');
		});
	};

	$scope.startPublish = function() {
		ModalService.prePublishSyllabus();
	};

	$scope.$watch('syllabusService.syllabus', function(newValue, oldValue) {
		var syllabusSaved = SyllabusService.getSyllabusSaved();

		if (syllabusSaved) {
			if (angular.equals(newValue, syllabusSaved)) {
				SyllabusService.setDirty(false);
			} else {
				SyllabusService.setDirty(true);
			}
		}
	}, true);

	$scope.$on('navigationToggled', function() {
		$scope.toggleNavigation();
	});

	$scope.$on('publish', function() {
		PublishService.publish().then(function(data) {
			SyllabusService.reloadSyllabus().then(function() {
				TreeService.selectElement(SyllabusService.syllabus.elements[0]);

				// Refresh management ui
				UserService.loadProfile().then(function() {
					SyllabusService.loadSyllabusList().catch(function() {
						AlertService.showAlert("cannotLoadBaseData");
					});
				}).catch(function() {
					AlertService.showAlert("cannotLoadBaseData");
				});

				$rootScope.$broadcast('published', {
					data: data
				});
			});
		}).catch(function(data) {
			AlertService.showAlert('cannotPublishSyllabus');

			$rootScope.$broadcast('cannotPublishSyllabus');
		});
	});

	$scope.showGlobalLoading();

	loadSyllabus($state.params.id || -1).finally(function() {
		$scope.hideGlobalLoading();
	});
}]);
