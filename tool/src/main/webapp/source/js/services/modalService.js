
opensyllabusApp.service('ModalService', ['$uibModal', 'config', function ($uibModal, config){
    'use strict';


    this.confirmDelete = function($parent, $element) {

        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'deleteModal/deleteModalContent.html',
          controller: 'DeleteModalCtrl',
          size: '',
          resolve: {
            parent: function () {
              return $parent;
            },
            element: function () {
              return $element;
            }
          }
        });

        return modalInstance;

    };


    this.createElement = function($type, $parent) {

        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'createModal/createElementModal.html',
          controller: 'CreateModalCtrl',
          size: '',
          resolve: {
            type: function() {
              return $type;
            },
            parent: function () {
              return $parent;
            },
            element: function () {
              return undefined;
            }
          }
        });

        return modalInstance;
    };


    this.editElement = function($parent, $element) {

        // var offset = angular.element($event.target).prop('offsetLeft');
        // var modal = angular.element(document.querySelector('.modal'));
        // modal.css('top', offset);

        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'createModal/createElementModal.html',
          controller: 'CreateModalCtrl',
          size: '',
          resolve: {
            type: function() {
              return undefined;
            },
            parent: function () {
              return $parent;
            },
            element: function () {
              return $element;
            }
          }
        });

        return modalInstance;

    };

    this.createSyllabus = function($syllabus) {

        // var offset = angular.element($event.target).prop('offsetLeft');
        // var modal = angular.element(document.querySelector('.modal'));
        // modal.css('top', offset);

        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'createSyllabusModal/createSyllabusModal.html',
          controller: 'CreateSyllabusModalCtrl',
          size: '',
          resolve: {
            data: $syllabus
          }        
        });

        return modalInstance;

    };

    this.deleteSyllabus = function($syllabusList) {

        // var offset = angular.element($event.target).prop('offsetLeft');
        // var modal = angular.element(document.querySelector('.modal'));
        // modal.css('top', offset);

        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'deleteSyllabusModal/deleteSyllabusModal.html',
          controller: 'DeleteSyllabusModalCtrl',
          size: '',
          resolve: {
            syllabusList: { 'syllabusList':$syllabusList }
          }        
        });

        return modalInstance;

    };


}]);