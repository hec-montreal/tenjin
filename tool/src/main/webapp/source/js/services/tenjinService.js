tenjinApp.service('TenjinService', ['$q', 'config', '$state', 'UserService', 'DataService', 'SyllabusService', 'SyllabusLockService', 'ResourcesService', 'SakaiToolsService', 'CitationsService', 'PublishService', 'AlertService', function($q, config, $state, UserService, DataService, SyllabusService, SyllabusLockService, ResourcesService, SakaiToolsService, CitationsService, PublishService, AlertService) {
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
					}).catch(function() {
						ret.reject();
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
				} else {
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

		editionStudentView: {
			stateName: 'edition-student-view',

			loadViewData: function (siteId) {
				var ret = $q.defer();
				var dataToLoad = [];

				// First batch of data to load
				dataToLoad.push(ResourcesService.loadResources(siteId));
				dataToLoad.push(SakaiToolsService.loadToolEntities(siteId));

				$q.allSettled(dataToLoad).then(function() {
					// Finally load the citations
					CitationsService.loadCitations().then(function() {
						ret.resolve();
					}).catch(function() {
						ret.reject();
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
				var profile = UserService.getProfile();

				var success = function() {
					ret.resolve();
				};

				var fail = function(e) {
					ret.reject(e);
				};

				SyllabusService.loadPublishedSyllabus(ctx.syllabusId).then(success).catch(fail);

				return ret.promise;
			},

			getHomeRoute: function() {
				return makeRoute('');
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

				$q.allSettled(dataToLoad).then(function() {
					// Finally load the citations
					CitationsService.loadCitations().then(function() {
						ret.resolve();
					}).catch(function() {
						ret.reject();
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
				var profile = UserService.getProfile();

				var success = function() {
					ret.resolve();
				};

				var fail = function(e) {
					ret.reject(e);
				};

				if (profile.syllabusWrite.length > 0) {
					SyllabusService.loadSyllabus(profile.syllabusWrite[0]).then(success).catch(fail);
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
		return this.loadDataForViewState(null);
	};

	this.loadDataForViewState = function (viewState) {
		var tthis = this;
		var ret = $q.defer();

		// Load enumerations and strings
		DataService.load().then(function() {
			// We must load the profile before loading anything else
			UserService.loadProfile().then(function() {
				var siteId = UserService.getProfile().siteId;

				if(viewState) {
					tthis.viewState = viewState;
				} else{
					tthis.viewState = tthis.findViewStateFromProfile()
				}

				tthis.viewState.loadViewData(siteId).then(function() {
					ret.resolve();
				}).catch(function(e) {
					ret.reject(e);
				});
			}).catch(function(e) {
				ret.reject(e);
			});
		}).catch(function(e) {
			ret.reject(e);
		})

		return ret.promise;
	};

	this.dispatchUser = function() {
		var route = this.viewState.getHomeRoute();

		$state.go(route['route'], route['params']);
	};

	this.findViewStateFromProfile = function() {
		if (UserService.isAllowedView('management')) {
			return this.ViewStates.edition;
		}

		return this.ViewStates.published;
	};
}]);
