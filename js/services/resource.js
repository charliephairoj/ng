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
            
            StorageEngine.prototype.createKey = function(){
                key = 'storage-temp'+Date.now();  
                return key;
            };
            
            //Save a key
            StorageEngine.prototype.saveKey = function(arg){
                
                var itemKey = this.key+arg;
                
                //CHECK IF keys is valid
                this.keys = this.keys || this.createKeysArray();
     
                //Checks for duplicates
                if(this.keys.indexOf(itemKey)===-1){
                    this.keys.push(itemKey);
                    this.saveKeys();
                }
                
                return itemKey;
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
                if(JSON.parse(this.storage.getItem(this.key)).length===0){
                    return true;
                }else
                    return false;
            };
            
            //Get a key
            StorageEngine.prototype.getKey = function(arg){
                //CREATE TEMPORARY KEY
                return this.key + arg;
                   
            };
            
            /*
             * The following methods deal with the actual retrieving, storing
             * and delete of the object themselves represented by the keys
             */
            
            //querya all items of name space
            StorageEngine.prototype.query = function(){
                //create array to hold data
                var data = [], i;
                //iterate through all the keys
                this.keys = this.getKeys();   
                for(i in this.keys){
                    data.push(JSON.parse(this.storage.getItem(this.keys[i])));
                }
                //return the data
                return data;
                
            };
            
            //Save item into storage
            StorageEngine.prototype.save = function(data){
                var itemKey;
                //Function to save object if it has an id
                function saveFn(obj){ 
                    if(obj.hasOwnProperty('id')){
                        var itemKey = this.saveKey(obj.id);
                        this.storage.setItem(itemKey, JSON.stringify(obj));
                        return true;
                    }else{
                        return false;
                    }
                }
                var saveObject = saveFn.bind(this);
                //Check if the data is valid
                if(data){
                    //Checks if an array or not
                    if(angular.isArray(data)){
                        //Reset storage for this namespace
                        this.clear();
                        //loop through items
                        for(var i=0; i<data.length; i++){
                            //return false if data did not save
                            if(!saveObject(data[i])){
                                return false;
                            }
                        }
                    }else{
                        //return false if data did not save
                        return saveObject(data) ? data : false;
                    }
                }else{
                    //return false if data is not valid
                    return false;
                }
            };
            
            //Get an item from storage
            StorageEngine.prototype.get = function(args){
                if(args.hasOwnProperty('id')){  
                    var itemKey;
                    //CHECKS IF THE ARG
                    
                    
                    itemKey = this.getKey(args.id);
                        
                    if(itemKey){
                        return JSON.parse(this.storage.getItem(itemKey));
                    }else{
                        return 'itemKey';  
                    }    
                    
                     
                }else{
                    return args;  
                }
                
                   
                    
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
            
            //Extend all actions to include default and argument actions
            actions = angular.extend({}, DEFAULT_ACTIONS, actions);
            //Assign original and new resource
            oResource = new $resource(url, paramDefaults, actions);
            function Resource(value){angular.copy(value || {}, this);}
            
            //Loop through actions
            angular.forEach(actions, function(action, name){
                var hasBody = action.method == 'POST' || action.method == 'PUT' || action.method == 'PATCH';
                //Default methods
                Resource[name] = function(a1, a2, a3, a4){
                    var params = {};
                    var data;
                    var success = angular.noop;
                    var error = null;
                    var promise,
                        value;
        
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
                    
                    value = action.isArray ? [] : {};
                    //Runs storage mechanism if exists
                    if(storage[name]){
                        //Determines if param or data is used
                        value = hasBody ? storage[name](data) || value : storage[name](params) || value;
                        //Determines if array or not when creating resource
                        value = action.isArray ? angular.forEach(value, function(item, index){value[index] = new Resource(value[index])}) : new Resource(value);
                        //Copies storage data with key to self
                        if(hasBody) {angular.extend(value, this);}
                    }
                    var oPromise = oResource[name](params, data, function(response){
                        //save data to storage
                        action.method == "DELETE" ? storage.remove(params) : storage.save(response);  
                        //copy data to body
                        if(action.method == "DELETE" || hasBody){angular.copy(JSON.parse(JSON.stringify(response)), this);}
                        //pass data to placeholder
                        if(action.isArray){
                            //Reset array
                            value.length = 0;
                            angular.forEach(response, function(item){
                                value.push(new Resource(JSON.parse(JSON.stringify(item)))); 
                            });
                        }else{
                            angular.copy(new Resource(JSON.parse(JSON.stringify(response))), value);
                        }
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
    



