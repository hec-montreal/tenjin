opensyllabusApp.service('ResponsiveService', ['Modernizr', function (Modernizr){
    'use strict';

    // test screen size
    var query = Modernizr.mq('(max-width: 767px)');
    if (query) {
        // smartphone
        this.device = "mobile";
    } else {
        // desktop
        this.device = "desktop";
    }   

    this.getDevice = function() {
        return this.device;
    };

}]);