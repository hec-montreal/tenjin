tenjinApp.service('TenjinService', ['$q', '$state', 'UserService', 'SyllabusService', 'ResourcesService', 'SakaiToolsService', 'CitationsService', 'ResponsiveService', function($q, $state, UserService, SyllabusService, ResourcesService, SakaiToolsService, CitationsService, ResponsiveService) {
	'use strict';

	var loadCitations = function(data, citationsLists) {
		var def = $q.defer();
		var citationsLists = CitationsService.loadCitationLists(ResourcesService.resources);

		$q.allSettled(citationsLists.promises).then(function(data) {
			var updatedResource, updatedResourceId;

			for (var i = 0; i < data.length; i++) {
				if (data[i].state === 'fulfilled') {
					updatedResourceId = citationsLists.resourceIds[i];
					updatedResource = ResourcesService.getResource(updatedResourceId);

					updatedResource.resourceChildren = CitationsService.updateJsonProperties(updatedResourceId, data[i].value.citations);
				}
			}

			def.resolve();
		});

		return def.promise;
	};

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
			loadViewData: function(siteId) {
				var def = $q.defer();
				var dataToLoad = [];

				// First batch of data to load
				dataToLoad.push(SyllabusService.loadTemplate());
				dataToLoad.push(ResourcesService.loadResources(siteId));
				dataToLoad.push(SakaiToolsService.loadToolEntities(siteId));
				dataToLoad.push(SyllabusService.loadSyllabusList());

				$q.allSettled(dataToLoad).then(function() {
					// Finally load the citations
					loadCitations().then(function() {
						def.resolve();
					});
				});

				return def.promise;
			},

			loadSyllabus: function(ctx) {
				var def = $q.defer();

				SyllabusService.loadSyllabus(ctx.syllabusId).then(function() {
					def.resolve();
				});

				return def.promise;
			},

			getHomeRoute: function() {
				if (SyllabusService.getSyllabusList().length > 1) {
					return makeRoute('management');
				} else {
					return makeRoute('syllabus-edit', {
						'id': SyllabusService.getSyllabusList()[0].id
					});
				}
			}
		},

		published: {
			loadViewData: function(siteId) {
				var def = $q.defer();
				var dataToLoad = [];

				// First batch of data to load
				dataToLoad.push(SyllabusService.loadTemplate());
				dataToLoad.push(ResourcesService.loadResources(siteId));
				dataToLoad.push(SakaiToolsService.loadToolEntities(siteId));

				$q.allSettled(dataToLoad).then(function() {
					// Finally load the citations
					loadCitations().then(function() {
						def.resolve();
					});
				});

				return def.promise;
			},

			loadSyllabus: function(ctx) {
				var def = $q.defer();

				SyllabusService.loadPublishedSyllabus().then(function() {
					def.resolve();
				});

				return def.promise;
			},

			getHomeRoute: function() {
				return makeRoute('syllabus-published');
			}
		}
	};

	this.viewState = null;

	this.showMobileMenu = false;

	this.loadData = function() {
		var tthis = this;
		var def = $q.defer();

		// We must load the profile before loading anything else
		UserService.loadProfile().then(function() {
			var siteId = UserService.getProfile().site.courseId;

			tthis.viewState = tthis.findViewStateFromProfile(UserService.getProfile());

			tthis.viewState.loadViewData(siteId).then(function() {
				def.resolve();
			}).catch(function(e) {
				def.reject(e);
			});
		}).catch(function(e) {
			def.reject(e);
		});

		return def.promise;
	};

	this.dispatchUser = function() {
		var route = this.viewState.getHomeRoute();

		$state.go(route['route'], route['params']);
	};

	this.setupMobileMenu = function() {
		var device = ResponsiveService.getDevice(0);

		this.showMobileMenu = (device === 'mobile');
	};

	this.findViewStateFromProfile = function(profile) {
		if (profile.site.permissions.write === true) {
			return this.ViewStates.edition;
		}

		return this.ViewStates.published;
	};

	window.UserService = UserService;
	window.SyllabusService = SyllabusService;
}]);
