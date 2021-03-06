tenjinApp.service('SyllabusLockService', ['$q', '$http', 'AlertService', 'UserService', function($q, $http, AlertService, UserService) {
	'use strict';

	var renewLoopHandle = null;

	this.getSyllabusLock = function(syllabusId) {
		return $http.get('v1/syllabus/' + syllabusId + '/lock.json');
	};

	this.lockSyllabus = function(syllabusId) {
		var wrap = {
			csrfToken: UserService.getCsrfToken()
		};

		return $http.post('v1/syllabus/' + syllabusId + '/lock.json', wrap);
	};

	this.renewSyllabusLock = function(syllabusId) {
		var wrap = {
			csrfToken: UserService.getCsrfToken()
		};

		return $http.post('v1/syllabus/' + syllabusId + '/lock/renew.json', wrap);
	};

	this.startRenewLoop = function(syllabusId) {
		var tthis = this;

		if (this.renewLoopHandle) {
			this.stopRenewLoop();
		}

		var delay = parseInt(UserService.getProfile().lockRenewDelaySeconds, 10) * 1000;

		this.renewLoopHandle = setInterval(function() {
			tthis.renewSyllabusLock(syllabusId).catch(function(e) {
				AlertService.showSyllabusSaveAlert(e);
			});
		}, delay);
	};

	this.stopRenewLoop = function() {
		clearInterval(this.renewLoopHandle);

		this.renewLoopHandle = null;
	};
}]);
