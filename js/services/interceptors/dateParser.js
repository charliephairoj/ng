angular.module('EmployeeCenter.services')
    .factory('dateParser', function($q) {      
       return function(promise) {
           function formatter(obj){
               if(obj.hasOwnProperty('delivery_date')){
                   obj.delivery_date = new Date(obj.delivery_date);
               }
               if(obj.hasOwnProperty('time_created')){
                   obj.time_created = new Date(obj.time_created);
               }
               if(obj.hasOwnProperty('last_login')){
                   obj.last_login = new Date(obj.last_login);
               }
               return obj
           }
           return promise.then(function(response){
               var data = response.data;
               if(angular.isArray(data)){
                    for(var i=0; i<data.length; i++){
                        data[i] = formatter(data[i]);
                    }
               }else if(angular.isObject(data)){
                    data = formatter(data);
               }
               response.data = data;
               return response;
           }, function(){
               
           });
       };
}).config(function($httpProvider){
    $httpProvider.responseInterceptors.push('dateParser');
});
