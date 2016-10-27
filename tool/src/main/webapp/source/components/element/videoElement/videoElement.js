tenjinApp.directive('videoElement', function() {
    'use strict';

    return {
        scope: {
            element: '=videoElement'
        },

        restrict: 'A',

        templateUrl: 'element/videoElement/videoElement.html',

        controller: function($scope) {
            $scope.isIframe = true;

            // Vérification sur l'url obligatoire avant insertion dans le src de l'iframe
            if ($scope.element.attributes.videoUrl) {
                var videoEmbedUrl;

                // look for the source (youtube, vimeo, dailymotion)
                // Embed ou iframe 
                if ($scope.element.attributes.videoUrl.indexOf('<object') > -1 || $scope.element.attributes.videoUrl.indexOf('<iframe') > -1) {
                    $scope.isIframe = false;

                    // Set default height and width to 300*220
                    var res = $scope.element.attributes.videoUrl.replace(/height="[0-9]*"/g, "height=220");
                    // replace pixel width by classes containing width percentages
                    var res2 = res.replace(/width=(")*[0-9]*(")*/g, "class='col-sm-3 col-xs-12'");

                    videoEmbedUrl = res2;
                }
                // YOUTUBE
                else if ($scope.element.attributes.videoUrl.indexOf('youtube') > -1 || $scope.element.attributes.videoUrl.indexOf('youtu.be') > -1) {
                    var res = $scope.element.attributes.videoUrl.replace("watch?v=", "embed/");
                    videoEmbedUrl = res.replace("&feature=youtu.be", "");
                } // VIMEO 
                else if ($scope.element.attributes.videoUrl.indexOf('vimeo') > -1) {
                    // le lien n'est pas embed
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

                $scope.videoUrl = videoEmbedUrl;
            }
        },

        link: function($scope, $element) {

        }
    };
});