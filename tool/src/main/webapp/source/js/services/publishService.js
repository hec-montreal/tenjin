tenjinApp.service('PublishService', ['UserService', 'SyllabusService', 'ngDialog', '$resource','$translate','$q', '$http',   function(UserService, SyllabusService, ngDialog, $resource, $translate, $q, $http) {
	'use strict';

	var publishSyllabusProvider = $resource('v1/syllabus/:id/publish.json');
    var announcementProviderId = $resource('tools/announcement/:id.json');
 	this.working=false;

	var syllabusService = SyllabusService;
	var position = 0;
	this.working = false;

	
	this.published = false;
	
	this.isCommonSyllabusPublished = function(){
		var common = syllabusService.getCommonSyllabus();
		if (syllabusService.syllabus.common){
			return true;
		}

		if (common.publishedDate){
			return true;
		}
		else{
			return false;
		}
	};

	this.getActiveSyllabus = function(){
		return  syllabusService.syllabus;
	};

	this.publish = function(){
		return publishSyllabusProvider.get({
			id: syllabusService.syllabus.id
		});
	};

	this.publishingDialog = function(){
        ngDialog.openConfirm({ 
	   		template: 'publish/publishing.html',
	   		height: 500,
	   		width: 600,
	   		controller: 'PublishCtrl',
	   		closeByEscape: false,
	   		closeByDocument: false
   	  });

	};

	this.postPublishDialog = function($publishedSyllabus){
        ngDialog.openConfirm({ 
	   		template: 'publish/postPublish.html',
	   		height: 500,
	   		width: 600,
	   		data: {
	   			published: true,
	   			publishedSyllabus: $publishedSyllabus
	   		},
	   		controller: 'PublishCtrl',
	   		closeByEscape: false,
	   		closeByDocument: false
   	  });

	};


	this.prePublishDialog = function($changedPages){
		console.log($changedPages);
        ngDialog.openConfirm({ 
	   		template: 'publish/prePublish.html',
	   		height: 500,
	   		data: {
	   			changedSyllabusPages: $changedPages
	   		},
			width: 600,
	   		controller: 'PublishCtrl',
  	  });

	};

	this.createAnnouncement = function ($title, $message){
  		var announcement= {"title": $title, "message": $message};
  		announcementProviderId.save({
            id: syllabusService.syllabus.siteId}, announcement);
  
	};

	this.getSections = function(){
		var sections = [];
		if (syllabusService.syllabus.common){
			var usedSections = UserService.getSectionsPublish();
			for (var i=0; i < usedSections.length; i++){
				sections[i] = usedSections[i].name;	
			}
			
		}else{	
			sections = syllabusService.syllabus.sections;
		}
  		return sections;
  	};

	this.loadPublishedSyllabus = function() {
		var tthis = this;
		var def = $q.defer();

		$http({
			method: 'GET',
			url: 'v1/syllabus/published.json'
		}).then(function(response) {
			SyllabusService.setSyllabus(response.data);

			def.resolve(SyllabusService.getSyllabus());
		}, function(reason) {
			def.reject(reason);
		});

		return def.promise;
	};

	this.loadPublishedSyllabusList = function() {
		var tthis = this;
		var def = $q.defer();

		$http({
			method: 'GET',
			url: 'v1/syllabus/published.json'
		}).then(function(response) {
			SyllabusService.setSyllabusList(response.data);

			def.resolve(SyllabusService.getSyllabusList());
		}, function(reason) {
			def.reject(reason);
		});

		return def.promise;
	};

	//TODO: correct once we define permissions et logic steps to publish course outline
	this.setSyllabusPublishPermission = function(syllabus) {
		if ((syllabus.$writePermission) && (syllabus.sections.length > 0 || syllabus.common === true)) {
			syllabus.$publishPermission = true;
		}else{
			syllabus.$publishPermission = false;
		}
	};


	this.getModifiedPages = function(){
		var syllabus = syllabusService.syllabus;
  		var changedPages = (syllabus.elements).filter(function changed($element) {
            if (!$element.elements) {
                return $element.lastModifiedDate > syllabus.publishedDate;
            } else {
                return ($element.elements = $element.elements.filter(changed)).length;
            }
        });
        return changedPages;

    };


}
]);
