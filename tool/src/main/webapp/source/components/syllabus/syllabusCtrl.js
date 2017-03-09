tenjinApp.controller('SyllabusCtrl', ['$rootScope', '$scope', '$timeout', '$q', '$state', 'SyllabusService', 'SyllabusLockService', 'TreeService', 'ResourcesService', 'CitationsService', 'SakaiToolsService', 'UserService', 'PublishService', 'TenjinService', 'config', 'AlertService', 'ModalService', function($rootScope, $scope, $timeout, $q, $state, SyllabusService, SyllabusLockService, TreeService, ResourcesService, CitationsService, SakaiToolsService, UserService, PublishService, TenjinService, config, AlertService, ModalService) {
	'use strict';

	$scope.syllabusService = SyllabusService;
	$scope.syllabusLockService = SyllabusLockService;
	$scope.resourcesService = ResourcesService;
	$scope.userService = UserService;
	$scope.config = config;
	$scope.showNavigation = true;
	$scope.alertService = AlertService;

	// Load syllabus
	var loadSyllabus = function(syllabusId) {
		var ret = $q.defer();

		AlertService.reset();

		TenjinService.viewState.loadSyllabus({
			syllabusId: syllabusId
		}).then(function() {
			$scope.syllabusLoaded = true;

			ret.resolve();
		}).catch(function(e) {
			$scope.syllabusLoaded = false;

			AlertService.showSyllabusLoadAlert(e);

			ret.reject();
		});

		return ret.promise;
	};

	$scope.selectSyllabus = function(syllabus) {
		$state.go(TenjinService.viewState.stateName, {
			id: syllabus.id,
			elementId: undefined
		});
	};

	$scope.toggleNavigation = function() {
		$scope.showNavigation = !$scope.showNavigation;
	};

	$scope.save = function() {
		SyllabusService.saveCurrent().catch(function(e) {
			AlertService.showSyllabusSaveAlert(e);
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
				TreeService.selectElement(TreeService.findElementByPosition(TreeService.lastSelectedPosition));

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

		if ($state.params.elementId && $state.params.elementId.length > 0) {
			TreeService.selectElementById(parseInt($state.params.elementId, 10));
		} else {
			TreeService.selectElement(TreeService.findElementByPosition([0]));
		}
	});
}]);
