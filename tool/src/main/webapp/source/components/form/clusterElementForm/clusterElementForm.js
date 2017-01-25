tenjinApp.directive('clusterElementForm', ['config', function(config) {
    'use strict';

    return {
        scope: {
            element: '=clusterElementForm'
        },

        restrict: 'A',

        templateUrl: 'form/clusterElementForm/clusterElementForm.html',

        controller: function($scope) {
            // setup editor options
            $scope.editorOptions = {
                language: 'fr',
                height: '120',
                toolbar: config.ckeditorToolbarTenjin,
                removePlugins: 'elementspath,resize'
            };
        }
    };
}]);