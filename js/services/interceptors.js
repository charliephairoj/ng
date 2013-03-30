

/*
angular.module('EmployeeCenter', []).factory('dateParser', function($q) {      
       return function(promise) {
           return promise.then(function(response){
               console.log(response);
               /*
               var data = response.data;
               if(angular.isArray(data)){
                    for(var i=0; i<data.length; i++){
                        if(data[i].hasOwnProperty('delivery_date')){
                            data[i].delivery_date = new Date(data[i].delivery_date);
                        }else if(data[i].hasOwnProperty('time_created')){
                            data[i].time_created = new Date(data[i].time_created);
                        }
                    }
               }else if(angular.isObject(response)){
                    if(data.hasOwnProperty('delivery_date')){
                        data.delivery_date = new Date(data.delivery_date);
                    }else if(data.hasOwnProperty('time_created')){
                        data.time_created = new Date(data.time_created);
                    }
               }
               
               response.data = data;
               return response;
           }, function(){
               
           });
       };
}).config(function($httpProvider){
    $httpProvider.responseInterceptors.push('dateParser');
});
    
    
    */
