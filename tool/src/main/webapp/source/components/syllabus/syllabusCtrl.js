tenjinApp.controller('SyllabusCtrl', ['$rootScope', '$scope', '$timeout', '$q', '$state', '$translate', 'SyllabusService', 'SyllabusLockService', 'TreeService', 'ResourcesService', 'CitationsService', 'SakaiToolsService', 'UserService', 'PublishService', 'TenjinService', 'config', 'AlertService', 'ModalService', function($rootScope, $scope, $timeout, $q, $state, $translate, SyllabusService, SyllabusLockService, TreeService, ResourcesService, CitationsService, SakaiToolsService, UserService, PublishService, TenjinService, config, AlertService, ModalService) {
	'use strict';

	$scope.syllabusService = SyllabusService;
	$scope.syllabusLockService = SyllabusLockService;
	$scope.resourcesService = ResourcesService;
	$scope.userService = UserService;
	$scope.config = config;
	$scope.showNavigation = true;
	$scope.alertService = AlertService;
	$scope.saving = false;

	$scope.mode = 'edit';

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


	var confirmLeave = function() {
		if (SyllabusService.isDirty()) {
			return confirm($translate.instant('WARNING_UNSAVED'));
		}
		return true;
	}

	$scope.tenjinService = TenjinService;

	$scope.goToManagement = function() {
		if (confirmLeave()) {
			$state.go('management');
		}
	}

	$scope.selectSyllabus = function(syllabus) {
		if (confirmLeave()) {
			$state.go(TenjinService.viewState.stateName, {
				id: syllabus.id,
				elementId: undefined
			});
		}
	};

	$scope.toggleNavigation = function() {
		$scope.showNavigation = !$scope.showNavigation;
	};

	$scope.save = function() {
		$scope.saving = true;
		SyllabusService.saveCurrent().catch(function(e) {
			AlertService.showSyllabusSaveAlert(e);
		}).finally(function() {
			$scope.saving = false;
		});
	};

	$scope.pdf = function(published) {
	    if (published && SyllabusService.getSyllabus().publishedDate === null) {
	        // syllabus must be published
	        return;
	    }

		var post = '';

		if (published) {
			post += '?published=true&locale=';
		} else {
			post += '?locale=';
		}

		post +=  SyllabusService.getSyllabus().locale;

		window.open('v1/syllabus/' + SyllabusService.getSyllabus().id + '/pdf.pdf' + post, '_blank');
	};

	$scope.pdfPublic = function() {
	    if (SyllabusService.getSyllabus().publishedDate === null) {
	        // syllabus must be published
	        return;
	    }

		var post = '?locale=' +  SyllabusService.getSyllabus().locale;

		window.open('v1/syllabus/' + SyllabusService.getSyllabus().id + '/pdf-public.json' + post, '_blank');
	};

	$scope.showEditionView = function() {
		SyllabusService.viewMode = "edit";
	};

	$scope.showStudentView = function() {
		SyllabusService.viewMode = "student";
	};

	$scope.showPublicView = function() {
		SyllabusService.viewMode = "public";
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

	window.onbeforeunload = function() {
		if (SyllabusService.isDirty()) {
			return $translate.instant('WARNING_UNSAVED');
		}
	};

	// remove unsaved warning when leaving tenjin
	$scope.$on('$destroy', function() {
		delete window.onbeforeunload;
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
