tenjinApp.directive('hyperlinkElementForm', ['config', function(config) {
    'use strict';

    return {
        scope: {
            element: '=hyperlinkElementForm'
        },

        restrict: 'A',

        templateUrl: 'form/hyperlinkElementForm/hyperlinkElementForm.html',

        controller: function($scope) {
            var removeButtonsList = 'Maximize,Anchor,Source,PageBreak,Blockquote,NumberedList,BulletedList,Image,Table,SpecialChar,Outdent,Indent,RemoveFormat,Link,Unlink,JustifyBlock,Strike';

            // setup editor options
            $scope.editorOptions = {
                language: 'fr',
                height: '120',
                removeButtons: removeButtonsList,
                removePlugins: 'elementspath,resize'
            };

            $scope.config = config;

            $scope.selectType = function($type) {
                $scope.currentType = $type;

                if ($scope.currentType.id !== -1) {
                    $scope.element.attributes.hyperlinkType = $scope.currentType.id;
                }
            };

            // Validation
            $scope.element.validate = function() {
                var ret = [];

                if (!this.attributes.hyperlinkUrl || this.attributes.hyperlinkUrl <= 0) {
                    ret.push({
                        field: "hyperlinkUrl",
                        message: "ERROR_URL_MANDATORY"
                    });
                }

                // Add protocol if not present
                var protocolRegex = /:\/\//g;

                if (!this.attributes.hyperlinkUrl.match(protocolRegex)) {
                    this.attributes.hyperlinkUrl = config.defaultHyperlinkProtocol + "://" + this.attributes.hyperlinkUrl;
                }

                return ret;
            };
        },

        link: function($scope, $element) {
            // Récupération du type de document
            if ($scope.element.attributes.hyperlinkType) {
                for (var i = 0; i < config.hyperlinkTypes.length; i++) {
                    if (parseInt($scope.element.attributes.hyperlinkType) === config.hyperlinkTypes[i].id) {
                        $scope.currentType = config.hyperlinkTypes[i];

                        break;
                    }
                }
            } else {
                $scope.currentType = $scope.config.hyperlinkTypes[0];
            }
        }
    };
}]);