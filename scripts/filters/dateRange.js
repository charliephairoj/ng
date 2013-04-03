angular.module('EmployeeCenter.filters').
    filter('dateRange', function(){
        function filter(date, start, end, success){
            if(start.getTime() <= date.getTime() && date.getTime() <= end.getTime()){
                success();
            }
        }
        return function(array, key, start, end){
            var predicates = [];
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
                    }
                } 
            });
            return predicates;
        };
    });
