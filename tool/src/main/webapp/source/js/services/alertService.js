
tenjinApp.service('AlertService', ['$translate',  function ($translate){
    'use strict';

    var alerts = {
        'danger' : { type: 'danger', msg: $translate.instant('ALERT_ERROR'), visible: false },
        'success': { type: 'success', msg: $translate.instant('ALERT_SUCCESS'), visible: false }
    };

    var defaultMsg = {
        'danger' :  $translate.instant('ALERT_ERROR'),
        'success' : $translate.instant('ALERT_SUCCESS')
    };


    this.closeAlert = function($type) {
        alerts[$type].visible = false;
    };

    this.getAlertMsg = function($type) {
        return alerts[$type].msg;
    };

    this.isVisible = function($type) {
        return alerts[$type].visible;
    };

    this.setVisible = function($type) {
        alerts[$type].visible = true;
    };

    this.display = function($type, $msg) {    
        alerts[$type].msg = $msg || defaultMsg[$type];
        alerts[$type].visible = true;
    };

}]);