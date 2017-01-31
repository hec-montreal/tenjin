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
		if (config.userProfileViews[3] === view){
			return this.profile.sections.filter(function($syllabus){
				return $syllabus.id === syllabus.id;}).length > 0;
		} 
		if (config.userProfileViews[5] === view){
			return this.profile.syllabusRead.filter(
				function(syllabusId){ 
					return syllabusId ===syllabus.id;}).length > 0;
		}
		//Write syllabus
		if (config.userProfileViews[6] === view){
			return this.profile.syllabusWrite.filter(
				function(syllabusId){ 
					return syllabusId ===syllabus.id;}).length > 0;
		}
		//Publish syllabus
		if (config.userProfileViews[7] === view){
			return this.profile.syllabusPublish.filter(
				function(syllabusId){ 
					return syllabusId ===syllabus.id;}).length > 0;
		}
	};

	/**
	* Permissions used to access views
	*/
	this.isAllowedView = function(view){
		if (config.userProfileViews[1] === view){
			return this.profile.managerView;
		}

		if (config.userProfileViews[3] === view){
			return this.profile.sectionWrite.length > 0; 
		} 
		if (config.userProfileViews[5] === view){
			return this.profile.syllabusRead.length > 0;
		}

	};

	this.canEditSyllabusTitle= function(syllabus){
		if(syllabus.common){
			return false;
		}
		
		return this.isAllowed(config.userProfileViews[6], syllabus);
	};

	this.canEditSyllabusSection = function(syllabus){
		return ((!syllabus.common) && (this.isAllowed(config.userProfileViews[6], syllabus)));
	};

	this.canEditSyllabus = function(syllabus){
		return  this.isAllowed(config.userProfileViews[6], syllabus);
	};


	/**
	 * Get the user profile
	 * @return The user profile
	 */
	this.getProfile = function() {
		return this.profile;
	};


	this.getSection = function (sectionId){
		this.profile.sectionWrite.filter(function($section){
			return $section.id === sectionId;
		});
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

}]);
