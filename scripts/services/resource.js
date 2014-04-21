
/*
 * Resource Service
 * 
 * The purpose of this service is too provide
 * a wrapper for the native $resource service
 * provided by AngularJS. This resource allows us 
 * to interface with the storage service and prepopulat
 * the response before updating with the response 
 * from the server.
 * 
 * The service must all be able to poll and used the 
 * 'last-modified' key to retrieve the most recent version
 * of data
 * 
 * Capabilities:
 * 
 * -Perform basic GET, PUT, POST and DELETE operations
 * -prepopulate the response with data from the storage
 *  service
 * 
 * Structure and Cycle:
 * 
 * The intended structure and cycle of the resource is
 * 1. A GET request is made to retrieve an item or an
 *    array of items
 *    -If there is already prexisting data then retrieve
 *     the data from the storage and respond
 *    -When the server responsds update the returned data
 *     by finding the id and then updating the item
 * 2. Save the last-checked time to be used later for polling
 * 3. Returns a new Resource that prototypically inherits from
 *    the parent. 
 * 4. Save the resource should call the underlying request from 
 *    the parent. 
 * 
 * Properties:
 * 
 * -$$poll: If true begin a timeout based
 *      repeated calling of the initial function
 * -$$last_checked: Date and Time of the last GET
 *      request made to the server that was successful
 * -$$timeout: Hold the reference to the current timeout
 * 
 * Public Methods:
 * 
 * Parent Methods:
 * -poll()
 * -get()
 * -query()
 * -save()
 * -delete()
 * 
 * Child Methods:
 * -$save()
 * -$delete()
 * -$get()
 * -$query()
 */
angular.module('employeeApp.services')
.factory('eaResource', ['DB', 'Notification', '$resource', '$q',
function(DB, Notification, $resource, $q) {
	
	var DEFAULT_ACTIONS = {'get':    {method:'GET'},
                           'save':   {method:'POST'},
                           'update': {method:'PUT'},
                           'query':  {method:'GET', isArray:true},
                           'remove': {method:'DELETE'},
                           'delete': {method:'DELETE'}};
	
	function Resource (url, params, methods) {
		var resource = $resource(url, params, methods);
		
		//angular.extend(methods, DEFAULT_ACTIONS);
		angular.forEach(methods, function (params, action) {
			console.log(action);
			var actionName = params.method == 'GET' ? action : '$' + action;
			if (params.method == 'GET') {
				this[actionName] = function (params, callback, errback) {
					var reference = resource[actionName](params, callback, errback);
					
					return reference;
				};
				
			} else {
				this[actionName] = function (params, callback, errback) {
					
				};
			}
		});
	}
	
	function ResourceFactory () {
		
		return new Resource();
	}
	
	return ResourceFactory;
}]);
