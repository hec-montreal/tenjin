tenjinApp.service('ResponsiveService', ['Modernizr', function (Modernizr){
		'use strict';

		this.getDevice = function() {
						// test screen size
			 var query = Modernizr.mq('(max-width: 767px)');
			 var device;

			 if (query) {
						// smartphone
						device = "mobile";
				} else {
						// desktop
						device = "desktop";
				}

				return device;
		};
}]);
