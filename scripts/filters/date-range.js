'use strict';

angular.module('employeeApp.filters')
    .filter('dateRange', [function () {
        function filter(date, start, end, success){
            if(start.getTime() <= date.getTime() && date.getTime() <= end.getTime()){
                success();
            }
        }
        function convertToDateObject(arg){
            switch(typeof(arg)){
                case "object":
                    return arg;
                    break;
                case 'string':
                    return new Date(arg);
                    break;
                case 'number':
                    return new Date(arg);
                    break;
                default:
                    return new Date(arg);
                    break;
            }
        }
        return function(array, key, arg1, arg2){
            var predicates = [],
                start = convertToDateObject(arg1),
                end = convertToDateObject(arg2);
            angular.forEach(array, function(item){      
                if(item.hasOwnProperty(key)){
                    if(typeof(item[key]) == 'object'){
                        filter(item[key], start, end, function(){
                            predicates.push(item); 
                        });
                    }else if(typeof(item[key]) == "string"){
                        var testDate = new Date(item[key]);
                        filter(testDate, start, end, function(){
                            predicates.push(item); 
                        });
                    }else if(typeof(item[key]) == "number"){
                        var testDate = new Date(item[key]);
                        filter(testDate, start, end, function(){
                            predicates.push(item); 
                        });
                    }
                } 
            });
            return predicates;
        };
    }]);
