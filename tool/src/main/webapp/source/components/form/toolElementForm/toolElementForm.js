﻿tenjinApp.directive('toolElementForm', ['config', '$translate', function(config, $translate) {
    'use strict';

    return {
        scope: {
            element: '=toolElementForm'
        },

        restrict: 'A',

        templateUrl: 'form/toolElementForm/toolElementForm.html',

        controller: function($scope) {
            // setup editor options
            $scope.editorOptions = {
                language: 'fr',
                height: '200',
                toolbar: config.ckeditorToolbarTenjin,
                removePlugins: 'elementspath,resize'
            };

            $scope.selectType = function($type) {
                $scope.currentType = $type;
                if ($scope.currentType.id !== -1) {
                    $scope.element.attributes.docType = $scope.currentType.id;
                }
            };

            // Validation
            $scope.element.validate = function() {
                var ret = [];

                if (!$scope.element.attributes.sakaiToolId) {
                    ret.push({
                        field: "sakai_tool",
                        message: "ERROR_SAKAI_TOOL"
                    });
                }

                return ret;
            }
        }
    };
}]);