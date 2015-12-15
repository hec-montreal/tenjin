
opensyllabusApp.directive('documentElementForm', ['FileBrowserService', function (FileBrowserService){
    'use strict';

    return {
        scope: {
            element: '=documentElementForm'
        },
        restrict: 'A',
        templateUrl: 'form/documentElementForm.html',
        controller: function ($scope) {

            // setup editor options
            $scope.editorOptions = {
                language: 'fr',
                // uiColor: '#fff',
                height: '200',
                removeButtons: 'Maximize,Anchor,Source,PageBreak',
                // removeButtons: removeButtonsList,
                removePlugins: 'elementspath,resize'
            };

        },
        link: function ($scope, $element) {
        	$scope.filesList = FileBrowserService.getDocuments();
        	//console.log( $scope.filesList.content_collection.entityPrefix);
        }

    };

}]);

