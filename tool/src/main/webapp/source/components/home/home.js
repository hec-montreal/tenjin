tenjinApp.directive('home', ['$state', 'TenjinService', function($state, TenjinService) {
    'use strict';

    return {
        scope: true,

        restrict: 'E',

        templateUrl: 'home/home.html',

        controller: function($scope) {
            var tthis = this;

            $scope.$watch('baseDataLoaded', function() {
                if ($scope.baseDataLoaded) {
                    var redirectionInfos = TenjinService.dispatchUser();

                    if (redirectionInfos) {
                        $state.go(redirectionInfos.route, redirectionInfos.params);
                    }
                }
            });
        },

        controllerAs: 'homeCtrl'
    };
}]);
