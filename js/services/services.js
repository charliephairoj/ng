'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('EmployeeCenter.services', ['ecResource']).
    factory('Supply', function(ecResource){
        return ecResource('supply/:id', {id:'@id'});   
    }).factory('Model', function(ecResource){
        return ecResource('model/:id', {id:'@id'});
    }).factory('Supplier', function(ecResource){
        return ecResource('supplier/:id', {id:'@id'});
    }).
    factory('Configuration', function(ecResource){
        return ecResource('configuration/:id', {id:'@id'});
    }).factory('Upholstery', function(ecResource){
        return ecResource('upholstery/:id', {id:'@id'});
    }).factory('Customer', function(ecResource){
        return ecResource('customer/:id', {id:'@id'});
    }).factory('Lumber', function(ecResource){
        return ecResource('lumber/:id', {id:'@id'});
    }).factory('Fabric', function(ecResource){
        return ecResource('fabric/:id', {id:'@id'});
    }).factory('Foam', function(ecResource){
        return ecResource('foam/:id', {id:'@id'});
    }).factory('Wool', function(ecResource){
        return ecResource('wool/:id', {id:'@id'});
    }).factory('Product', function(ecResource){
        return ecResource('product/:id', {id:'@id'});
    }).factory('PurchaseOrder', function(ecResource){
        return ecResource('purchase_order/:id', {id:'@id'});
    }).factory('User', function(ecResource){
        return ecResource('user/:id', {id:'@id'});
    }).factory('Group', function(ecResource){
        return ecResource('group/:id', {id:'@id'});
    }).factory('Permission', function(ecResource){
        return ecResource('permission/:id', {id:'@id'});
    });