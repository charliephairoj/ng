angular.module('EmployeeCenter.filters', []).
    filter('dateFilter', function(){
        function filter(item, target, comparison, success){
            switch(comparison){
                case "equals":
                    if((item.getMonth() == target.getMonth()) && (item.getYear() == target.getYear()) && (item.getDate() = target.getDate())){
                        success();
                    }
                    break;
                case "greater":
                    if(item.getTime() >= target.getTime()){
                        success();
                    }
                    break;
                case "less":
                    if(item.getTime() <= target.getTime()){
                        success();
                    }
                    break;
                default:
                    if((item.getMonth() == target.getMonth()) && (item.getYear() == target.getYear()) && (item.getDate() = target.getDate())){
                        success();
                    }
                    break;
            }
                
        }
        return function(array, key, date, comparison){
            var predicates = [];
            angular.forEach(array, function(item){      
                if(item.hasOwnProperty(key)){
                    if(typeof(item[key]) == 'object'){
                        filter(item[key], date, comparison, function(){
                            predicates.push(item); 
                        });
                    }else if(typeof(item[key]) == "string"){
                        var testDate = new Date(item[key]);
                        filter(testDate, date, comparison, function(){
                            predicates.push(item); 
                        });
                    }
                } 
            });
            return predicates;
        };
    });
