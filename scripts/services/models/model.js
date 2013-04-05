
'use strict';

/**
 * Model Resource
 */
angular.module('EmployeeCenter.resources').
    factory('Model', function(ecResource){
        return ecResource('model/:id', {id:'@id'});   
    });