
'use strict';

/**
 * Supplier Contact Resource
 */
angular.module('EmployeeCenter.resources').
    factory('SupplierContact', function(ecResource){
        return ecResource('supplier_contact/:id', {id:'@id'});   
    });