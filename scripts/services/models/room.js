'use strict';

angular.module('employeeApp.services')
    .factory('Room', ['eaResource', function(eaResource) {
        return eaResource('room/:id', {id:'@id'});   
    }]);
