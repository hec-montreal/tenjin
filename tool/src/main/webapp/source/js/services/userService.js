tenjinApp.service('UserService', ['$q', '$http', 'config', function($q, $http, config) {
	'use strict';

	/**
	 * Load and set the current user profile
	 * @return The async promise
	 */
	this.loadProfile = function() {
		var tthis = this;
		var ret = $q.defer();

		$http.get('v1/userProfile.json').success(function (data) {
			tthis.profile = data;

			ret.resolve(data);
		}).error(function (data) {
			ret.reject(data);
		});

		return ret.promise;
	};

	/**
	* Permissions used to access content
	*/
	this.isAllowed = function(view, syllabus){
		if ('sectionAssign' === view){
			return this.profile.sections.filter(function($syllabus){
				return $syllabus.id === syllabus.id;}).length > 0;
		} 
		if ('syllabusRead' === view){
			return this.profile.syllabusRead.filter(
				function(syllabusId){ 
					return syllabusId ===syllabus.id;}).length > 0;
		}
		//Write syllabus
		if ('syllabusWrite' === view){
			return this.profile.syllabusWrite.filter(
				function(syllabusId){ 
					return syllabusId ===syllabus.id;}).length > 0;
		}
		//Publish syllabus
		if ('syllabusPublish' === view){
			return this.profile.syllabusPublish.filter(
				function(syllabusId){ 
					return syllabusId ===syllabus.id;}).length > 0;
		}
	};

	/**
	* Permissions used to access views
	*/
	this.isAllowedView = function(view){
		if ('management' === view){
			return this.profile.managerView;
		}
		if ('import' === view){
			return this.profile.activateImportButton;
		}
		if ('sectionAssign' === view){
			return this.profile.sectionAssign.length > 0; 
		} 
		if ('syllabusRead' === view){
			return this.profile.syllabusRead.length > 0;
		}
		if ('syllabusWrite' === view){
			return this.profile.syllabusWrite.length > 0;
		}
		if ('permissions' === view){
			return this.profile.canModifyPermissions;
		}

	};

	this.canEditElement= function(element, syllabus){
		if (element.providerId != null) {
			return false;
		}
		if (element.common === syllabus.common) {
			return this.isAllowed('syllabusWrite', syllabus);
		}
	
        return false;
	};

	/**
	 * Get the user profile
	 * @return The user profile
	 */
	this.getProfile = function() {
		return this.profile;
	};


	this.getSection = function (sectionId){
		for(var i = 0; i < this.profile.sectionAssign.length; i++) {
			if(this.profile.sectionAssign[i].id === sectionId) {
				return this.profile.sectionAssign[i];
			}
		}

		return null;
	};

	//If it is in the table will always return 1
	this.getSectionTitle = function (sectionId){
		var filteredSection;
		filteredSection =  this.profile.sections.filter(function($section){
			return $section.id === sectionId;
		});

		if (filteredSection.length ===1){
			return filteredSection[0].name;
		}
		return '';
	};

	this.getResourcesToolId = function() {
	    return this.profile.resourcesToolId;
	};

}]);
