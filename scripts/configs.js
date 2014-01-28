/*
 * Declare the standard headers
 */
angular.module('employeeApp').config(function ($httpProvider) {
    $httpProvider.defaults.headers.post  = {
		"Cache-Control":"no-cache", 
		"expires":"-1", 
		"pragma":"no-cache",
		"Content-Type": "application/json"
	};
    $httpProvider.defaults.headers.get  = {"Cache-Control":"no-cache", "expires":"-1", "pragma":"no-cache"};
      
    /*
     * Takes out the objects from the data 
     */
    $httpProvider.defaults.transformResponse.push(function(data, headers) {
		if (typeof(data) == 'object') {
			if (data.hasOwnProperty('meta') && data.hasOwnProperty('objects')) {
				return data.objects;
			}
		}
		return data;
	});
});

  
/*
 * Run top level application code
 */
angular.module('employeeApp').run(function($rootScope, CurrentUser, scanner, $http){
	
	/*
	 * Get the current user and place it at the top scope
	 */
	$rootScope.currentUser = new CurrentUser();
    
    /*
     * Prototypical extension of core classes
     */
    
    //Array: indexById
    
    Array.prototype.indexOfById = function(needle) {
		needle = typeof(needle) == "object" ? needle.hasOwnProperty('id') ? needle.id : null : needle;
		var haystack = this;
		for (var i=0; i < haystack.length; i++) {
			if (haystack[i].id == needle) {
				return i;
			}
		}
		return -1;
	};
    
    /*
     * Finding a key by value
     * 
     * This function finds the first instance of a key 
     * based on the value provided
     */
   
    
    $rootScope.safeApply = function(fn){
		var phase = this.$root.$$phase;
		if (phase == '$apply' || phase == '$digest') {
			if(fn && (typeof(fn) === 'function')) {
				fn();
			}
		} else {
			this.$apply(fn);
		}
    };
    
    
    /*
     * Set values and objects that are used throughout
     * the application
     */
    
    $rootScope.units = {
		'in': "Inch",
		cm: 'Centimeter',
		m: 'Meter',
		mm: 'Millimeter',
		yd: 'Yard',
		kg: 'Kilogram',
		pack: 'Pack',
		container: 'Container',
		pc: 'Piece',
	};
    scanner.enable();
});
