opensyllabusApp.service('UserService', ['$resource', function ($resource){
    'use strict';

    //TODO: la verification du nom du param (et de la validité du param ?) se fera sur le cote client
    var userProvider = $resource('v1/user.json');


    this.loadProfile = function() {
        return userProvider.get();
    };

    this.setProfile = function($dataProfile) {
        this.profile = $dataProfile;
    };

}]);