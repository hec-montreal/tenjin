tenjinApp.directive('documentElementForm', ['config', '$translate', function(config, $translate) {
    'use strict';

    return {
        scope: {
            element: '=documentElementForm'
        },
        restrict: 'A',
        templateUrl: 'form/documentElementForm/documentElementForm.html',

        controller: function($scope) {
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
                $scope.element.attributes.documentType = $scope.currentType.id;
            };
        },

        link: function($scope, $element) {
            // Retrieve the document type for the given document type id
            if ($scope.element.attributes.documentType) {
                for (var i = 0; i < config.documentTypes.length; i++) {
                    if (parseInt($scope.element.attributes.documentType) === config.documentTypes[i].id) {
                        $scope.currentType = config.documentTypes[i];
                        break;
                    }
                }

            } else {
                $scope.currentType = $scope.config.documentTypes[0];
            }
        }
    };
}]);
