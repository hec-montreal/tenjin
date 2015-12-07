
opensyllabusApp.service('ModalService', ['$uibModal', function ($uibModal){
    'use strict';


    this.confirmDelete = function($event, $parent, $element) {

        // var offset = angular.element($event.target).prop('offsetLeft');
        // var modal = angular.element(document.querySelector('.modal'));
        // modal.css('top', offset);

        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'deleteModalContent.html',
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

        // var offset = angular.element($event.target).prop('offsetLeft');
        // var modal = angular.element(document.querySelector('.modal'));
        // modal.css('top', offset);

        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'createElementModal.html',
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


    this.editElement = function($type, $parent, $element) {

        // var offset = angular.element($event.target).prop('offsetLeft');
        // var modal = angular.element(document.querySelector('.modal'));
        // modal.css('top', offset);

        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'createElementModal.html',
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
              return $element;
            }
          }
        });

        return modalInstance;

    };


}]);