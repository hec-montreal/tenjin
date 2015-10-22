opensyllabusApp.service('UserService', ['$resource', function ($resource){
    'use strict';

    //TODO: la verification du nom du param (et de la validité du param ?) se fera sur le cote client
    var userProvider = $resource('v1/syllabus/:userId.json', 
        {
            userId : "@userId"
        }, 
        {
            getUser : {
                method : 'GET',
                isArray : false
            }
        }
    );

    this.getSyllabus =  function($userId) {     
       return userProvider.getSyllabus({userId : $userId});
    };


}]);