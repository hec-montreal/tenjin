﻿tenjinApp.controller('SyllabusCtrl', ['$rootScope', '$scope', '$timeout', '$q', '$state', 'SyllabusService', 'TreeService', 'ResourcesService', 'CitationsService', 'SakaiToolsService', 'UserService', 'PublishService', 'TenjinService', 'config', '$translate', 'AlertService', 'tmhDynamicLocale', 'ModalService', function($rootScope, $scope, $timeout, $q, $state, SyllabusService, TreeService, ResourcesService, CitationsService, SakaiToolsService, UserService, PublishService, TenjinService, config, $translate, AlertService, tmhDynamicLocale, ModalService) {
	'use strict';

	$scope.infos = {};

	$scope.alertService = AlertService;
	$scope.syllabusService = SyllabusService;
	$scope.resourcesService = ResourcesService;
	$scope.userService = UserService;
	$scope.showNavigation = true;
	$scope.errorLoading = false;

	$translate.use('fr');
	tmhDynamicLocale.set('fr');

	$scope.displayButtons = {
		managementButton: function() {
			return $scope.userService.hasWritableSection();
		},

		syllabusDropdown: function() {
			return $scope.userService.hasWritableSection();
		}
	};

	// Load syllabus
	var loadSyllabus = function(syllabusId) {
		var def = $q.defer();

		AlertService.hideAlert();

		TenjinService.viewState.loadSyllabus({
			syllabusId: syllabusId
		}).then(function() {
			$scope.syllabusLoaded = true;

			// Set selected item
			if (SyllabusService.syllabus.elements.length > 0) {
				TreeService.setSelectedItem(SyllabusService.syllabus.elements[0], true);
			}

			def.resolve();

		}, function(e) {
			AlertService.showAlert('cannot-load-syllabus');

			$scope.syllabusLoaded = false;

			def.reject(e);
		});

		return def.promise;
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
		var results = SyllabusService.saveCurrent();

		SyllabusService.setWorking(true);

		var location = TreeService.selectedItem.$location;

		results.$promise.then(function($data) {
			SyllabusService.setSyllabus($data);

			TreeService.setSelectedItemFromLocation(location);
		}, function($error) {
			AlertService.display('danger');
		}).finally(function() {
			SyllabusService.setWorking(false);
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

	$scope.$watch('baseDataLoaded', function() {
		if ($scope.baseDataLoaded) {
			var syllabusId = $state.params.id || -1;

			$scope.showGlobalLoading();

			loadSyllabus(syllabusId).finally(function() {
				$scope.hideGlobalLoading();
			});
		}
	});

	$rootScope.$on('navigationToggled', function() {
		$scope.toggleNavigation();
	});

	$rootScope.$on('publish', function () {
		PublishService.working = true;

		PublishService.publish().then(function (data) {
			PublishService.working = false;

			SyllabusService.reloadSyllabus().then(function () {
				TreeService.setSelectedItem(SyllabusService.syllabus.elements[0], true);
				
				$rootScope.$broadcast('published', {
					data: data
				});
			});
		});
	});
}]);
