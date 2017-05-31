tenjinApp.service('DataService', ['$q', '$http', 'config', function($q, $http, config) {
	'use strict';

	this.load = function() {
		var ret = $q.defer();

		$http.get('v1/data.json').success(function(data) {
			config.documentTypes = data.documentTypes;
			config.citationTypes = data.citationTypes;
			config.hyperlinkTypes = data.hyperlinkTypes;
			config.contactInfoTitles = data.contactInfoTitles;

			/*for(var key in data.strings) {
				$translate.translations(key, data.strings[key]);
			}*/

			ret.resolve();
		}).catch(function (e) {
			ret.reject(e);
		});

		return ret.promise;
	};
}]);
