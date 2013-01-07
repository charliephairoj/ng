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
    }).factory('SupplierContact', function(ecResource){
        return ecResource('supplier_contact/:id', {id:'@id'});
    }).factory('Configuration', function(ecResource){
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
    }).
    
    
    /*
     * Current User 
     */
    factory('CurrentUser', function(){
        function user(){
            
        }
        
        user.sayHi = function(){
            window.alert('hi there');
        };
        
        return user;
    }).
    
    
    /*
     * Poller
     */
    factory('Poller', function($timeout){
        function Poller(){
            //Switch
            this.keepPolling;
        }
        
        Poller.poll = function(scope, fn){
            var keepPolling = true;
            //var switch
            //listener to change switch 
            //when the scope is destroyed
            scope.$on('$destroy', function(){
                keepPolling = false;
            });
            
            //loopping function checks switch
            //and runs the fn arg
            function looper(){
                fn();
                if(keepPolling){
                    $timeout(looper, 10000);
                }
            }
            
            //starts loop
            looper();
        };
        
        //STops the polling
        Poller.stop = function(){
            //turn off the switch
            this.keepPolling = false;
        };
        
        return Poller;
        
    }).


    /*
     * Upload Images and returns the url
     */    
    factory('ImageUploader', function(){
        
        function Uploader(){
            
        }
        
    });
    






