tenjinApp.service('PermissionsService', ['$q', '$http', 'config', function($q, $http, config) {
	'use strict';

    this.permissions = null;

	this.load = function() {
		var tthis = this;
		var ret = $q.defer();

		$http.get('v1/siteRealmPermissions.json').success(function(data) {
		    tthis.permissions = data;

			ret.resolve();
		}).catch(function (e) {
			ret.reject(e);
		});

		return ret.promise;
	};

	this.save = function(data) {
		var tthis = this;
		var ret = $q.defer();
		var url = 'v1/siteRealmPermissions.json';

		this.working = true;

		$http.post(url, data).success(function(data) {
			tthis.permissions = data;
			ret.resolve(data);
		}).error(function(data) {
			ret.reject(data);
		}).finally(function() {
			tthis.working = false;
		});

		return ret.promise;
	};
}]);
