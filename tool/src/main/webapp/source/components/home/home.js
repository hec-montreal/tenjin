
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
                        var profile = data[0].value;
                        UserService.setProfile(profile);
                        // set syllabus list
                        var syllabusList = data[1].value;
                        SyllabusService.setSyllabusList(syllabusList);

                        // get redirection rules
                        var redirectionInfos = getRedirection(profile, syllabusList);
                        // redirect
                        if (redirectionInfos) {
                            $state.go(redirectionInfos.route, redirectionInfos.params);
                        } else {
                            // TODO : Error
                        }

                    }

                });
            };


            var getRedirection = function($profile, $syllabusList) {

                // if there is only 1 course outline (the common in this case) then go to /syllabus
                if ($syllabusList.length === 1) {
                    console.debug('Redirect syllabus : Only 1 course outline');
                    return { 
                        'route' : 'syllabus',
                        'params' : { 'id' : $syllabusList[0].id }
                    };

                } else if ($syllabusList.length > 1) {
                    // more than 1 course outline and wirte permission on site
                    // mainly secretary or coordinator
                    if($profile.site.permissions.write === true) {
                        console.debug('Redirect mangement : Many courses outlines + write permissions on site');
                        return { 
                            'route' : 'management'
                        };

                    } else {
                        // check if user have sections permissions on atleast one section
                        var profileSections = $profile.sections;
                        if (profileSections && profileSections.length > 0) {

                            for ( var i=0; i < profileSections; i++) {
                                // if user have write permission on at least one section
                                if( profileSections.permissions  &&  profileSections.permissions.write === true) {
                                    console.debug('Redirect mangement : Many courses outlines + write permissions on atleast one section');
                                    return { 
                                        'route' : 'management'
                                    };
                                }
                            }
                        }

                    }

                }

                return null;
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

