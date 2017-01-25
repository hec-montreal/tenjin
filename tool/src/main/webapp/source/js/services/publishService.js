tenjinApp.service('PublishService', ['UserService', 'SyllabusService', 'ngDialog', '$resource', '$translate', '$q', '$http', function(UserService, SyllabusService, ngDialog, $resource, $translate, $q, $http) {
	'use strict';

	var announcementProviderId = $resource('tools/announcement/:id.json');

	this.isCommonSyllabusPublished = function() {
		var common = SyllabusService.getCommonSyllabus();

		return (!!SyllabusService.syllabus.common) || (!!common.publishedDate)
	};

	this.publish = function() {
		var tthis = this;
		var def = $q.defer();

		$http({
			method: 'POST',
			url: 'v1/syllabus/' + SyllabusService.syllabus.id + '/publish.json'
		}).then(function(response) {
			def.resolve(response.data);
		}, function(reason) {
			def.reject(reason);
		});

		return def.promise;
	};

	this.createAnnouncement = function($title, $message) {
		var announcement = {
			"title": $title,
			"message": $message
		};
		announcementProviderId.save({
			id: SyllabusService.syllabus.siteId
		}, announcement);
	};

	this.getSections = function() {
		var sections = [];

		if (SyllabusService.syllabus.common) {
			var usedSections = UserService.getSectionsPublish();

			for (var i = 0; i < usedSections.length; i++) {
				sections[i] = usedSections[i].name;
			}

		} else {
			sections = SyllabusService.syllabus.sections;
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


	this.getModifiedPages = function() {
		var syllabus = angular.copy(SyllabusService.getSyllabus());

		var changedPages = syllabus.elements.filter(function changed($element) {
			if (!$element.elements || $element.elements.length === 0) {
				return !$element.equalsPublished;
			} else {
				$element.elements = $element.elements.filter(changed);
				return $element.elements.length > 0;
			}
		});

		return changedPages;
	};
}]);
