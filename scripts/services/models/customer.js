
'use strict';

/**
 * Customer Resource
 */
angular.module('EmployeeCenter.resources').
    factory('Customer', function(ecResource){
        return ecResource('customer/:id', {id:'@id'});   
    });