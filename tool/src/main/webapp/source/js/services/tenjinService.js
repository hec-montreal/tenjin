tenjinApp.service('TenjinService', ['$q', '$translate', 'tmhDynamicLocale', 'config', '$state', 'UserService', 'DataService', 'SyllabusService', 'SyllabusLockService', 'ResourcesService', 'SakaiToolsService', 'CitationsService', 'PublishService', 'AlertService', function($q, $translate, tmhDynamicLocale, config, $state, UserService, DataService, SyllabusService, SyllabusLockService, ResourcesService, SakaiToolsService, CitationsService, PublishService, AlertService) {
	'use strict';

	var makeRoute = function(route, params) {
		var ret = {
			'route': route
		};

		if (params) {
			ret['params'] = params;
		}

		return ret;
	};

	this.ViewStates = {
		edition: {
			stateName: 'syllabus-edit',

			loadViewData: function(siteId) {
				var ret = $q.defer();
				var dataToLoad = [];

				// First batch of data to load
				dataToLoad.push(ResourcesService.loadResources(siteId));
				dataToLoad.push(SakaiToolsService.loadToolEntities(siteId));
				dataToLoad.push(SyllabusService.loadSyllabusList());

				$q.all(dataToLoad).then(function() {
					// Finally load the citations
					CitationsService.loadCitations().then(function() {
						ret.resolve();
					}).catch(function(e) {
						ret.reject(e);
					});

					SyllabusService.loadTemplate().then(function() {
						ret.resolve();
					}).catch(function() {
						ret.reject();
					});
				}).catch(function(e) {
					ret.reject(e);
				});

				return ret.promise;
			},

			loadSyllabus: function(ctx) {
				var ret = $q.defer();

				SyllabusLockService.stopRenewLoop();

				if (UserService.getProfile().syllabusWrite.indexOf(parseInt(ctx.syllabusId)) > -1) {
					SyllabusLockService.lockError = false;

					SyllabusLockService.lockSyllabus(ctx.syllabusId).catch(function(e) {
						AlertService.showSyllabusLoadAlert(e);

						SyllabusLockService.lockError = true;
					}).finally(function() {
						SyllabusService.loadSyllabus(ctx.syllabusId).then(function() {
							if (!SyllabusLockService.lockError) {
								SyllabusLockService.startRenewLoop(ctx.syllabusId);
							}

							ret.resolve();
						}).catch(function(e) {
							ret.reject(e);
						});
					});
				}
				else if (UserService.getProfile().syllabusReadUnpublished.indexOf(parseInt(ctx.syllabusId)) > -1) {
					SyllabusService.loadSyllabus(ctx.syllabusId).then(function() {
						ret.resolve();
					}).catch(function(e) {
						ret.reject(e);
					});
				}
				else if (UserService.getProfile().syllabusRead.indexOf(parseInt(ctx.syllabusId)) > -1) {
					SyllabusService.loadPublishedSyllabus(ctx.syllabusId).then(function() {
						ret.resolve();
					}).catch(function(e) {
						ret.reject(e);
					});
				}

				return ret.promise;
			},

			getHomeRoute: function() {
				return makeRoute('management');
			}
		},

		published: {
			stateName: 'syllabus-published',

			loadViewData: function(siteId) {
				var ret = $q.defer();
				var dataToLoad = [];

				// First batch of data to load
				dataToLoad.push(ResourcesService.loadResources(siteId));
				dataToLoad.push(SakaiToolsService.loadToolEntities(siteId));

				$q.all(dataToLoad).then(function() {
					// Finally load the citations
					CitationsService.loadCitations().then(function() {
						ret.resolve();
					}).catch(function(e) {
						ret.reject(e);
					});

					SyllabusService.loadTemplate().then(function() {
						ret.resolve();
					}).catch(function() {
						ret.reject();
					});
				}, function(error) {
				    ret.reject(error);
				}).catch(function(e) {
					ret.reject(e);
				});

				return ret.promise;
			},

			loadSyllabus: function(ctx) {
				var ret = $q.defer();
				var profile = UserService.getProfile();

				var success = function() {
					ret.resolve();
				};

				var fail = function(e) {
					ret.reject(e);
				};

				if (profile.syllabusWrite.length > 0) {
					SyllabusService.loadSyllabus(profile.syllabusWrite[0]).then(success).catch(fail);
				} else if (profile.syllabusReadUnpublished.length > 0) {
					SyllabusService.loadSyllabus(profile.syllabusReadUnpublished[0]).then(success).catch(fail);
				} else if (profile.syllabusRead.length > 0) {
					SyllabusService.loadPublishedSyllabus(profile.syllabusRead[0]).then(success).catch(fail);
				} else {
					return $q.reject();
				}

				return ret.promise;
			},

			getHomeRoute: function() {
				return makeRoute('syllabus-published');
			}
		}
	};

	this.viewState = null;

	this.loadData = function() {
		return this.loadDataForViewState();
	};

	this.loadDataForViewState = function() {
		var tthis = this;
		var ret = $q.defer();

		// Load enumerations
		DataService.load().then(function () {

			// We must load the profile before loading anything else
			return UserService.loadProfile();
		})
		.then(function() {
			// Set locale based on user profile
			var availableLang = $translate.getAvailableLanguageKeys();
			var useLang = 'fr_CA';

			if (availableLang.indexOf(UserService.getProfile().locale) > -1){
				useLang = UserService.getProfile().locale;
			}
			else {
				useLang = UserService.getProfile().defaultLocale;
			}

			tmhDynamicLocale.set(useLang);
			return $translate.use(useLang);
		})
		.then(function() {
		    AlertService.init();
		    tthis.viewState = tthis.findViewStateFromProfile();
		    return tthis.viewState.loadViewData(UserService.getProfile().siteId);
		})
		.then(function() {
		    ret.resolve();
		})
		.catch(function(e) {
			ret.reject(e);
		});

		return ret.promise;
	};

	this.dispatchUser = function() {
		var route = this.viewState.getHomeRoute();

		// when dispatching user to home, send access event to sakai
		SyllabusService.createAccessEvent();

		$state.go(route['route'], route['params']);
	};

	this.findViewStateFromProfile = function() {
		if (UserService.isAllowedView('management')) {
			return this.ViewStates.edition;
		}

		return this.ViewStates.published;
	};
}]);
