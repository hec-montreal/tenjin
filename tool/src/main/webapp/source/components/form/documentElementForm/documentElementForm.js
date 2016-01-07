
opensyllabusApp.directive('documentElementForm', ['config', '$translate' ,  function (config, $translate){
    'use strict';

    return {
        scope: {
            element: '=documentElementForm'
        },
        restrict: 'A',
        templateUrl: 'form/documentElementForm/documentElementForm.html',
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
        	//console.log( $scope.filesList.content_collection.entityPrefix);
            
            // $scope.$watch($scope.element, function() {
            //     debugger;
            //     $scope.element.title = $scope.element.$selectedResource.name;
            // }, true);
            
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

            // $scope.element.attributes.docType = $scope.config.documentTypes[0];
        }

    };

}]);

