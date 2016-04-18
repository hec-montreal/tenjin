
opensyllabusApp.directive('loader', ['SyllabusService', function (SyllabusService){
    'use strict';

    return {
        scope: {
        },
        restrict: 'E',
        templateUrl: 'loader/loader.html',
        controller: function () {
            this.syllabusService = SyllabusService;

        },
        controllerAs: 'loaderCtrl',
        bindToController: {
        }

    };

}]);

