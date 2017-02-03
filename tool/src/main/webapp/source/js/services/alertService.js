tenjinApp.service('AlertService', ['$translate', function($translate) {
	'use strict';

	var alerts = {
		'default': {
			type: 'danger',
			message: $translate.instant('ALERT_ERROR')
		},

		'cannotLoadBaseData': {
			type: 'danger',
			message: $translate.instant('ALERT_CANNOT_LOAD_BASE_DATA')
		},

		'noSyllabus': {
			type: 'danger',
			message: $translate.instant("ALERT_NO_SYLLABUS")
		},

		'cannotSaveSyllabus': {
			type: 'danger',
			message: $translate.instant('ALERT_CANNOT_SAVE_SYLLABUS')
		},

		'cannotPublishSyllabus': {
			type: 'danger',
			message: $translate.instant('ALERT_CANNOT_PUBLISH_SYLLABUS')
		},

		'cannotDeleteSyllabusList': {
			type: 'danger',
			message: $translate.instant('ALERT_CANNOT_DELETE_SYLLABUS_LIST')
		},

		'cannotCreateAnnouncement': {
			type: 'danger',
			message: $translate.instant('ALERT_CANNOT_CREATE_ANNOUNCEMENT')
		}
	}

	this.currentAlert = null;
	this.currentAlertCloseable = true;

	this.hasAlert = function() {
		return this.currentAlert != null;
	};

	this.isCurrentAlertCloseable = function() {
		return this.currentAlertCloseable;
	}

	this.showAlert = function(name, closeable) {
		if (!name) {
			name = 'default';
		}

		if (closeable === undefined || closeable === null) {
			this.currentAlertCloseable = true;
		} else {
			this.currentAlertCloseable = closeable;
		}

		this.currentAlert = alerts[name];
	};

	this.reset = function() {
		this.currentAlert = null;
	};

	this.getCurrentAlertMessage = function() {
		return this.currentAlert.message;
	};
}]);
