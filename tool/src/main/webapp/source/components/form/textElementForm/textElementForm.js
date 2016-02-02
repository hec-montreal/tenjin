
opensyllabusApp.directive('textElementForm', function (){
    'use strict';

    return {
        scope: { 
            element: '=textElementForm'
        },
        restrict: 'A',
        templateUrl: 'textElementForm.html',
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
        }

    };

});

