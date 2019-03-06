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

		var wrap = {
			csrfToken: UserService.getCsrfToken()
		};

		$http.post('v1/syllabus/' + SyllabusService.syllabus.id + '/publish.json', wrap).success(function(data) {
			tthis.working = false;

			ret.resolve(data);
		}).error(function(data) {
			tthis.working = false;

			ret.reject(data);
		});

		return ret.promise;
	};

	// Web service to create a Sakai announcement
	this.createAnnouncement = function(title, message, groups) {
		var tthis = this;
		var ret = $q.defer();

		var announcement = {
			'title': title,
			'message': message,
			'groups': groups,
			'csrfToken': UserService.getCsrfToken()
		};

		$http.post('v1/announcement/' + SyllabusService.syllabus.siteId + '.json', announcement).success(function(data) {
			ret.resolve(data);
		}).error(function(data) {
			ret.reject(data);
		});

		return ret.promise;
	};

	this.getTargetedSections = function() {
		var ret = [];

		if (SyllabusService.getSyllabus().common) {
			return UserService.getProfile().sections.map(function(s) {
				return s.name;
			});
		}

		return SyllabusService.getSyllabus().sections.map(function(s) {
			return UserService.getSectionTitle(s);
		});
	};


	this.getModifiedPages = function() {
		var syllabus = angular.copy(SyllabusService.getSyllabus());

		var changedPages = syllabus.elements.filter(function changed($element) {
			if (!$element.elements || $element.elements.length === 0) {
				return !$element.equalsPublished ||
					($element.mappingEqualsPublished != null && !$element.mappingEqualsPublished);
			} else {
				$element.elements = $element.elements.filter(changed);
				return $element.elements.length > 0;
			}
		});

		return changedPages;
	};
}]);
