'use strict';

angular.module('employeeApp.services')
    .factory('Upholstery', ['eaResource',function (eaResource) {
        return eaResource('upholstery/:id', {id:'@id'});   
    }]);
