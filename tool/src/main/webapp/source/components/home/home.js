
opensyllabusApp.directive('home', ['$q', '$state', '$timeout', 'config', 'mockup' ,'SyllabusService', 'UserService', 'AlertService', function ($q, $state, $timeout, config, mockup, SyllabusService, UserService, AlertService) {
    'use strict';

    return {
        scope: {
        },
        restrict: 'E',
        templateUrl: 'home/home.html',
        controller: function () {

            var objHome = this;

            this.errors = {
                'loadingProfile' : false,
                'loadingSyllabusList' : false,
                'redirectionError': false
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
                        objHome.errors.loadingProfile = true;
                    }

                    if (data[1].state === "rejected") {
                        objHome.errors.loadingSyllabusList = true;
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
                            objHome.errors.redirectionError = true; 
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

                            for ( var i=0; i < profileSections.length ; i++) {
                                // if user have write permission on at least one section
                                if( profileSections[i].permissions  &&  profileSections[i].permissions.write === true) {
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


            if (config.mockUp) {
                // var userJson = {"site":{"courseTitle":"JOHAN-SA","permissions":{"write":true,"read":true},"courseId":"JOHAN-SA"},"sections":[{"id":"109087b2-3547-4898-bd64-55e2452d2cdb","name":"A01","permissions":{"write":true,"read":true}},{"id":"584989fc-fada-4428-afd4-d5e224406108","name":"B01","permissions":{"write":true,"read":true}},{"id":"d82dde60-2a44-4ec1-871e-cd4d9e90a07a","name":"C01","permissions":{"write":true,"read":true}},{"id":"2ec4bf72-1f6c-4f26-adc9-3fb51702d336","name":"DF1","permissions":{"write":true,"read":true}}],"userId":"b8e0d624-40b4-418a-ad68-267f02661a02"};
                // var syllabusListJson = [{"id":581,"siteId":"JOHAN-SA","courseTitle":"JOHAN-SA","title":"Partageable","templateId":1,"locale":"fr_CA","common":true,"createdBy":"b8e0d624-40b4-418a-ad68-267f02661a02","createdDate":1459269730695,"lastModifiedBy":"b8e0d624-40b4-418a-ad68-267f02661a02","lastModifiedDate":1459269730695,"elements":null,"sections":[]},{"id":602,"siteId":"JOHAN-SA","courseTitle":"JOHAN-SA","title":"coucou","templateId":1,"locale":"fr_CA","common":false,"createdBy":"5b20ae28-a55c-4049-b4fd-857ac8add48e","createdDate":1459286151174,"lastModifiedBy":"5b20ae28-a55c-4049-b4fd-857ac8add48e","lastModifiedDate":1459286151174,"elements":null,"sections":[]},{"id":531,"siteId":"JOHAN-SA","courseTitle":"JOHAN-SA","title":"The plan de cours","templateId":1,"locale":"fr_CA","common":false,"createdBy":"b8e0d624-40b4-418a-ad68-267f02661a02","createdDate":1458833576803,"lastModifiedBy":"b8e0d624-40b4-418a-ad68-267f02661a02","lastModifiedDate":1458833576803,"elements":null,"sections":[]},{"id":613,"siteId":"JOHAN-SA","courseTitle":"JOHAN-SA","title":"www","templateId":1,"locale":"fr_CA","common":false,"createdBy":"b8e0d624-40b4-418a-ad68-267f02661a02","createdDate":1459442452411,"lastModifiedBy":"b8e0d624-40b4-418a-ad68-267f02661a02","lastModifiedDate":1459442452411,"elements":null,"sections":[]},{"id":591,"siteId":"JOHAN-SA","courseTitle":"JOHAN-SA","title":"yyyy","templateId":1,"locale":"fr_CA","common":false,"createdBy":"b8e0d624-40b4-418a-ad68-267f02661a02","createdDate":1459443791001,"lastModifiedBy":"b8e0d624-40b4-418a-ad68-267f02661a02","lastModifiedDate":1459443791001,"elements":null,"sections":[]},{"id":592,"siteId":"JOHAN-SA","courseTitle":"JOHAN-SA","title":"uuu","templateId":1,"locale":"fr_CA","common":false,"createdBy":"b8e0d624-40b4-418a-ad68-267f02661a02","createdDate":1459443802173,"lastModifiedBy":"b8e0d624-40b4-418a-ad68-267f02661a02","lastModifiedDate":1459443802173,"elements":null,"sections":[]},{"id":590,"siteId":"JOHAN-SA","courseTitle":"JOHAN-SA","title":"bbbbbbbbbb","templateId":1,"locale":"fr_CA","common":false,"createdBy":"b8e0d624-40b4-418a-ad68-267f02661a02","createdDate":1459364756534,"lastModifiedBy":"b8e0d624-40b4-418a-ad68-267f02661a02","lastModifiedDate":1459364756534,"elements":null,"sections":[]},{"id":614,"siteId":"JOHAN-SA","courseTitle":"JOHAN-SA","title":"toto","templateId":1,"locale":"fr_CA","common":false,"createdBy":"b8e0d624-40b4-418a-ad68-267f02661a02","createdDate":1459456007532,"lastModifiedBy":"b8e0d624-40b4-418a-ad68-267f02661a02","lastModifiedDate":1459456007532,"elements":null,"sections":["d82dde60-2a44-4ec1-871e-cd4d9e90a07a"]},{"id":546,"siteId":"JOHAN-SA","courseTitle":"JOHAN-SA","title":"Plan de cours spécifique","templateId":1,"locale":"fr_CA","common":false,"createdBy":"b8e0d624-40b4-418a-ad68-267f02661a02","createdDate":1458763894550,"lastModifiedBy":"b8e0d624-40b4-418a-ad68-267f02661a02","lastModifiedDate":1458763894550,"elements":null,"sections":[]},{"id":609,"siteId":"JOHAN-SA","courseTitle":"JOHAN-SA","title":"DF1","templateId":1,"locale":"fr_CA","common":false,"createdBy":"b8e0d624-40b4-418a-ad68-267f02661a02","createdDate":1459355441962,"lastModifiedBy":"b8e0d624-40b4-418a-ad68-267f02661a02","lastModifiedDate":1459355441962,"elements":null,"sections":["2ec4bf72-1f6c-4f26-adc9-3fb51702d336"]},{"id":547,"siteId":"JOHAN-SA","courseTitle":"JOHAN-SA","title":"Plan de cours spécifique","templateId":1,"locale":"fr_CA","common":false,"createdBy":"b8e0d624-40b4-418a-ad68-267f02661a02","createdDate":1458764893068,"lastModifiedBy":"b8e0d624-40b4-418a-ad68-267f02661a02","lastModifiedDate":1458764893068,"elements":null,"sections":[]},{"id":548,"siteId":"JOHAN-SA","courseTitle":"JOHAN-SA","title":"test cours","templateId":1,"locale":"fr_CA","common":false,"createdBy":"b8e0d624-40b4-418a-ad68-267f02661a02","createdDate":1458766353406,"lastModifiedBy":"b8e0d624-40b4-418a-ad68-267f02661a02","lastModifiedDate":1458766353406,"elements":null,"sections":["584989fc-fada-4428-afd4-d5e224406108"]},{"id":549,"siteId":"JOHAN-SA","courseTitle":"JOHAN-SA","title":"Plan de cours section C01","templateId":1,"locale":"fr_CA","common":false,"createdBy":"b8e0d624-40b4-418a-ad68-267f02661a02","createdDate":1458768586303,"lastModifiedBy":"b8e0d624-40b4-418a-ad68-267f02661a02","lastModifiedDate":1458768586303,"elements":null,"sections":["d82dde60-2a44-4ec1-871e-cd4d9e90a07a"]},{"id":608,"siteId":"JOHAN-SA","courseTitle":"JOHAN-SA","title":"C01","templateId":1,"locale":"fr_CA","common":false,"createdBy":"b8e0d624-40b4-418a-ad68-267f02661a02","createdDate":1459351422899,"lastModifiedBy":"b8e0d624-40b4-418a-ad68-267f02661a02","lastModifiedDate":1459351422899,"elements":null,"sections":["d82dde60-2a44-4ec1-871e-cd4d9e90a07a"]},{"id":611,"siteId":"JOHAN-SA","courseTitle":"JOHAN-SA","title":"Plan de cours spécifique","templateId":1,"locale":"fr_CA","common":false,"createdBy":"b8e0d624-40b4-418a-ad68-267f02661a02","createdDate":1459364528275,"lastModifiedBy":"b8e0d624-40b4-418a-ad68-267f02661a02","lastModifiedDate":1459364528275,"elements":null,"sections":[]},{"id":612,"siteId":"JOHAN-SA","courseTitle":"JOHAN-SA","title":"aaaaa","templateId":1,"locale":"fr_CA","common":false,"createdBy":"b8e0d624-40b4-418a-ad68-267f02661a02","createdDate":1459364714707,"lastModifiedBy":"b8e0d624-40b4-418a-ad68-267f02661a02","lastModifiedDate":1459364714707,"elements":null,"sections":["2ec4bf72-1f6c-4f26-adc9-3fb51702d336","584989fc-fada-4428-afd4-d5e224406108","109087b2-3547-4898-bd64-55e2452d2cdb","d82dde60-2a44-4ec1-871e-cd4d9e90a07a"]}];
                UserService.setProfile(mockup.profile);
                // set syllabus list
                SyllabusService.setSyllabusList(mockup.syllabusList);

                // get redirection rules
                var redirectionInfos = getRedirection(mockup.profile, mockup.syllabusList);
                // redirect
                if (redirectionInfos) {
                    $state.go(redirectionInfos.route, redirectionInfos.params);
                } else {
                    // TODO : Error
                    objHome.errors.redirectionError = true; 
                }
            } else {

                // load profile and syllabus list            
                loadProfileAndSyllabusList().finally(function() {
                    // end of loading
                    objHome.loading = false;     
                });
            }

        },
        controllerAs: 'homeCtrl',
        bindToController: {
        }

    };

}]);

