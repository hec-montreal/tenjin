tenjinApp.directive('videoElementForm', ['$sce', function($sce) {
    'use strict';

    return {
        scope: {
            element: '=videoElementForm'
        },

        restrict: 'A',

        templateUrl: 'form/videoElementForm/videoElementForm.html',

        controller: function($scope) {
            var removeButtonsList = 'Maximize,Anchor,Source,PageBreak,Blockquote,NumberedList,BulletedList,Image,Table,SpecialChar,Outdent,Indent,RemoveFormat,Link,Unlink,JustifyBlock,Strike';

            $scope.editorOptions = {
                language: 'fr',
                height: '120',
                removeButtons: removeButtonsList,
                removePlugins: 'elementspath,resize'
            };

            $scope.element.validate = function() {
                var ret = [];

                if (!this.attributes.videoUrl || this.attributes.videoUrl.length === 0) {
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
