tenjinApp.service('TenjinService', ['$q', 'config', '$state', 'UserService', 'SyllabusService', 'ResourcesService', 'SakaiToolsService', 'CitationsService', 'PublishService', function($q, config, $state, UserService, SyllabusService, ResourcesService, SakaiToolsService, CitationsService, PublishService) {
	'use strict';

	var loadCitations = function(data, citationsLists) {
		var ret = $q.defer();
		var citationsLists = CitationsService.loadCitationLists(ResourcesService.resources);

		$q.all(citationsLists.promises).then(function(data) {
			var updatedResource, updatedResourceId;

			for (var i = 0; i < data.length; i++) {
				if (data[i].state === 'fulfilled') {
					updatedResourceId = citationsLists.resourceIds[i];
					updatedResource = ResourcesService.getResource(updatedResourceId);

					updatedResource.resourceChildren = CitationsService.updateJsonProperties(updatedResourceId, data[i].value.citations);
				}
			}

			ret.resolve();
		}).catch(function() {
			ret.reject();
		});

		return ret.promise;
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
				var ret = $q.defer();
				var dataToLoad = [];

				// First batch of data to load
				dataToLoad.push(SyllabusService.loadTemplate());
				dataToLoad.push(ResourcesService.loadResources(siteId));
				dataToLoad.push(SakaiToolsService.loadToolEntities(siteId));
				dataToLoad.push(SyllabusService.loadSyllabusList());

				$q.all(dataToLoad).then(function() {
					// Finally load the citations
					loadCitations().then(function() {
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

				if (UserService.getProfile().syllabusWrite.indexOf(parseInt(ctx.syllabusId)) > -1) {
					SyllabusService.loadSyllabus(ctx.syllabusId).then(function() {
						ret.resolve();
					}).catch(function(e) {
						ret.reject(e);
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

		published: {
			loadViewData: function(siteId) {
				var ret = $q.defer();
				var dataToLoad = [];

				// First batch of data to load
				dataToLoad.push(SyllabusService.loadTemplate());
				dataToLoad.push(ResourcesService.loadResources(siteId));
				dataToLoad.push(SakaiToolsService.loadToolEntities(siteId));

				$q.allSettled(dataToLoad).then(function() {
					// Finally load the citations
					loadCitations().then(function() {
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

				SyllabusService.loadPublishedSyllabus().then(function() {
					ret.resolve();
				}).catch(function(e) {
					ret.reject(e);
				});

				return ret.promise;
			},

			getHomeRoute: function() {
				return makeRoute('syllabus-published');
			}
		}
	};

	this.viewState = null;

	this.loadData = function() {
		var tthis = this;
		var ret = $q.defer();

		// We must load the profile before loading anything else
		UserService.loadProfile().then(function() {
			var siteId = UserService.getProfile().siteId;

			tthis.viewState = tthis.findViewStateFromProfile();

			tthis.viewState.loadViewData(siteId).then(function() {
				ret.resolve();
			}).catch(function(e) {
				ret.reject(e);
			});
		}).catch(function(e) {
			ret.reject(e);
		});

		return ret.promise;
	};

	this.dispatchUser = function() {
		var route = this.viewState.getHomeRoute();

		$state.go(route['route'], route['params']);
	};

	this.findViewStateFromProfile = function() {
		if (UserService.isAllowedView(config.userProfileViews[1])) {
			return this.ViewStates.edition;
		}

		return this.ViewStates.published;
	};

	window.UserService = UserService;
	window.SyllabusService = SyllabusService;
}]);
