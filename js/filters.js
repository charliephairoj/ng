'use strict';

/* Filters */

angular.module('EmployeeCenter.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }]).filter('exclude', function(){
      
      function compareObject(item, target){
          var key;
          for(key in item){
            if(target.hasOwnProperty(key)){
                if(key!='$$hashKey'){
                    if(typeof item[key] == 'object' && typeof target[key]== 'object'){
                        if(!compareObject(item[key], target[key])){
                            return false;
                        }
                    }else{
                        if(item[key] != target[key]){
                            
                            return false;
                        } 
                    }  
                }
                    
            }else{
                return false;
            }
          }
          
          return true;
      }
      
      function compare(targetArray, target){
          var i = 0;
          for(i; i<targetArray.length; i++){
               console.log(compareObject(target, targetArray[i]))
              if(compareObject(target, targetArray[i])){
                  return true;
              }
          }
          
          return false;
      }
      //function to compare
      return function(array, targetArray) {
        if (!(array instanceof Array)) return array;
        if (!(targetArray instanceof Array)) return array;
       
        var filtered = [],
            cleanItem, 
            cleanArray = angular.fromJson(angular.toJson(targetArray));
        angular.forEach(array, function(item, index){
            cleanItem = angular.fromJson(angular.toJson(item));
            if(index==0){
                //console.log(compare(cleanArray, cleanItem));
            }
            
            if(!compare(cleanArray, cleanItem)){
                filtered.push(item);
            }
        });
        return filtered;
      };
  });
