'use strict';

angular.module('employeeApp.services')
    .factory('Upholstery', ['ecResource',function (ecResource) {
        return ecResource('upholstery/:id', {id:'@id'});   
    }]);
