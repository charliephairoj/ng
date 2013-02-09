'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('ecResource', ['ngResource']).
    
    factory('$storage', function(){
        
        function storageFactory(key){
            //Create the main factory
            function StorageEngine(key){
                //ASSIGNS KEY TO OBJECT
                this.key = key;
                //CHECKS IF SUPPORTS LOCALSTORAGE
                if('localStorage' in window && window['localStorage']!== null){
                     this.storage = window.localStorage;
                     this.getKeys();
                }    
                 
            }
            
           
            
            //determines if storage works
            StorageEngine.prototype.isSupported = function(){
                try {
                    return 'localStorage' in window && window['localStorage'] !== null;
                }catch(e){
                    return false;
                }
            };
            
            /*
             * The following methods deal with the key and 
             * array of keys that holds the ids for individual 
             * objects under this key.
             */
            
            //Create a key
            StorageEngine.prototype.createKeysArray = function(){
                this.keys = [];
                this.saveKeys();
                return this.keys;
            };
            
            //Save keys
            StorageEngine.prototype.saveKeys = function(){
                typeof(this.keys) === 'object' ? this.storage.setItem(this.key, JSON.stringify(this.keys)) : this.createKeysArray();
            };
            
            //Save a key
            StorageEngine.prototype.saveKey = function(arg){
                
                var tempKey = this.key+arg;
                
                //CHECK IF keys is valid
                this.keys = this.keys || this.createKeysArray();
     
                //Checks for duplicates
                if(this.keys.indexOf(tempKey)===-1){
                    this.keys.push(tempKey);
                    this.saveKeys();
                }
                
                return tempKey;
            };
            
            //Retrieve all keys
            StorageEngine.prototype.getKeys = function(){
                
                //Get keys
                this.keys = JSON.parse(this.storage.getItem(this.key));
                //If keys are not an array, create an array to hold keys
                if(typeof(this.keys) != 'object'){
                    //Create an for keys and saves it
                    this.createKeysArray();
                } 
               
                return this.keys;
                
            };
            
            //Delete a key
            StorageEngine.prototype.deleteKey = function(key){
                
                //Checks whether keys are valid
                this.keys = this.keys || this.getKeys();
                
                var index = this.keys.indexOf(key);
                if(index!= -1){
                    this.keys.splice(index);
                    this.saveKeys();
                    return true;
                }else{
                    return false;
                }
            };
            
            //Clear Keys
            StorageEngine.prototype.clearKeys = function(){
                
                this.keys = [];
                this.storage.setItem(this.key, JSON.stringify(this.keys));
            };
            
            //Get a key
            StorageEngine.prototype.getKey = function(arg){
                //CREATE TEMPORARY KEY
                var tempKey = this.key + arg,
                    index;
                //Checks index of key and 
                //If a key is present return is
                if(!this.keys){
                    this.createKeysArray();
                }
                index = this.keys.indexOf(tempKey);
                //Returns key or null
                return (index !== -1) ? this.keys[index] : null; 
            };
            
            /*
             * The following methods deal with the actual retrieving, storing
             * and delete of the object themselves represented by the keys
             */
            
            //querya all items of name space
            StorageEngine.prototype.query = function(){
                
                //checks storage of keys exists
                if(this.keys === null || !this.keys || this.keys.length===0){
                    
                    return null;
                    
                }
                
                //create array to hold data
                var data = [], i;
                //iterate through all the keys
                for(i in this.keys){
                    data.push(JSON.parse(this.storage.getItem(this.keys[i])));
                }
                //return the data
                return data;
                
            };
            
            //Save item into storage
            StorageEngine.prototype.save = function(data){
                
                var itemKey;
                
                 if(data.hasOwnProperty('id')){
                     itemKey = this.saveKey(data.id);
                     this.storage.setItem(itemKey, JSON.stringify(data));
                 }
            };
            
            //Get an item from storage
            StorageEngine.prototype.get = function(args){
                
                var itemKey;
                //CHECKS IF THE ARG
                if(args.id){
                    //Get Item Key
                    itemKey = this.getKey(args.id);
                }
                //returns item or null if not found
                return itemKey ? JSON.parse(this.storage.getItem(itemKey)) : null;
                   
                    
            };
            
         
            //Remove an Item from storage
            StorageEngine.prototype.remove = function(args){
                //declare vars
                var itemKey;
                //checks if object has an id
                if(args.hasOwnProperty('id')){
                    //get item key from id
                    itemKey = this.getKey(args.id);
                    //delete item and item key
                    this.storage.removeItem(itemKey);
                    this.deleteKey(itemKey);
                    
                    return true;
                //returns false is has no id
                }else{
                    return false;
                }
            };
            
            StorageEngine.prototype.delete = StorageEngine.remove;
            
            //Clear Items
            StorageEngine.prototype.clear = function(){
                
                var index;
                //clear items
                for(index in this.keys){
                    this.storage.removeItem(this.keys[index]);
                }
                //clear keys
                this.clearKeys();
                
            };
            
            return new StorageEngine(key);
        }
        
        return storageFactory;
        
        
    }).
    
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
    factory('ecResource', function($storage, $rootScope, $http, $q, $parse){
        /*
         * Helper functions that are given new names to make the code more concise
         */
        var forEach = angular.forEach,
            copy = angular.copy,
            extend = angular.extend,
            noop = angular.noop,
            isFunction = angular.isFunction,
            getter = function(obj, path) {
              return $parse(path)(obj);
            },
            hasBody = function(obj){
                return typeof(obj) === "object";
               
            };
        
        /**
         * We need our custom method because encodeURIComponent is too aggressive and doesn't follow
         * http://www.ietf.org/rfc/rfc3986.txt with regards to the character set (pchar) allowed in path
         * segments:
         *    segment       = *pchar
         *    pchar         = unreserved / pct-encoded / sub-delims / ":" / "@"
         *    pct-encoded   = "%" HEXDIG HEXDIG
         *    unreserved    = ALPHA / DIGIT / "-" / "." / "_" / "~"
         *    sub-delims    = "!" / "$" / "&" / "'" / "(" / ")"
         *                     / "*" / "+" / "," / ";" / "="
         */
        function encodeUriSegment(val) {
          return encodeUriQuery(val, true).
            replace(/%26/gi, '&').
            replace(/%3D/gi, '=').
            replace(/%2B/gi, '+');
        }
    
    
        /**
         * This method is intended for encoding *key* or *value* parts of query component. We need a custom
         * method becuase encodeURIComponent is too agressive and encodes stuff that doesn't have to be
         * encoded per http://tools.ietf.org/html/rfc3986:
         *    query       = *( pchar / "/" / "?" )
         *    pchar         = unreserved / pct-encoded / sub-delims / ":" / "@"
         *    unreserved    = ALPHA / DIGIT / "-" / "." / "_" / "~"
         *    pct-encoded   = "%" HEXDIG HEXDIG
         *    sub-delims    = "!" / "$" / "&" / "'" / "(" / ")"
         *                     / "*" / "+" / "," / ";" / "="
         */
        function encodeUriQuery(val, pctEncodeSpaces) {
          return encodeURIComponent(val).
            replace(/%40/gi, '@').
            replace(/%3A/gi, ':').
            replace(/%24/g, '$').
            replace(/%2C/gi, ',').
            replace((pctEncodeSpaces ? null : /%20/g), '+');
        }
    
        function Route(template, defaults) {
          this.template = template = template + '#';
          this.defaults = defaults || {};
          var urlParams = this.urlParams = {};
          forEach(template.split(/\W/), function(param){
            if (param && template.match(new RegExp("[^\\\\]:" + param + "\\W"))) {
              urlParams[param] = true;
            }
          });
          this.template = template.replace(/\\:/g, ':');
        }
    
        Route.prototype = {
          url: function(params) {
            var self = this,
                url = this.template,
                val,
                encodedVal;
    
            params = params || {};
            forEach(this.urlParams, function(_, urlParam){
              val = params.hasOwnProperty(urlParam) ? params[urlParam] : self.defaults[urlParam];
              if (angular.isDefined(val) && val !== null) {
                encodedVal = encodeUriSegment(val);
                url = url.replace(new RegExp(":" + urlParam + "(\\W)", "g"), encodedVal + "$1");
              } else {
                url = url.replace(new RegExp("(\/?):" + urlParam + "(\\W)", "g"), function(match,
                    leadingSlashes, tail) {
                  if (tail.charAt(0) == '/') {
                    return tail;
                  } else {
                    return leadingSlashes + tail;
                  }
                });
              }
            });
            url = url.replace(/\/?#$/, '');
            var query = [];
            forEach(params, function(value, key){
              if (!self.urlParams[key]) {
                query.push(encodeUriQuery(key) + '=' + encodeUriQuery(value));
              }
            });
            query.sort();
            url = url.replace(/\/*$/, '');
            return url + (query.length ? '?' + query.join('&') : '');
          }
        };
        
        var DEFAULT_ACTIONS = {
            'get':    {method:'GET'},
            'save':   {method:'POST'},
            'query':  {method:'GET', isArray:true},
            'remove': {method:'DELETE'},
            'delete': {method:'DELETE'}
        };
        
        
        
        
        /*
         * Resource Factory creates the resource and applies the correct
         * url, params and methods, along with prototype methods that it's 
         * children will need.
         */
        
        function ResourceFactory(url, defaultParams, actions){
            var namespace = url.split('/')[0].toLowerCase(),
                storage = $storage(namespace);
            /*
             * Copied from Angular source code for resource
             */
            function extract_params(data, actionParams){
                var ids = {};
                actionParams = extend({}, actionParams);
                forEach(actionParams, function(value, key){
                  if (isFunction(value)) { value = value(); }
                  ids[key] = value.charAt && value.charAt(0) == '@' ? getter(data, value.substr(1)) : value;
                });
                return ids;
              }
            //Create Route class
            var route = new Route(url);
            //Combine all actions
            actions = extend({}, DEFAULT_ACTIONS, actions);
            
            /*
            //Get the namespace
            var namespace = targetUrl.split('/')[0].toLowerCase(),
                storage = $storage(namespace);
            
            
            
             * Initial creation of the resouce. Created here so that can be used in query
             * methods
             */
            
            //Create resource object
            function Resource(data){
                
                 angular.copy(data, this);
                 
            }
            
            forEach(actions, function(action, name){
                
                
                Resource[name] = function(a1, a2, a3, a4){
                    //Declare Vars
                    var success,
                        error,
                        data,
                        params = {},
                        deferred = $q.defer(),
                        promise = deferred.promise,
                        value;
                    //Set Value properties
                    
                    //Assign args based on args length                       
                    switch(arguments.length){
                        case 4:
                            params = a1;
                            data = a2;
                            error = a4;
                            success = a3;
                           //fallthrough
                        case 3:
                        case 2:
                            if (isFunction(a2)) {
                                if (isFunction(a1)) {
                                    success = a1;
                                    error = a2;
                                    break;
                                }else{
                                    success = a2;
                                    error = a3;
                                    break;
                                }
                                  //fallthrough
                                } else {
                                  params = a1;
                                  data = a2;
                                  success = a3;
                                  break;
                                }
                          case 1:
                              if (isFunction(a1)){
                                  success = a1;
                              }else{
                                  if (hasBody){
                                    data = a1;
                                  }else{ 
                                      params = a1;
                                  }
                              } 
                              break;
                    }
                    
                    //Set Value properties
                    action.isArray ? (value = []) : (value = new Resource(data));
                    value.$q = promise;
                    value.$resolved = false;
                    
                    //Prepropulate
                    if(action.isArray){
                        forEach(storage.query(), function(obj){
                            value.push(new Resource(obj));
                        });
                    }else{
                        var q = value.$q, resolved = value.$resolved
                        copy(storage.get(params), value);
                        value.$q = q;
                        value.$resolved = resolved;
                        
                    }
                    
                    //Merge default params and params
                    params = extend(defaultParams, params);
                    
       
                    /*
                     * In this section we whill set the configurations of the 
                     * ajax call. We do this separately than the call because 
                     * of different necessary parts between GET, POST, PUT, 
                     * and DELETE calls
                     */
                    var httpConfig = {cache:false};
                    if(action.method === "POST" || action.method === "PUT"){
                        if(data.id){
                            action.method = "PUT";
                        }
                        httpConfig.data = JSON.stringify(data);
                    }
                    httpConfig.method = action.method;
                    httpConfig.url = route.url(extend({}, extract_params(data, params)));
                    httpConfig.success = function(response, status){
                        $rootScope.$apply(function(){
                            deferred.resolve(response, status);
                        });  
                    };
                    httpConfig.error = function(status){
                        $rootScope.$apply(function(){
                            deferred.reject(status);
                        });
                        
                    };
                    
                    //Ajax Call
                    jQuery.ajax(httpConfig.url, httpConfig);
                    //Set promise
                    promise.then(function(response, status){
                        var q = value.$q, resolved = value.$resolved;
                        if(angular.isArray(response)){
                            forEach(response, function(obj, index){
                                storage.save(obj);
                                if(value.length>0){
                                    if(index<value.length){
                                        value.pop(0);
                                    }
                                    value.push(new Resource(obj));
                                }else{
                                    value.push(new Resource(obj));  
                                }
                                  
                            });
                        }else{
                            //Save to storage
                            storage.save(response);
                            copy(response, value);
                            value.$q = q;
                            value.$resolved = resolved;
                            
                        }
                        (success||noop)(value, status)
                    }.bind(this), error)
                    //Return promise to be filled later
                    return value;
                    
                };
                
                
                //Set prototype
                Resource.prototype['$'+name] = function(a1, a2, a3){
                    if (action.method==="PUT"){
                        var param = {id:'@id'}
                    }
                    var params = extract_params(this, param), 
                        data = hasBody ? this : undefined,
                        success = angular.noop,
                        error;
                    //Assign arguments based on lengths
                    switch(arguments.length){
                        case 3: params = a1; success = a2; error = a3; break;
                        case 2:
                        case 1:
                            if (isFunction(a1)) {
                                success = a1;
                                error = a2;
                            } else {
                                params = a1;
                                success = a2 || noop;
                            }
                        case 0: 
                            break;
                            
                    }
                    //Call the parent function
                    Resource[name].call(this, params, data, success, error);
                }
            });
            return Resource;
        }
        return ResourceFactory;
    });