/*
 * Declare the standard headers
 */
angular.module('employeeApp').config(function($httpProvider){
      $httpProvider.defaults.headers.post  = {"Cache-Control":"no-cache", "expires":"-1", "pragma":"no-cache"};
      $httpProvider.defaults.headers.get  = {"Cache-Control":"no-cache", "expires":"-1", "pragma":"no-cache"};
  });

  
/*
 * Run top level application code
 */
angular.module('employeeApp').run(function($rootScope, CurrentUser, scanner){
    
    /*
     * Prototypical extension of core classes
     */
    
    //Array: indexById
    /*
    Array.prototype.test = function(arg1){
        if(this.length == 0){
            return -1;
        }
        
        if(typeof(arg1) == 'object'){
            if(!arg1.hasOwnProperty('id')){
                throw new TypeError('Expecting an id property for argument 2');
            }
        } 
        
        //Set the id var
        var id = typeof(arg1) == 'object' ? arg1.id : arg1;
        for(var i in this){
            if(this[i].id == id){
                return i;
            }
        }
        return -1;
    }*/
    
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
