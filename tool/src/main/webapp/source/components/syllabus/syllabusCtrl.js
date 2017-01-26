tenjinApp.controller('SyllabusCtrl', ['$rootScope', '$scope', '$timeout', '$q', '$state', 'SyllabusService', 'TreeService', 'ResourcesService', 'CitationsService', 'SakaiToolsService', 'UserService', 'PublishService', 'TenjinService', 'config', '$translate', 'AlertService', 'tmhDynamicLocale', 'ModalService', function($rootScope, $scope, $timeout, $q, $state, SyllabusService, TreeService, ResourcesService, CitationsService, SakaiToolsService, UserService, PublishService, TenjinService, config, $translate, AlertService, tmhDynamicLocale, ModalService) {
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

	console.log("Syllabus ctrl");

	// Load syllabus
	var loadSyllabus = function(syllabusId) {
		var ret = $q.defer();

		AlertService.reset();

		TenjinService.viewState.loadSyllabus({
			syllabusId: syllabusId
		}).then(function() {
			console.log("Syllabus loaded");

			$scope.syllabusLoaded = true;

			// Set selected item
			if (SyllabusService.syllabus.elements.length > 0) {
				TreeService.setSelectedItem(SyllabusService.syllabus.elements[0], true);
			}

			ret.resolve();
		}).catch(function () {
			$scope.syllabusLoaded = false;

			AlertService.showAlert('cannotLoadSyllabus');

			ret.reject();
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
		SyllabusService.saveCurrent().then(function(data) {
			SyllabusService.setSyllabus(data);
			TreeService.setSelectedItemFromLocation(location);
		}).catch(function() {
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

	$scope.$on('baseDataLoaded', function() {
		var syllabusId = $state.params.id || -1;

		$scope.showGlobalLoading();

		loadSyllabus(syllabusId).finally(function() {
			$scope.hideGlobalLoading();
		});
	});

	$scope.$on('navigationToggled', function() {
		$scope.toggleNavigation();
	});

	$rootScope.$on('publish', function() {
		PublishService.publish().then(function(data) {
			SyllabusService.reloadSyllabus().then(function() {
				TreeService.setSelectedItem(SyllabusService.syllabus.elements[0], true);

				$rootScope.$broadcast('published', {
					data: data
				});
			});
		});
	});
}]);
