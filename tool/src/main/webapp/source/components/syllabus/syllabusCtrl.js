﻿tenjinApp.controller('SyllabusCtrl', ['$rootScope', '$scope', '$timeout', '$q', '$state', 'SyllabusService', 'TreeService', 'ResourcesService', 'CitationsService', 'SakaiToolsService', 'UserService', 'TenjinService', 'config', '$translate', 'AlertService', 'tmhDynamicLocale', function($rootScope, $scope, $timeout, $q, $state, SyllabusService, TreeService, ResourcesService, CitationsService, SakaiToolsService, UserService, TenjinService, config, $translate, AlertService, tmhDynamicLocale) {
	'use strict';

	// Load syllabus
	var loadSyllabus = function(syllabusId) {
		var def = $q.defer();

		TenjinService.viewState.loadSyllabus({
			syllabusId: syllabusId
		}).then(function() {
			// Set selected item
			if (SyllabusService.syllabus.elements.length > 0) {
				TreeService.setSelectedItem(SyllabusService.syllabus.elements[0], true);
			}

			def.resolve();
		});

		return def.promise;
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

	$scope.selectSyllabus = function(syllabus) {
		$scope.showGlobalLoading();

		loadSyllabus(syllabus.id).finally(function() {
			$scope.hideGlobalLoading();
		});
	};

	$scope.infos = {};

	$scope.alertService = AlertService;
	$scope.syllabusService = SyllabusService;
	$scope.resourcesService = ResourcesService;
	$scope.userService = UserService;

	$scope.errorLoading = false;

	$translate.use('fr');
	tmhDynamicLocale.set('fr');

	$scope.displayButtons = {
		managementButton: function() {
			return $scope.userService.hasWritableSection();
		},

		syllabusDropdown: function() {
			return $scope.userService.hasWritableSection();
		},

		displayMobileMenu: function() {
			TenjinService.setupMobileMenu();

			return TenjinService.showMobileMenu;
		}
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
}]);
