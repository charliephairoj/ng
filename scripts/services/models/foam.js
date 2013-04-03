
'use strict';

/**
 * Foam Resource
 */
angular.module('EmployeeCenter.resources').
    factory('Foam', function(ecResource){
        return ecResource('foam/:id', {id:'@id'});   
    });