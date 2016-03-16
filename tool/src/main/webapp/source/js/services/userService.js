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


    this.loadProfile = function($userId) {
        return userProvider.get({userId : $userId});
    };

    this.setProfile = function($dataProfile) {
        this.profile = $dataProfile;
    };

}]);