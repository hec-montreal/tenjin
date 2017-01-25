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

		'cannotSaveSyllabus': {
			type: 'danger',
			message: $translate.instant('ALERT_CANNOT_SAVE_SYLLABUS')
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
