'use strict';

angular.module('employeeApp.services')
    .factory('Permission', ['eaResource', function(eaResource) {
        return eaResource('permission/:id', {id:'@id'});     
    }]);
