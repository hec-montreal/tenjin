
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

            // Validation
            $scope.element.validate = function() {
                var ret = [];

                if (!$scope.element.attributes.citationId) {
                    ret.push({
                        field: "citation",
                        message: "ERROR_MISSING_CITATION"
                    });
                }

                return ret;
            }
        },
        link: function ($scope, $element) {
            
        }

    };

}]);

