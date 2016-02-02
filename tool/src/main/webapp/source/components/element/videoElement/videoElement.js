
opensyllabusApp.directive('videoElement', ['$sce', 'variables', function ($sce, variables){
    'use strict';

    return {
        scope: {
            element: '=videoElement' 
        },
        restrict: 'A',
        templateUrl: 'videoElement.html',
        controller: function ($scope) {

        },
        link: function ($scope, $element) {
            $scope.variables = variables;
            $scope.isIframe = true;

            // Vérification sur l'url obligatoire avant insertion dans le src de l'iframe
            if ($scope.element.attributes.videoUrl) {
                var videoEmbedUrl;

                // look for the source (youtube, vimeo, dailymotion)
                // Embed ou iframe 
                if ($scope.element.attributes.videoUrl.indexOf('<object') > -1 || $scope.element.attributes.videoUrl.indexOf('<iframe') > -1) { 
                    $scope.isIframe = false;

                    var elem = angular.element( $element[0].querySelector('.embed') );
   
                    // Set default height and width to 300*220
                    var res = $scope.element.attributes.videoUrl.replace(/height="[0-9]*"/g, "height=220");
                    var res2 = res.replace(/width="[0-9]*"/g, "width=300");
                    elem.html(res2);
                }
                // YOUTUBE
                else if ($scope.element.attributes.videoUrl.indexOf('youtube') > -1) {
                    videoEmbedUrl = $scope.element.attributes.videoUrl.replace("watch?v=", "embed/");
                
                } // VIMEO 
                else if ($scope.element.attributes.videoUrl.indexOf('vimeo') > -1) {
                    // le lien n'est pas embed
                    if ( $scope.element.attributes.videoUrl.indexOf('player') === -1) {
                        var tabV = $scope.element.attributes.videoUrl.split('/');
                        videoEmbedUrl = 'https://player.vimeo.com/video/' + tabV[tabV.length - 1];
                    } else {
                        videoEmbedUrl = $scope.element.attributes.videoUrl;
                    }
                } // DAILYMOTION 
                else if ($scope.element.attributes.videoUrl.indexOf('dailymotion') > -1) {
                    
                    // le lien n'est pas embed
                    if ( $scope.element.attributes.videoUrl.indexOf('http') !== -1) {
                        var tabD1 = $scope.element.attributes.videoUrl.split('/');
                        var finchaine = tabD1[tabD1.length - 1];
                        var tabD2 = finchaine.split("_");
                        videoEmbedUrl = '//www.dailymotion.com/embed/video/' + tabD2[0];
                    } else {
                        videoEmbedUrl = $scope.element.attributes.videoUrl;
                    }
                }

                $scope.videoUrl = $sce.trustAsResourceUrl(videoEmbedUrl);
            }
        }

    };

}]);

