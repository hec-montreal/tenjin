tenjinApp.service('UserService', ['$q', '$http', function($q, $http) {
	'use strict';

	/**
	 * Load and set the current user profile
	 * @return The async promise
	 */
	this.loadProfile = function() {
		var tthis = this;
		var def = $q.defer();

		$http({
			method: 'get',
			url: 'v1/user.json'
		}).then(function(response) {
			tthis.profile = response.data;

			def.resolve(tthis.profile);
		}, function(reason) {
			def.reject(reason);
		});

		return def.promise;
	};

	/**
	 * Get the user profile
	 * @return The user profile
	 */
	this.getProfile = function() {
		return this.profile;
	};

	/**
	 * Get sections with write permissions
	 * @return {Object} Sections object 
	 */
	this.getSectionsWrite = function(profile) {
		var p = !profile ? this.profile : profile;

		if (!p) {
			return [];
		}

		return p.sections.filter(function($section) {
			return $section.permissions.write === true;
		});
	};

	/* Get the sections with publish permission
	 * @return {Object} Sections object
	 **/
	this.getSectionsPublish = function() {
		return this.profile.sections.filter(function($section) {
			return $section.permissions.publish === true;
		});
	};

	/**
	 * Check if atleast one section of the current user profile has a write permission to true
	 * @return {Boolean} True if atleast one section has write permission
	 */
	this.hasWritableSection = function() {
		return this.getSectionsWrite().length > 0;
	};
}]);
