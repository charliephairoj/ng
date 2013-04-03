
'use strict';

/**
 * Fabric Resource
 */
angular.module('EmployeeCenter.resources').
    factory('Fabric', function(ecResource){
        return ecResource('fabric/:id', {id:'@id'});   
    });