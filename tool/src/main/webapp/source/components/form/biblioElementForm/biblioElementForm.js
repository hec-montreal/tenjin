
tenjinApp.directive('biblioElementForm', ['config', '$translate' ,  function (config, $translate){
    'use strict';

    return {
        scope: {
            element: '=biblioElementForm'
        },
        restrict: 'A',
        templateUrl: 'form/biblioElementForm/biblioElementForm.html',
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

            $scope.config = config; 

        },
        link: function ($scope, $element) {
            
        }

    };

}]);

