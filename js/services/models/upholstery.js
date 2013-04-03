
'use strict';

/**
 * Upholstery Resource
 */
angular.module('EmployeeCenter.resources').
    factory('Upholstery', function(ecResource){
        return ecResource('upholstery/:id', {id:'@id'});   
    });