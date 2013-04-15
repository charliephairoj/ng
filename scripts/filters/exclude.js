'use strict';

angular.module('employeeApp.filters')
    .filter('exclude', [function () {
        //function to compare
          return function(array, targetArray) {
            if (!(array instanceof Array)) {return []};
            if (!(targetArray instanceof Array)) {targetArray = [targetArray]}
           
            var filtered = [],
                i;
            angular.forEach(array, function(item){
                for(i=0; i<targetArray.length; i++){
                    if(!angular.equals(item, targetArray[i]) && i===targetArray.length-1){
                        filtered.push(item);
                        break;
                    }  
                }
            });
            return filtered;
          };
    }]);
