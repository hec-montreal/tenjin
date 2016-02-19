
opensyllabusApp.directive('home', ['$timeout', 'TreeService', 'SyllabusService', 'AlertService', 'ModalService', 'variables', 'config', 'mockup', function ($timeout, TreeService, SyllabusService, AlertService, ModalService, variables, config, mockup){
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
 
            this.syllabusList = mockup.syllabusList;

            // mockup ou non
            if (config.mockUp === true) {
                this.syllabusList = mockup.syllabusList;
            } else {
                this.syllabusList = mockup.syllabusList;
                // Load the syllabus list
                // loadSyllabusList().finally(function() {
                //      this.infos.working = false; 
                // });
                // this.infos.working = true;
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

            this.deleteSyllabus = function($syllabusList) {
                // Get list of selected syllabus
                var data = {};

                // Création modale
                var modal = ModalService.deleteSyllabus($syllabusList);

                // Traitement du résultat
                modal.result.then(function (selectedItem) {
                    console.debug('élément modifié');
                }, function () {
                    console.debug('élément toujours là');
                });    
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

