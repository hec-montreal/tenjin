tenjinApp.service('SyllabusLockService', ['$q', '$http', 'AlertService', function($q, $http, AlertService) {
	'use strict';

	var renewLoopHandle = null;

	this.getSyllabusLock = function(syllabusId) {
		return $http.get('v1/syllabus/' + syllabusId + '/lock.json');
	};

	this.lockSyllabus = function(syllabusId) {
		return $http.post('v1/syllabus/' + syllabusId + '/lock.json');
	};

	this.renewSyllabusLock = function(syllabusId) {
		return $http.post('v1/syllabus/' + syllabusId + '/lock/renew.json');
	};

	this.startRenewLoop = function(syllabusId) {
		var tthis = this;

		if (this.renewLoopHandle) {
			this.stopRenewLoop();
		}

		this.renewLoopHandle = setInterval(function() {
			tthis.renewSyllabusLock(syllabusId).then(function() {
				console.log("Lock renewed");
			}).catch(function(e) {
				e = e.data;

				if (e.lock) {
					AlertService.showAlert('syllabusLocked', [e.lock.createdByName]);
				} else if (e.locked) {
					AlertService.showAlert('noSyllabusLock');
				} else {
					AlertService.showAlert('cannotSaveSyllabus');
				}
			});
		}, 10000);
	};

	this.stopRenewLoop = function() {
		clearInterval(this.renewLoopHandle);

		this.renewLoopHandle = null;
	};
}]);
