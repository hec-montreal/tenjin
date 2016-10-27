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

            // setup editor options
            $scope.editorOptions = {
                language: 'fr',
                height: '120',
                removeButtons: removeButtonsList,
                removePlugins: 'elementspath,resize'
            };

        },

        link: function($scope, $element) {

        }
    };
}]);