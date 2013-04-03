
'use strict';

/**
 * Lumber Resource
 */
angular.module('EmployeeCenter.resources').
    factory('Lumber', function(ecResource){
        return ecResource('lumber/:id', {id:'@id'});   
    });