
opensyllabusApp.directive('home', ['$q', '$state', 'SyllabusService', 'UserService', 'AlertService', function ($q, $state, SyllabusService, UserService, AlertService) {
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

            var loadProfileAndSyllabusList = function($userId){
                return $q.allSettled([UserService.loadProfile($userId).$promise, SyllabusService.loadSyllabusList().$promise]).then(function(data) {

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
                    // if ( data[0].state === "fulfilled" && data[1].state === "fulfilled") {
                    if ( data[1].state === "fulfilled") {
                        // set user profile
                        UserService.setProfile(data[0].value);
                        // set syllabus list
                        var syllabusList = data[1].value;
                        SyllabusService.setSyllabusList(syllabusList);

                        if (syllabusList.length === 1) {
                            $state.go('syllabus', { 'id' : syllabusList[0].id });
                        }

                    }

                }, function(error) {
                    console.log('erreur get syllabus');

                });
            };

            // load profile and syllabus list            
            var userId = 1;
            loadProfileAndSyllabusList(userId).finally(function() {
                // end of loading
                this.loading = false;     
            });

        },
        controllerAs: 'homeCtrl',
        bindToController: {
        }

    };

}]);

