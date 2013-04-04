'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('ecResource', ['ngResource']).
    
    
    
    /*
     * This function creates the resouces that is used for all of the model communications with 
     * the server and the client side storage
     * 
     * the communication with the server requires the ngResource and $resource. The namespace for the 
     * entire object is given by the param on creation. The client side storage currently implements:
     *    localStorage
     * 
     * The object is structured into initial function available to the actual resource and the 
     * prototypical models available to all items made from the resource
     * 
     * The return resource itself has the methods: query, clear
     * 
     * The children objects have the prototypical methods :$save, $delete, query, 
     */
    factory('ecResource', function($storage, $rootScope, $http, $q, $parse, $resource){
        
        
        function ResourceFactory(url, paramDefaults, actions){
         
            var DEFAULT_ACTIONS = {'get':    {method:'GET'},
                                   'save':   {method:'POST'},
                                   'update': {method:'PUT'},
                                   'query':  {method:'GET', isArray:true},
                                   'remove': {method:'DELETE'},
                                   'delete': {method:'DELETE'}},
                oResource,
                storage = $storage(url.split(/\//g)[0]),
                value,
                poll = false,
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
            //Assign original and new resource
            oResource = new $resource(url, paramDefaults, actions);
            function Resource(value){
                angular.extend(this, value || {});
                this.$$poll = false;
                this.$$last_checked = false;
                this.$$timeout;
                this.$$date = true;
            }
            
            /*
             * Set Date for when doing mock tests
             */
            Resource.disableDate = function(){
                this.$$date = false;
            }
            Resource.prototype.disableDate = Resource.disableDate;
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
                poll = false;
                return this;
            }
            Resource.prototype.poll = Resource.poll;
            
            //Loop through actions
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
                    if(action.isArray){
                        value = value || [];
                    }else{
                        value = value || {};
                    }
                    value['$$marker'] = 'poop';
                    //Runs storage mechanism if exists
                    if(storage[name]){
                        //Determines if param or data is used
                        var storageData = hasBody ? storage[name](data) || value : storage[name](params) || value;
                        //Determines if array or not when creating resource
                        if(action.isArray){
                            angular.forEach(storageData, function(item, index){
                                var index = indexOfId(value, item.id);
                                if(index>-1){angular.extend(value[index], new Resource(item));}
                                index > -1 ? angular.extend(value[index], new Resource(item)) : value.push(new Resource(item));
                            })
                        }else{
                            angular.extend(value, new Resource(storageData));
                        }
                        //Copies storage data with key to self
                        if(hasBody) {angular.extend(value, this);}
                    }
                    
                    /*
                     * Determines whether to include the last modified parameter depending
                     * on whether the 'last_checked' var has a value or not
                     */
                    if(this.$$last_checked && action.method == "GET" && poll){ 
                        angular.extend(params, {last_modified:this.$$last_checked.toISOString()})
                    }
                    if(storage.getLastModified()){
                        angular.extend(params, {last_modified:storage.getLastModified().toISOString()});
                    }
                    var oPromise = oResource[name](params, data, function(response){
                        //save data to storage
                        action.method == "DELETE" ? storage.remove(params) : storage.save(response);  
                        //copy data to body
                        if(action.method == "DELETE" || hasBody){angular.extend(this, response);}
                        //pass data to placeholder
                        if(action.isArray){
                            //Reset array
                            var index;
                            angular.forEach(response, function(item){
                                var index = indexOfId(value, item.id);
                                if(index > -1){
                                    angular.extend(value[index], item);
                                }else{
                                    value.push(new Resource(item)); 
                                }
                                
                            });
                        }else{
                            angular.extend(value, new Resource(response));
                        }
                        
                        this.$$last_checked = new Date();
                        storage.saveLastModified(this.$$last_checked);
                        if(poll && action.method == "GET"){
                            this.$$timeout = setTimeout(Resource[name], 5000);
                        }
                        console.log(value.length);
                        //execute callback
                        success(response);
                    }.bind(this), function(e){console.log(e);});
                    //return placeholder
                    
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
    });
    



