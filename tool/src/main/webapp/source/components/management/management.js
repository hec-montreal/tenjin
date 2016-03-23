﻿
opensyllabusApp.directive('management', ['$timeout', '$translate','TreeService', 'SyllabusService', 'AlertService', 'ModalService', 'UserService', 'variables', 'config', 'mockup', function ($timeout, $translate, TreeService, SyllabusService, AlertService, ModalService, UserService, variables, config, mockup){
    'use strict';

    return {
        scope: {
        },
        restrict: 'E',
        templateUrl: 'management/management.html',
        controller: function () {

            // promiseObj.then(function($data) {
            //     console.log("coucou");
            // }, function($error) {

            // });

            this.syllabusService = SyllabusService;
            this.treeService = TreeService;
            this.alertService = AlertService;
            this.variables = variables;
            this.config = config;

            this.infos = {};
            this.disableDelete = true;
 
            //this.sections = mockup.sections;
            this.sections = [];
            // get user sections with write permissions
            for (var i = 0; i < UserService.profile.sections.length; i++) {
                var sectionUser = UserService.profile.sections[i];
                if (sectionUser.permissions.write === true) {
                    this.sections.push(sectionUser);
                }
            }

            var loadSyllabusList = function (){

                return SyllabusService.loadSyllabusList().$promise.then(function($data){
                    SyllabusService.setSyllabusList($data);

                    // $rootScope.$broadcast('RESOURCES_LOADED');

                }, function($error){
                    // erreur load syllabus list
                    AlertService.display('danger');
                });
            };

            // mockup ou non
            if (config.mockUp === true) {
                this.syllabusList = mockup.syllabusList;
            } else {
                
                // Load the syllabus list (if the syllabus has not been loaded earlier)
                // var syllabusList = SyllabusService.getSyllabusList();
                // if ( !syllabusList  ) {
                loadSyllabusList().finally(function() {
                     this.infos.working = false; 
                });
                // }
            }


            this.addSyllabus = function() {
                // Get sections and libelle
                var data = {};

                // Création modale
                var modal = ModalService.createSyllabus(data);

                // Traitement du résultat
                modal.result.then(function (selectedItem) {
                    console.debug('élément modifié');
                }, function () {
                    console.debug('élément toujours là');
                });    
            };

            this.deleteSyllabus = function() {
                // Get list of selected syllabus
                var syllabusList =[];
                for (var i = 0 ; i < this.syllabusList.length; i++) {
                    if (this.syllabusList[i].checked === true) {
                        syllabusList.push(this.syllabusList[i]);
                    }
                }

                // Création modale
                var modal = ModalService.deleteSyllabus(syllabusList);

                // Traitement du résultat
                modal.result.then(function (selectedItem) {
                    console.debug('élément modifié');
                }, function () {
                    console.debug('élément toujours là');
                });    
            };
            

            this.enableDelete = function() {

                this.disableDelete = true;
                // if a syllabus is checked then the delete button should be enabled
                for (var i = 0 ; i < this.syllabusList.length; i++) {
                    if (this.syllabusList[i].checked === true) {
                        this.disableDelete = false;
                    }
                }
            };

            this.showSections = function($syllabus) {
                var selected = [];
                angular.forEach(this.sections, function(s) { 
                  if ($syllabus.sections.indexOf(s.id) >= 0) {
                    selected.push(s.name);
                  }
                });

                return selected.length ? selected.join(', ') : $translate.instant("MANAGEMENT_NO_SECTION");
            }; 
            
            this.updateName = function($data, $syllabus) {
                if ($data.length === 0 ) {
                    return $translate.instant("MANAGEMENT_ERREUR_NAME");
                }
                return SyllabusService.saveSyl($syllabus).$promise;
            };

            this.updateSections = function($data, $syllabus) {         
                return SyllabusService.saveSyl($syllabus).$promise;
            };

            this.redirectToSyllabus = function($syllabusId) {
                SyllabusService.setCurrentSyllabusId($syllabusId);
            };

            this.getSyllabusRoute = function($id) {
                return "syllabus/"+$id;
            };

            $timeout(function() {
                // anything you want can go here and will safely be run on the next digest.
                // resize frame (should be done also whenever we change content)
                if (window.frameElement) {
                    setMainFrameHeight(window.frameElement.id);
                }
            });

        },
        controllerAs: 'managementCtrl',
        bindToController: {
        }

    };

}]);

