'use strict';

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
  .factory('eaResource', ['eaStorage', '$rootScope', '$http', '$q', '$parse', '$resource', '$timeout',
  function(eaStorage, $rootScope, $http, $q, $parse, $resource, $timeout) {
      function ResourceFactory(url, paramDefaults, actions){
            //Default methods available to the public
            var DEFAULT_ACTIONS = {'get':    {method:'GET'},
                                   'save':   {method:'POST'},
                                   'update': {method:'PUT'},
                                   'query':  {method:'GET', isArray:true},
                                   'remove': {method:'DELETE'},
                                   'delete': {method:'DELETE'}},
                oResource = new $resource(url, paramDefaults, actions),
                storage = eaStorage(url.split(/\//g)[0]),
                value,
                previousAction,
                last_checked = true,
                poll = true,
                getter = function(obj, path) {
                    return $parse(path)(obj);
                };
                
            /*Helper Functions*/
            function extractParams(data, actionParams){
                var ids = {};
                actionParams = angular.extend({}, paramDefaults, actionParams);
                angular.forEach(actionParams, function(value, key){
                    if (angular.isFunction(value)) { value = value(); }
                    ids[key] = value.charAt && value.charAt(0) == '@' ? getter(data, value.substr(1)) : value;
                });
                return ids;
            }
            
            /*
             * Locates the index of an object
             * which matches the supplied id
             */
            function indexOfId(array, id){
                for(var i=0; i<array.length; i++){
                    if(array[i].hasOwnProperty('id')){
                        if(array[i].id == id){
                            return i;
                        }
                    }
                }
                return -1;
            }
            
            //Extend all actions to include default and argument actions
            actions = angular.extend({}, DEFAULT_ACTIONS, actions);
            
            /*
             * Initialize the Resource the properties
             */
            function Resource(value){
                angular.extend(this, value || {});
                this.$$poll = false;
                this.$$last_checked;
                this.$$timeout;
                this.$$date = true;
            }
            
            /*
             * Set Date for when doing mock tests
             */
            Resource.disableLastChecked = function(){
                last_checked = false;
            }
            Resource.prototype.disableLastChecked = Resource.disableLastChecked;
            /*
             * Create a polling function. When the polling function 
             * is call the poll value will be set to true
             */
            Resource.poll = function(){ 
                this.$$poll = true;
                poll = true;
                return this;
            }
            Resource.prototype.poll = Resource.poll;
            
            Resource.stopPolling = function(){
                this.$$poll = false;
                poll = false;
                return this;
            }
            Resource.prototype.poll = Resource.poll;
            
            /*
             * Loop through all the actions and assign them 
             * as methods to the Resource and process the data
             * and the params for each method
             */
            angular.forEach(actions, function(action, name){
                var hasBody = action.method == 'POST' || action.method == 'PUT' || action.method == 'PATCH';
                //Default methods
                Resource[name] = function(a1, a2, a3, a4){
                    var params = {};
                    var data;
                    var success = angular.noop;
                    var error = null;
                    var promise;
        
                    switch(arguments.length) {
                        case 4:
                            error = a4;
                            success = a3;
                        //fallthrough
                        case 3:
                        case 2:
                            if (angular.isFunction(a2)) {
                                if (angular.isFunction(a1)) {
                                    success = a1;
                                    error = a2;
                                    break;
                                }
            
                                success = a2;
                                error = a3;
                          //fallthrough
                            } else {
                                params = a1;
                                data = a2;
                                success = a3;
                                break;
                            }
                        case 1:
                            if (angular.isFunction(a1)) success = a1;
                            else if (hasBody) data = a1;
                            else params = a1;
                            break;
                        case 0: break;
                        default:
                            throw "Expected between 0-4 arguments [params, data, success, error], got " +
                                arguments.length + " arguments.";
                    }
                    
                    /*
                     * RESETTING AREA:
                     * 
                     * This area will reset the settings of the call if the previous 
                     * action does not meet the current action. We do this in the case 
                     * of polling where the action is the same as before.
                     */
                    if (previousAction != name) {
                        this.$$last_checked = undefined;
                    }
                    /*
                     * CRTICIAL COMPONENT:
                     * 
                     * This part will determine whether to set the return referenced as an 
                     * array, object, or to keep it in its current state. This is crucial 
                     * for when polling is activated. 
                     */
                    
                    if(action.isArray){
                        value = angular.isArray(value) ? value || [] : [];
                    }else{
                        value = angular.isObject(value) && !value.hasOwnProperty('length') ? value || {} : {};
                    }
                    
                    /*
                     * Preload data from the storage if the action method is
                     * a GET call
                     */
                     if (action.method == "GET" && !this.$$last_checked) {
                         if (action.isArray) {
                             //Iterate and return new Resources as an array
                             storage.iterate(function(item){
                                 //Loop for existing item in value
                                 var index = indexOfId(value, item);
                                 if (index != -1) {
                                     /*
                                      * In order not to waste resource we
                                      * first check if the two items are equal or not.
                                      * If they are not equal then we perform an extend
                                      */
                                     if (!angular.equals(value[index], item)) {
                                         angular.extend(value[index], item);
                                     }
                                     
                                 } else {
                                     //Add new resource
                                     value.push(new Resource(item));
                                 }
                                 
                             })
                         } else {
                             //Set Reference as new Resource
                             value = new Resource(storage.get(params.id));
                         }
                     }
                     
                    /*
                     * Determines whether to include the last modified parameter depending
                     * on whether the 'last_checked' var has a value or not
                     */ 
                    //dump((this.$$last_checked && typeof(this.$$last_checked) != "boolean") && action.method == "GET")
                    if(this.$$last_checked != undefined && action.method == "GET"){ 
                        angular.extend(params, {last_modified:this.$$last_checked.toISOString()});
                    }
                    /*
                    if(storage.getLastModified() && action.method == "GET"){
                        angular.extend(params, {last_modified:storage.getLastModified().toISOString()});
                    }
                    */
                    var oPromise = oResource[name](params, data, function(response){
                        /*
                         * If the hasBody is positive, it indicates this is a child
                         * resource and there for the resource it self should be update
                         * with the data because it is currently presented tot he user
                         */
                        if(action.method == "DELETE" || hasBody){angular.extend(this, response);}
                        //console.log('action: '+name+'  method: '+action.method+'  response: '+response+'  value: '+value);
                        /*
                         * If the method is GET it indicates that the user has requested 
                         * data and the resource is a gateway and it itself is no the the
                         * data holder. There for the reference that is returned to the user 
                         * should be update with either the array of items or the item data
                         * respecitvely.
                         */
                        if (action.method === "GET") {
                            if(action.isArray || angular.isArray(response)){
                                
                                var index;
                                angular.forEach(response, function(item){
                                    //Find the index of the matched item by id
                                    index = indexOfId(value, item.id);
                                    
                                    if(index > -1){
                                        /*
                                        * In order not to waste resource we
                                        * first check if the two items are equal or not.
                                        * If they are not equal then we perform an extend
                                        */
                                        if (!angular.equals(value[index], new Resource(item))) {
                                            value[index] = new Resource(item);
                                        }
                                        
                                    }else{
                                        //Add the new item
                                        value.push(new Resource(item)); 
                                    }
                                    
                                });
                            }else{
                                //Upate the reference with the data
                                angular.extend(value, response);
                            }
                        }
                        
                        /*
                         * Determines whether the action is to delete from the server
                         * or to post and get data. Because post and get data would 
                         * both return responses we would save this to the storage. 
                         * For delete requests, we would have to delete the item
                         */
                      
                        action.method == "DELETE" ? storage.remove(params) : hasBody ? storage.save(this) : storage.save(value);  
                        
                        /*
                         * Last checked
                         */
                        if(last_checked){
                            
                            this.$$last_checked = new Date();
                        }
                        
                        /*
                         * The Resource will check if to poll the server only if
                         * the action method is a GET and the $$poll swtich is turned
                         * on. 
                         * 
                         * The request itself is incapsulated in an anonymous function
                         * so that we can pass arguments and bind 'this'
                         */
                        if(this.$$poll && action.method == "GET"){
                            //Call timeout
                            this.$$timeout = $timeout(function(){
                                //Create binded fn
                                var request = Resource[name].bind(this);
                                //call binded fn
                                request(params, data, success, error);
                            }.bind(this), 30000);
                        }   
                        //Run success call back
                        success(response);
                    }.bind(this), function(e){console.log(e);});
                    //return placeholder
                    
                    /*
                     * We set what action just took place
                     * so that we may know if to change
                     * the settings of the current action
                     */
                    previousAction = name;
                    
                    //Return the reference
                    return value;
                    
                    
                }
                
                //Prototypical methods
                Resource.prototype['$'+name] = function(a1, a2, a3){
                    var params = extractParams(this),
                        success = angular.noop,
                        error;
        
                    switch(arguments.length) {
                        case 3: params = a1; success = a2; error = a3; break;
                        case 2:
                        case 1:
                            if (angular.isFunction(a1)) {
                                success = a1;
                                error = a2;
                            } else {
                                params = a1;
                                success = a2 || angular.noop;
                            }
                        case 0: break;
                        default:
                            throw "Expected between 1-3 arguments [params, success, error], got " +
                              arguments.length + " arguments.";
                    }
                    var data = hasBody ? this : undefined;
                    Resource[name].call(this, params, data, success, error);
                }
            });
            
            return Resource;
        }
        return ResourceFactory;
  }]);
