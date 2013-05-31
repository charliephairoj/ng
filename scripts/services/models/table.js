'use strict';

angular.module('employeeApp.services')
    .factory('Table', ['eaResource', function(eaResource) {
        return eaResource('table/:id', {id:'@id'});   
    }]);

