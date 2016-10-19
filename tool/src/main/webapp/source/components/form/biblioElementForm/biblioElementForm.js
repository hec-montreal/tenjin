
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

            $scope.selectType = function($type) {
                $scope.currentType = $type;
                if ($scope.currentType.id !== -1) {
                   $scope.element.attributes.docType = $scope.currentType.id; 
                }
            };

        },
        link: function ($scope, $element) {
            
            // Récupération du type de document
            if ($scope.element.attributes.docType) { 

                for (var i=0 ; i < config.documentTypes.length; i++) {
                    if (parseInt($scope.element.attributes.docType) === config.documentTypes[i].id ) {
                        $scope.currentType = config.documentTypes[i];
                        break;
                    }
                }

            } else {
                $scope.currentType = $scope.config.documentTypes[0];
            }
            
            $scope.element.$formHasRessource  = true;
        }

    };

}]);

