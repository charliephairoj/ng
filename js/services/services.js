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
    }).factory('Glue', function(ecResource){
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
        
    }).
    
    
    /*
     * Notification Service
     */
    factory('Notification', function($timeout){
        
        function center(target){
            var width = $(window).width();
            var tWidth = $(target).width();
            if($(target).css('left')==0){
                $(target).css('left', width-tWidth);
            }else{
                $(target).css('margin-left', -(tWidth/2));
            }
        }
        
        function Notifier(){
            this.notification = angular.element('#notification');
            console.log(this.notification);
            this.promise = null;
        }
        
        
        /*
         * The display function will display a new messge
         * And call a timeout after a certain amount of time
         * to fade out the message. If the message is already displayed,
         * it will just change the message and cancel the old timeout.
         */
        Notifier.prototype.display = function(message, autoHide){
            
            //Change message and 
            this.notification.html(message)
            center(this.notification);
            this.notification.addClass('active')
            
            //Cancels the fadingout and 
            //removal of message
            if(this.promise){
                $timeout.cancel(this.promise);
            }
            
            if(autoHide!=false){
               
                this.promise = $timeout(function(){
                    this.hide()
                    
                }.bind(this), 1000);
            }
        };
        
        Notifier.prototype.hide = function(){
            console.log(this);
            //Remove Message and 
            this.notification.removeClass('active');
        };
        
        return new Notifier();
        
        
    }).factory('dateParser', function($q) {      
       return function(promise) {
           return promise.then(function(response){
               
               var data = response.data;
               if(angular.isArray(data)){
                    for(var i=0; i<data.length; i++){
                        if(data[i].hasOwnProperty('delivery_date')){
                            data[i].delivery_date = new Date(data[i].delivery_date);
                        }
                        if(data[i].hasOwnProperty('time_created')){
                            data[i].time_created = new Date(data[i].time_created);
                        }
                    }
               }else if(angular.isObject(data)){
                    if(data.hasOwnProperty('delivery_date')){
                        data.delivery_date = new Date(data.delivery_date);
                    }
                    if(data.hasOwnProperty('time_created')){
                        console.log('ok');
                        data.time_created = new Date(data.time_created);
                    }
               }
               
               response.data = data;
               console.log(response);
               return response;
           }, function(){
               
           });
       };
}).config(function($httpProvider){
    $httpProvider.responseInterceptors.push('dateParser');
});;
    






