tenjinApp.directive('videoElementForm', ['$sce', 'config', function($sce, config) {
	'use strict';

	return {
		scope: {
			element: '=videoElementForm'
		},

		restrict: 'A',

		templateUrl: 'form/videoElementForm/videoElementForm.html',

		controller: function($scope) {
			$scope.editorOptions = {
				language: 'fr',
				height: '120',
				toolbar: config.ckeditorToolbarTenjin,
				removePlugins: 'elementspath,resize'
			};

			$scope.element.validate = function() {
				var ret = [];

				if ((!this.attributes.videoUrl || this.attributes.videoUrl.length === 0) && (!this.attributes.embedCode || this.attributes.embedCode.length === 0)) {
					ret.push({
						field: "videoUrl",
						message: "ERROR_MISSING_VIDEO_URL"
					});
				}

				return ret;
			};
		}
	};
}]);
