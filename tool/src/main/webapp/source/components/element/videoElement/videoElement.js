tenjinApp.directive('videoElement', ['$sce', function($sce) {
	'use strict';

	return {
		scope: true,

		restrict: 'A',

		templateUrl: 'element/videoElement/videoElement.html',

		controller: function($scope) {
			// Url validation
			if ($scope.element.attributes.videoUrl) {
				var videoEmbedUrl;

				// look for the source (youtube, vimeo, dailymotion)
				// YOUTUBE
				if ($scope.element.attributes.videoUrl.indexOf('youtube') > -1 || $scope.element.attributes.videoUrl.indexOf('youtu.be') > -1) {
					var res = $scope.element.attributes.videoUrl.replace("watch?v=", "embed/");
					videoEmbedUrl = res.replace("&feature=youtu.be", "");
				} // VIMEO 
				else if ($scope.element.attributes.videoUrl.indexOf('vimeo') > -1) {
					// Non embedded
					if ($scope.element.attributes.videoUrl.indexOf('player') === -1) {
						var tabV = $scope.element.attributes.videoUrl.split('/');
						videoEmbedUrl = 'https://player.vimeo.com/video/' + tabV[tabV.length - 1];
					} else {
						videoEmbedUrl = $scope.element.attributes.videoUrl;
					}
				} // DAILYMOTION 
				else if ($scope.element.attributes.videoUrl.indexOf('dailymotion') > -1) {

					// le lien n'est pas embed
					if ($scope.element.attributes.videoUrl.indexOf('http') !== -1) {
						var tabD1 = $scope.element.attributes.videoUrl.split('/');
						var finchaine = tabD1[tabD1.length - 1];
						var tabD2 = finchaine.split("_");
						videoEmbedUrl = '//www.dailymotion.com/embed/video/' + tabD2[0];
					} else {
						videoEmbedUrl = $scope.element.attributes.videoUrl;
					}
				}

				$scope.videoEmbedHtml = $sce.trustAsHtml('<iframe height="220" src="'+videoEmbedUrl+'" frameborder="0" allowfullscreen class="col-sm-3 col-xs-12"></iframe>');
			} else if ($scope.element.attributes.embedCode) {
				$scope.videoEmbedHtml = $sce.trustAsHtml($scope.element.attributes.embedCode);
			}
		}
	};
}]);
