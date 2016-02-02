
opensyllabusApp.directive('hyperlinkElementForm', function (){
    'use strict';

    return {
        scope: {
            element: '=hyperlinkElementForm'
        },
        restrict: 'A',
        templateUrl: 'hyperlinkElementForm.html',
        controller: function ($scope) {

            var removeButtonsList = 'Maximize,Anchor,Source,PageBreak,Blockquote,NumberedList,BulletedList,Image,Table,SpecialChar,Outdent,Indent,RemoveFormat,Link,Unlink,JustifyBlock,Strike';
            // setup editor options
            $scope.editorOptions = {
                language: 'fr',
                height: '120',
                removeButtons: removeButtonsList,
                removePlugins: 'elementspath,resize'
            };

        },
        link: function ($scope, $element) {
            // Date actuelle par défaut
            // $scope.element.availabilityStartDate = Date.now();
        }

    };

});

