tenjinApp.service('PublishService', ['UserService', 'SyllabusService', 'ngDialog', '$translate', '$q', '$http', function(UserService, SyllabusService, ngDialog, $translate, $q, $http) {
	'use strict';

	this.isCommonSyllabusPublished = function() {
		var common = SyllabusService.getCommonSyllabus();

		return (!!SyllabusService.syllabus.common) || (!!common.publishedDate)
	};

	// Web service to publish a syllabus
	this.publish = function() {
		var tthis = this;
		var ret = $q.defer();

		this.working = true;

		$http.post('v1/syllabus/' + SyllabusService.syllabus.id + '/publish.json', {}).success(function(data) {
			tthis.working = false;

			ret.resolve(data);
		}).error(function(data) {
			tthis.working = false;

			ret.reject(data);
		});

		return ret.promise;
	};

	// Web service to create a Sakai announcement
	this.createAnnouncement = function(title, message) {
		var tthis = this;
		var ret = $q.defer();

		var announcement = {
			'title': title,
			'message': message
		};

		$http.post('tools/announcement/' + SyllabusService.syllabus.siteId + '.json', announcement).success(function(data) {
			ret.resolve(data);
		}).error(function(data) {
			ret.reject(data);
		});

		return ret.promise;
	};

	// Web service to load a published syllabus
	this.loadPublishedSyllabus = function() {
		var tthis = this;
		var ret = $q.defer();

		$http.get('v1/syllabus/published.json').success(function(data) {
			ret.resolve(data);
		}).error(function(data) {
			ret.reject(data);
		});

		return ret.promise;
	};

	// Web service to load the published syllabus list
	this.loadPublishedSyllabusList = function() {
		var tthis = this;
		var ret = $q.defer();

		$http.get('v1/syllabus/published.json').success(function (data) {
			ret.resolve(data);
		}).error(function (data) {
			ret.reject(data);
		});

		return ret.promise;
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
