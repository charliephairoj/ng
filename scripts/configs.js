/*
 * Declare the standard headers
 */
angular.module('employeeApp').config(function($httpProvider){
    $httpProvider.defaults.headers.post  = {
    	"Cache-Control":"no-cache", 
    	"expires":"-1", "pragma":"no-cache",
    	"Content-Type": "application/json"
   	};
    $httpProvider.defaults.headers.get  = {"Cache-Control":"no-cache", "expires":"-1", "pragma":"no-cache"};
      
    /*
     * Takes out the objects from the data 
     */
    $httpProvider.defaults.transformResponse.push(function(data, headers) {
    	if(typeof(data) == 'object') {
    		if (data.hasOwnProperty('meta') && data.hasOwnProperty('objects')) {
    			console.log(data)
    			return data.objects
    		}
    	}
    	
      	return data	
    });
  });

  
/*
 * Run top level application code
 */
angular.module('employeeApp').run(function($rootScope, CurrentUser, scanner){
    
    /*
     * Prototypical extension of core classes
     */
    
    //Array: indexById
    
    Array.prototype.indexOfById = function(needle) {
    	needle = typeof(needle) == "object" ? needle.hasOwnProperty('id') ? needle.id : null : needle;
    	var haystack = this;
		for(var i=0; i < haystack.length; i++) {
			if(haystack[i].id == needle){
				return i;
			}
		}
		return -1;
	}
    
    
    $rootScope.safeApply = function(fn){
        if(!this.$$phase){
            this.$apply(fn);
        }else{
            this.$eval(fn)
        }
    };
    
    $rootScope.currentUser = CurrentUser;
    
    scanner.enable();
});
