
opensyllabusApp.service('ModalService', ['$modal', function ($modal){
    'use strict';


    this.confirmDelete = function($element) {

        var modalInstance = $modal.open({
          animation: true,
          templateUrl: 'deleteModalContent.html',
          controller: 'DeleteModalCtrl',
          size: '',
          resolve: {
            element: function () {
              return $element;
            }
          }
        });

        return modalInstance;

    };

}]);