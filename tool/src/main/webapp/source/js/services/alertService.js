tenjinApp.service('AlertService', ['$translate', function($translate) {
	'use strict';

	var alerts = {};

	this.init = function() {
        alerts = {
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

	    	'noPublishedSyllabus': {
		    	type: 'danger',
			    message: $translate.instant("ALERT_NO_PUBLISHED_SYLLABUS")
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

	    	'cannotUnpublishSyllabusList': {
    			type: 'danger',
    			message: $translate.instant('ALERT_CANNOT_UNPUBLISH_SYLLABUS_LIST')
    		},

    		'cannotCreateAnnouncement': {
    			type: 'danger',
    			message: $translate.instant('ALERT_CANNOT_CREATE_ANNOUNCEMENT')
    		},

    		'createAnnouncementSuccess': {
    			type: 'success',
    			message: $translate.instant('ALERT_CREATE_ANNOUNCEMENT_SUCCESS'),
    			closeable: true
    		},

    		'importServiceUndefined': {
	    		type: 'danger',
    			message: $translate.instant('ALERT_IMPORT_SERVICE_UNDEFINED')
    		},

    		'noSyllabusLock': {
    			type: 'danger',
    			message: $translate.instant('ALERT_NO_LOCK'),
    		},

    		'syllabusLocked': {
    			type: 'danger',
    			message: $translate.instant('ALERT_LOCKED_BY')
    		},

	    	'importSyllabusPermissionError': {
    			type: 'danger',
	    		message: $translate.instant('ALERT_IMPORT_SYLLABUS_PERMISSION_ERROR')
    		},

    		'importSyllabusNotFound': {
	    		type: 'danger',
    			message: $translate.instant('ALERT_IMPORT_SYLLABUS_NOT_FOUND')
	    	},

    		'importSyllabusError': {
	    		type: 'danger',
    			message: $translate.instant('ALERT_IMPORT_SYLLABUS_ERROR')
		},

		'permissionsUpdateError': {
			type: 'danger',
			message: $translate.instant('ERROR_PERMISSIONS_UPDATE')
		},

		'permissionsUpdateSuccess': {
			type: 'success',
			message: $translate.instant('SUCCESS_PERMISSIONS_UPDATE'),
			closeable: true
		},

		'resourcesSecurityException': {
			type: 'danger',
			message: $translate.instant('RESOURCES_SECURITY_EXCEPTION')
		},

		'resourcesLoadError': {
			type: 'danger',
			message: $translate.instant('RESOURCES_LOAD_ERROR')
		},

		'userProfileLoadError': {
			type: 'danger',
			message: $translate.instant('USER_PROFILE_LOAD_ERROR')
		}
    	}
	};

	this.currentAlert = null;
	this.currentAlertCloseable = false;

	this.hasAlert = function() {
		return this.currentAlert != null;
	};

	this.isCurrentAlertCloseable = function() {
		if (this.currentAlert.closeable) {
		    return this.currentAlert.closeable;
		} else {
		    return false;
		}
	}

	this.showAlert = function(name, messageVariables) {
		if (!name) {
			name = 'default';
		}
		if (!(name in alerts)) {
		    console.log("showAlert error not found");
		    name = 'default';
		}

		this.currentAlert = alerts[name];
		this.currentAlert.renderedMessage = this.currentAlert.message;

		// Message customization
		if (messageVariables && messageVariables.length) {
			for (var i = 0; i < messageVariables.length; i++) {
				var varName = '%' + (i + 1);

				this.currentAlert.renderedMessage = this.currentAlert.renderedMessage.replace(varName, messageVariables[i]);
			}
		}
	};

	/**
	 * Util method to display the correct error on syllabus save
	 */
	this.showSyllabusSaveAlert = function(error) {
		var data = error.data ? error.data : error;

		if (data.lock) {
			this.showAlert('syllabusLocked', [data.lock.createdByName]);
		} else if (data.locked) {
			this.showAlert('noSyllabusLock');
		} else {
			this.showAlert('cannotSaveSyllabus');
		}
	};

	this.showSyllabusLoadAlert = function(error) {
		var data = error ? error.data ? error.data : error : '';

		if (data.lock) {
			this.showAlert('syllabusLocked', [data.lock.createdByName]);
		} else if (data.locked) {
			this.showAlert('noSyllabusLock');
		} else if (data === 'noPublishedSyllabus') {
		    this.showAlert('noPublishedSyllabus');
		}
		else {
			this.showAlert('noSyllabus');
		}
	};

	this.reset = function() {
		this.currentAlert = null;
	};

	this.getCurrentAlertMessage = function() {
		return this.currentAlert.renderedMessage;
	};
}]);
