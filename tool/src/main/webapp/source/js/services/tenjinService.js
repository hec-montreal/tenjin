tenjinApp.service("TenjinService", ["$q", "$state", "UserService", "SyllabusService", function($q, $state, UserService, SyllabusService) {
	"use strict";

	this.loadBaseData = function() {
		var def = $q.defer();

		// We must load the profile before loading the syllabus list
		UserService.loadProfile().then(function() {
			SyllabusService.loadSyllabusList().then(function() {
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

	window.UserService = UserService;
	window.SyllabusService = SyllabusService;
}]);
