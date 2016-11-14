tenjinApp.service('UserService', ['$resource', function($resource) {
    'use strict';

    //TODO: la verification du nom du param (et de la validité du param ?) se fera sur le cote client
    var userProvider = $resource('v1/user.json');


    /**
     * load the user profile
     * @return {Object} Promise
     */
    this.loadProfile = function() {
        return userProvider.get();
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
    this.getSectionsWrite = function() {
        if (!this.profile) {
            return [];
        }

        return this.profile.sections.filter(function($section) {
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