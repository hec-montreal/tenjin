
opensyllabusApp.directive('home', ['$timeout', '$translate','TreeService', 'SyllabusService', 'AlertService', 'ModalService', 'variables', 'config', 'mockup', function ($timeout, $translate, TreeService, SyllabusService, AlertService, ModalService, variables, config, mockup){
    'use strict';

    return {
        scope: {
        },
        restrict: 'E',
        templateUrl: 'home/home.html',
        controller: function () {
            this.syllabusService = SyllabusService;
            this.treeService = TreeService;
            this.alertService = AlertService;
            this.variables = variables;
            this.config = config;


            this.infos = {};
            this.disableDelete = true;
 
            this.syllabusList = mockup.syllabusList;
            this.sections = mockup.sections;

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
                // this.syllabusList = mockup.syllabusList;
                // SyllabusService.loadSyllabusList().$promise.then(function() {
                //     debugger;
                // });
                // Load the syllabus list
                loadSyllabusList().finally(function() {
                     this.infos.working = false; 
                });
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

                return selected.length ? selected.join(', ') : $translate.instant("HOME_NO_SECTION");
            }; 
            
            this.updateName = function($data, $syllabus) {
                if ($data.length === 0 ) {
                    return $translate.instant("HOME_ERREUR_NAME");
                }
                return SyllabusService.saveSyl($syllabus).$promise;
            };

            this.updateSections = function($data, $syllabus) {         
                return SyllabusService.saveSyl($syllabus).$promise;
            };

            this.redirectToSyllabus = function($syllabusId) {
                SyllabusService.setCurrentSyllabusId($syllabusId);
            };

            $timeout(function() {
                // anything you want can go here and will safely be run on the next digest.
                // resize frame (should be done also whenever we change content)
                if (window.frameElement) {
                    setMainFrameHeight(window.frameElement.id);
                }
            });

        },
        controllerAs: 'homeCtrl',
        bindToController: {
        }

    };

}]);

