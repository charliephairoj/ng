
'use strict';

/**
 * Supplier Resource
 */
angular.module('EmployeeCenter.resources').
    factory('Supplier', function(ecResource){
        return ecResource('supplier/:id', {id:'@id'});   
    });