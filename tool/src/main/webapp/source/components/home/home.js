
opensyllabusApp.directive('home', ['$q', '$state', '$timeout', 'SyllabusService', 'UserService', 'AlertService', function ($q, $state, $timeout, SyllabusService, UserService, AlertService) {
    'use strict';

    return {
        scope: {
        },
        restrict: 'E',
        templateUrl: 'home/home.html',
        controller: function () {

            var errors = {
                'loadingProfile' : false,
                'loadingSyllabusList' : false,
            };
            
            this.loading = true;  

            $timeout(function() {
                // anything you want can go here and will safely be run on the next digest.
                // resize frame (should be done also whenever we change content)
                if (window.frameElement) {
                    setMainFrameHeight(window.frameElement.id);
                }
            });

            var loadProfileAndSyllabusList = function(){
                return $q.allSettled([UserService.loadProfile().$promise, SyllabusService.loadSyllabusList().$promise]).then(function(data) {

                    // data contient d'abord le résultat de la première requête
                    if (data[0].state === "rejected") {
                        errors.loadingProfile = true;
                    }

                    if (data[1].state === "rejected") {
                        errors.loadingSyllabusList = true;
                        // erreur load syllabus list
                        // AlertService.display('danger');
                    }
             
                    // no error during loading
                    // TODO : if ( data[0].state === "fulfilled" && data[1].state === "fulfilled") {
                    if ( data[0].state === "fulfilled" && data[1].state === "fulfilled") {
                        // set user profile
                        UserService.setProfile(data[0].value);
                        // set syllabus list
                        var syllabusList = data[1].value;
                        SyllabusService.setSyllabusList(syllabusList);

                        if (syllabusList.length === 1) {
                            console.log('=> redirection to /syllabus');
                            $state.go('syllabus', { 'id' : syllabusList[0].id });
                            // $state.go('management');
                        }

                    }

                });
            };

            // load profile and syllabus list            
            loadProfileAndSyllabusList().finally(function() {
                // end of loading
                this.loading = false;     
            });

        },
        controllerAs: 'homeCtrl',
        bindToController: {
        }

    };

}]);

