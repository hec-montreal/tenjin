
opensyllabusApp.directive('regroupementElementForm', function (){
    'use strict';

    return {
        scope: { 
            element: '=regroupementElementForm'
        },
        restrict: 'A',
        templateUrl: 'regroupementElementForm.html',
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

