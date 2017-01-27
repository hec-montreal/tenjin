tenjinApp.controller('SyllabusCtrl', ['$rootScope', '$scope', '$timeout', '$q', '$state', 'SyllabusService', 'TreeService', 'ResourcesService', 'CitationsService', 'SakaiToolsService', 'UserService', 'PublishService', 'TenjinService', 'config', 'AlertService', 'ModalService', function($rootScope, $scope, $timeout, $q, $state, SyllabusService, TreeService, ResourcesService, CitationsService, SakaiToolsService, UserService, PublishService, TenjinService, config, AlertService, ModalService) {
	'use strict';

	$scope.syllabusService = SyllabusService;
	$scope.resourcesService = ResourcesService;
	$scope.userService = UserService;
	$scope.config = config;
	$scope.showNavigation = true;

	// Load syllabus
	var loadSyllabus = function(syllabusId) {
		var ret = $q.defer();

		TenjinService.viewState.loadSyllabus({
			syllabusId: syllabusId
		}).then(function() {
			$scope.syllabusLoaded = true;

			// Set selected item
			if (SyllabusService.syllabus.elements.length > 0) {
				TreeService.setSelectedItem(SyllabusService.syllabus.elements[0], true);
			}

			ret.resolve();
		}).catch(function() {
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

	$scope.$on('navigationToggled', function() {
		$scope.toggleNavigation();
	});

	$scope.$on('publish', function() {
		PublishService.publish().then(function(data) {
			SyllabusService.reloadSyllabus().then(function() {
				TreeService.setSelectedItem(SyllabusService.syllabus.elements[0], true);

				$rootScope.$broadcast('published', {
					data: data
				});
			});
		}).catch(function(data) {
			AlertService.showAlert('cannotPublishSyllabus');
		});
	});

	$scope.showGlobalLoading();

	loadSyllabus($state.params.id || -1).finally(function() {
		$scope.hideGlobalLoading();
	});
}]);
