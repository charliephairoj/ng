'use strict';

angular.module('employeeApp.services')
    .factory('Room', ['eaResource', function(eaResource) {
        return eaResource('project/room/:id', {id:'@id'});   
    }]);
