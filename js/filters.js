'use strict';

/* Filters */

angular.module('EmployeeCenter.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }]).filter('exclude', function(){
      //Strips the haskey before comparison
      function clean(target){
          var data,temp;
          if(target instanceof Array){
              data = []
              angular.forEach(target, function(item){
                  temp = JSON.parse(JSON.stringify(item));
                  if(temp.$$hashKey){
                      delete temp.$$hashKey;
                  }
                  data.push(temp);
              });
          }else{
              data = JSON.parse(JSON.stringify(target));
              if(data.$$hashKey){
                  delete data.$$hashKey;
              }
             
          }
          
          return data;
      }
      
      //function to compare
      return function(array, targetArray) {
        if (!(array instanceof Array)) return array;
        if (!(targetArray instanceof Array)) return array;
       
        var filtered = [],
            cleanItem, 
            cleanArray = clean(targetArray);
        angular.forEach(array, function(item){
            cleanItem = clean(item);
            if(targetArray.indexOf(item) === -1){
                filtered.push(item);
            }
        });
        
        return filtered;
      };
  });
