tenjinApp.service('UserService', ['$resource', '$q', function($resource, $q) {
    'use strict';

    var userProvider = $resource('v1/user.json');

    this.loadProfile = function() {
        var tthis = this;
        var def = $q.defer();

        userProvider.get().$promise.then(function(data) {
            tthis.profile = data;

            console.log("Profile loaded");

            def.resolve(data);
        }, function(reason) {
            def.reject(reason);
        });

        return def.promise;
    };

    /**
     * Set the user profile
     * @param {Object} $dataProfile User profile
     */
    this.setProfile = function($dataProfile) {
        this.profile = $dataProfile;
    };

    /**
     * Get the user profile
     * @return {Object} User profile
     */
    this.getProfile = function() {
        return this.profile;
    };

    /**
     * Get sections with write permissions
     * @return {Object} Sections object 
     */
    this.getSectionsWrite = function(profile) {
        var p = !profile ? this.profile : profile;

        if (!p) {
            return [];
        }

        return p.sections.filter(function($section) {
            return $section.permissions.write === true;
        });
    };

    /* Get the sections with publish permission
     * @return {Object} Sections object
     **/
    this.getSectionsPublish = function() {
        return this.profile.sections.filter(function($section) {
            return $section.permissions.publish === true;
        });
    };

    /**
     * Check if atleast one section of the current user profile has a write permission to true
     * @return {Boolean} True if atleast one section has write permission
     */
    this.hasWritableSection = function() {
        var sections = this.getSectionsWrite();
        return (sections.length > 0);
    };
}]);