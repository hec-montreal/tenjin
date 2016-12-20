tenjinApp.service('AlertService', ['$translate', function($translate) {
	'use strict';

	var alerts = {
		'danger': {
			type: 'danger',
			msg: $translate.instant('ALERT_ERROR'),
			visible: false
		},

		'cannot-load-syllabus': {
			type: 'danger',
			msg: $translate.instant('SYLLABUS_NOT_AVAILABLE'),
			visible: false
		},

		'success': {
			type: 'success',
			msg: $translate.instant('ALERT_SUCCESS'),
			visible: false
		}
	};

	this.currentAlert = null;

	this.showAlert = function(name) {
		this.currentAlert = alerts[name];
	}

	this.hideAlert = function(name) {
		this.currentAlert = null;
	}

	this.getCurrentAlert = function() {
		return this.currentAlert;
	}

	this.hasAlert = function() {
		return this.currentAlert !== null;
	}
}]);
