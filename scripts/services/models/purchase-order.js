'use strict';

angular.module('employeeApp')
	.factory('PurchaseOrder', ['eaResource', function(eaResource) {
        return eaResource('purchase_order/:id', {id:'@id'});   
    }]);
