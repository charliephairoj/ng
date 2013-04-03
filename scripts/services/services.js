'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('EmployeeCenter.services', ['ecResource']).
    factory('Glue', function(ecResource){
        return ecResource('glue/:id', {id:'@id'});
    }).factory('Screw', function(ecResource){
        return ecResource('screw/:id', {id:'@id'});
    }).factory('Staple', function(ecResource){
        return ecResource('staple/:id', {id:'@id'});
    }).factory('Thread', function(ecResource){
        return ecResource('thread/:id', {id:'@id'});
    }).factory('Webbing', function(ecResource){
        return ecResource('webbing/:id', {id:'@id'});
    }).factory('Wool', function(ecResource){
        return ecResource('wool/:id', {id:'@id'});
    }).factory('Zipper', function(ecResource){
        return ecResource('zipper/:id', {id:'@id'});
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
    }).factory('LibraryBook', function(ecResource){
        return ecResource('library/:id', {id:'@id'});
    }).factory('Acknowledgement', function(ecResource){
        return ecResource('acknowledgement/:id', {id:'@id'});
    }).factory('Shipping', function(ecResource){
        return ecResource('shipping/:id', {id:'@id'});
    }).factory('Transaction', function(ecResource){
        return ecResource('transaction/:id', {id:'@id'});
    });



