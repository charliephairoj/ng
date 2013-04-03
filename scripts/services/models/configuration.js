
'use strict';

/**
 * Configuration Resource
 */
angular.module('EmployeeCenter.resources').
    factory('Configuration', function(ecResource){
        return ecResource('configuration/:id', {id:'@id'});   
    });