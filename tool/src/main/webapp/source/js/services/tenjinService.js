tenjinApp.service('TenjinService', ['$q', '$state', 'UserService', 'SyllabusService', 'ResourcesService', 'SakaiToolsService', 'CitationsService', 'ResponsiveService', function($q, $state, UserService, SyllabusService, ResourcesService, SakaiToolsService, CitationsService, ResponsiveService) {
	'use strict';

	this.showMobileMenu = false;

	this.loadBaseData = function() {
		var def = $q.defer();

		// We must load the profile before loading anything else
		UserService.loadProfile().then(function() {
			var siteId = UserService.getProfile().site.courseId;
			var dataToLoad = [];

			dataToLoad.push(SyllabusService.loadTemplate());
			dataToLoad.push(ResourcesService.loadResources(siteId));
			dataToLoad.push(SakaiToolsService.loadToolEntities(siteId));
			dataToLoad.push(SyllabusService.loadSyllabusList());

			$q.allSettled(dataToLoad).then(function() {
				// Finally load the citations
				var citationsLists = CitationsService.getCitationLists(ResourcesService.resources);

				$q.allSettled(citationsLists.promises).then(function(data) {
					var updatedResource, updatedResourceId;

					for (var i = 0; i < data.length; i++) {
						if (data[i].state === "fulfilled") {
							updatedResourceId = citationsLists.resourceIds[i];
							updatedResource = ResourcesService.getResource(updatedResourceId);

							updatedResource.resourceChildren = CitationsService.updateJsonProperties(updatedResourceId, data[i].value.citations);
						}
					}

					// Everything is loaded
					def.resolve();
					
				}).catch(function(e) {
					def.reject(e);
				});
			}).catch(function(e) {
				def.reject(e);
			});
		}).catch(function(e) {
			def.reject(e);
		});

		return def.promise;
	};

	this.dispatchUser = function() {
		var route;

		if (SyllabusService.getSyllabusList().length === 1) {
			route = this.makeRoute('syllabus', {
				'id': SyllabusService.getSyllabusList()[0].id
			});
		} else {
			route = this.makeRoute('management');
		}

		$state.go(route['route'], route['params']);
	};

	this.makeRoute = function(route, params) {
		var ret = {
			'route': route
		};

		if (params) {
			ret['params'] = params;
		}

		return ret;
	};

	this.setupMobileMenu = function() {
		var device = ResponsiveService.getDevice(0);

		this.showMobileMenu = (device === 'mobile');
	};

	window.UserService = UserService;
	window.SyllabusService = SyllabusService;
}]);
