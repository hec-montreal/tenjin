
opensyllabusApp.directive('loader', ['SyllabusService', function (SyllabusService){
    'use strict';

    return {
        scope: {
        },
        restrict: 'E',
        templateUrl: 'loader/loader.html',
        controller: function () {
            this.syllabusService = SyllabusService;
            // this.treeService = TreeService;
            // this.alertService = AlertService;
            // this.variables = variables;
            // this.config = config;
             
            // this.show = true;

        },
        controllerAs: 'loaderCtrl',
        bindToController: {
        }

    };

}]);

