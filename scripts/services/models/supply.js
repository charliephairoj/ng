
'use strict';

/**
 * Supply Resource
 */
angular.module('EmployeeCenter.resources').
    factory('Supply', function(ecResource){
        return ecResource('supply/:id', {id:'@id'});   
    });