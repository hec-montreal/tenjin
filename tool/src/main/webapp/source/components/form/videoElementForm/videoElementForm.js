tenjinApp.directive('videoElementForm', ['$sce', 'EditorService', function($sce, EditorService) {
	'use strict';

	return {
		scope: {
			element: '=videoElementForm'
		},

		restrict: 'A',

		templateUrl: 'form/videoElementForm/videoElementForm.html',

		controller: function($scope) {
			$scope.editorOptions = EditorService.createEditorOptions();

			if ($scope.element.attributes.embedCode && $scope.element.attributes.embedCode.length > 0) {
				$scope.inputMode = 'embed';
			} else {
				$scope.inputMode = 'url';
			}

			if (!$scope.element.id) {
				$scope.element.hidden = true;
			}

			$scope.element.preSave = function() {
				if ($scope.inputMode === 'url') {
					delete this.attributes.embedCode;
				}

				if ($scope.inputMode === 'embed') {
					delete this.attributes.videoUrl;
				}
			};

			$scope.element.validate = function() {
				var ret = [];

				if ((!this.attributes.videoUrl || this.attributes.videoUrl.length === 0) && (!this.attributes.embedCode || this.attributes.embedCode.length === 0)) {
					ret.push({
						field: "videoUrl",
						message: "ERROR_MISSING_VIDEO_URL"
					});
				}

				if (this.attributes.videoUrl) {
					var url = this.attributes.videoUrl;

					if (url.indexOf('youtube') < 0 && url.indexOf('vimeo') < 0 && url.indexOf('dailymotion') < 0) {
						ret.push({
							field: "videoUrl",
							message: "ERROR_INVALID_VIDEO_URL"
						});
					}
				}

				return ret;
			};
		}
	};
}]);
