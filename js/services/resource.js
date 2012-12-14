'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('ecResource', ['ngResource']).
    factory('$storage', function(){
        var storage = window.localStorage;
        
        function storageFactory(key){
            //Create the main factory
            function StorageEngine(){
                
                 
            }
            
            //CREATE INITILIZATION FUNCTION
            StorageEngine.init = function(){
                //ASSIGNS KEY TO OBJECT
                this.key = key;
                //CHECKS IF SUPPORTS LOCALSTORAGE
                if('localStorage' in window && window['localStorage']!==null){
                     this.storage = window.localStorage;
                     this.getKeys();
                }    
            };
            
            
            //determines if storage works
            StorageEngine.isSupported = function(){
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
            StorageEngine.createKeysArray = function(){
                
                this.keys = [];
                this.saveKeys();
                
            };
            
            //Save keys
            StorageEngine.saveKeys = function(){
                
                if(typeof(this.keys) != 'object'){
                    this.createKeysArray();
                }else{
                    this.storage.setItem(this.key, JSON.stringify(this.keys));
                }
                
            };
            
            //Save a key
            StorageEngine.saveKey = function(arg){
                
                var tempKey = this.key+arg;
                
                //CHECK IF keys is valid
                if(!this.keys){
                    this.createKeysArray();
                }
                //Checks for duplicates
                if(this.keys.indexOf(tempKey)===-1){
                    this.keys.push(tempKey);
                    this.saveKeys();
                }
                
                return tempKey;
            };
            
            //Retrieve all keys
            StorageEngine.getKeys = function(){
                
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
            StorageEngine.deleteKey = function(key){
                
                //Checks whether keys are valid
                if(!this.keys){
                    StorageEngine.getKeys();
                }
                
                var index = this.keys.indexOf(key);
                console.log(key);
                console.log(index);
                if(index!= -1){
                    this.keys.splice(index);
                    this.saveKeys();
                    return true;
                }else{
                    return false;
                }
            };
            
            //Get a key
            StorageEngine.getKey = function(arg){
                //CREATE TEMPORARY KEY
                var tempKey = this.key + arg,
                    index;
                //Checks index of key and 
                //If a key is present return is
                index = this.keys.indexOf(tempKey);
                if(index!==-1){
                    
                    return this.keys[index];
                
                //Returns null if there is no key
                }else{
                    
                    return null;
                    
                }
            };
            
            /*
             * The following methods deal with the actual retrieving, storing
             * and delete of the object themselves represented by the keys
             */
            
            //querya all items of name space
            StorageEngine.query = function(){
                
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
            StorageEngine.save = function(data){
                
                var itemKey;
                
                 if(data.hasOwnProperty('id')){
                    
                     itemKey = this.saveKey(data.id);
                     this.storage.setItem(itemKey, JSON.stringify(data));
                     
                 }
            };
            
            //Get an item from storage
            StorageEngine.get = function(args){
                
                var itemKey;
                //CHECKS IF THE ARG
                if(args.id){
                    //Get Item Key
                    itemKey = this.getKey(args.id);
                    //CHECKS IF THE KEY IS VALID
                    if(itemKey){
                        return JSON.parse(this.storage.getItem(itemKey));
                    }else{
                        return null;
                    }
                //RETURNS NULL IF NO ID
                }else{
                    return null;
                }
                    
            };
            
         
            //Remove an Item from storage
            StorageEngine.remove = function(args){
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
            
            StorageEngine.init();
            return StorageEngine;
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
    factory('ecResource', function($resource, $storage, $rootScope, $http){
        var $scope = $rootScope;
        //apply data
        function applyData(target, data){
            angular.forEach(data, function(value, key){
                
                target[key] = value
                
            });
        }
        
        //help function to extract values 
        //from objects to object
        function extractData(target){
            //declare var obj
            var data = {};
            //iterate over the target
            angular.forEach(target, function(value, key){
                //add data with key
                data[key] = value;
            });
            //return thedata
            return data;
        }
        
        //helps extract images from the 
        //target and returns it
        function extractImages(target){
            
            //creates an array
            var images = [];
            //lopps through the images
            angular.forEach(target)
            
        }
        
        //helps extract files from the target 
        //and returns it
        function extractFiles(target){
            
        }
        
        //function route gets url
        function getRoute(targetUrl, params){
            //SEPARATE PARAMS IN URL
            var urlFrags = targetUrl.split('/');
            ///SET MAIN URLS
            var url = urlFrags[0];
            //LOOOP THROUGH PARAMS IN URL
            angular.forEach(urlFrags, function(param){
                //MATCH TO PARAM
                switch(param.toLowerCase()){
                    //REQUEST FOR ID
                    case ":id":
                        //CHECKS IF item has id
                        if(params.id){
                            //ADDS ID  to the url
                            url += '/'+params.id;
                        }
                        break;
                }
                
            });
            //returns the url
            return url;
        }
        
        function ResourceFactory(targetUrl, params){
        /*
         * This initial area prepares the namespace, server resource
         */
            //Get the namespace
            var namespace = targetUrl.split('/')[0].toLowerCase(),
                storage = $storage(namespace);
            //Declare the server resource
            var serverResource = new $resource(targetUrl, params, {
                'get':    {method:'GET'},
                'save':   {method:'POST'},
                'query':  {method:'GET', isArray:true},
                'remove': {method:'DELETE'},
                'delete': {method:'DELETE'}
               
            });
            
            /*
             * Initial creation of the resouce. Created here so that can be used in query
             * methods
             */
            //Create resource object
            function Resource(data){
                
                 angular.copy(data, this);
                 
                 this.init();
                 
            }
            
            //ConStructor
            Resource.init = function(){
                //Add initial properties to the Constructor Obj
                this.key = namespace;
                //If this browser supports storage then assigns storage
                if(storage.isSupported()){
                    this.storage = storage;
                }
            };
            
            Resource.prototype.init = Resource.init;
            
            
            //Add query function
            Resource.query = function(params){
                
                var data = [],
                    storageData = [],
                    serverData = [],
                    i;
                
                //CHECKS IF STORAGE IS SUPPORTED
                if(this.storage){
                    storageData = this.storage.query();
                    
                    for(i in storageData){
                        data.push(new Resource(storageData[i]));
                    }
                }
                
               
                
                
                $http({method:'GET', url:getRoute(targetUrl, this), cache:false}).success(function(responseData){
                     console.log(responseData);
                     for(i in responseData){
                        this.storage.save(responseData[i]);
                        serverData.push(new Resource(responseData[i]));
                     }
                        
                     data = serverData;
                     
                }.bind(this));
                
                return data;
                    
                  
            };
            
            //Get function
            Resource.get = function(params){
                
                if(params.id){
                    //get the data from local storage
                    var resource;
                    //create a new resource
                    resource = new Resource(this.storage.get((params)));
                    //get id and set it to the server resource
                    //request from server
                    //after request is received 
                    //it will automatically update the resource
                    //Make ajax call
                    $http({method:'GET', url:getRoute(targetUrl, this), cache:false}).success(function(){
                        resource = new Resource(responseData);
                    });
                   
                    
                    
                    
                    //return the resource
                    return resource;
                                        
                }else{
                    return null;
                }
            };
            
            Resource.prototype.get = Resource.get;
            
            //Save function
            Resource.prototype.$save = function(callback){
                var fd = new FormData(), 
                    data = extractData(this),
                    tempKey,
                    method = "POST";
                
                if(data.id){
                    method = "PUT";
                }
                //saves to storage
                //so that it is immediately available
               
                //stringify data and add
                fd.append('data', JSON.stringify(data));
                //Make ajax call
                jQuery.ajax(getRoute(targetUrl, this), {
                    type:method,
                    processData:false,
                    contentType:false,
                    data:fd,
                    success: function(responseData, status){
                        //create a resource from the data
                        var resource = new Resource(responseData);
                        
                        
                        //save new item to storage
                        storage.save(resource);
                        
                        //deep copy to this
                        angular.copy(resource, this);
                        console.log(callback);
                        //call the call back
                        if(callback){
                            console.log('calling')
                            callback(responseData);
                            $scope.$apply();
                        }
                        
                    }.bind(this)
                });
                
                
            };
           
            
            Resource.prototype.$delete = function(callback){
                
                storage.remove(this);
                
               
                //Make ajax call
                
                $http({method:'DELETE', url:getRoute(targetUrl, this), cache:false}).success(function(){
                    console.log(callback);
                    if(callback){
                        console.log('delete2')
                        callback(responseData);
                        $rootScope.$apply();
                    }
                });
            };
            
            
            //initiallize resource
            Resource.init();
            
            return Resource;
            
            
        }
        
        return ResourceFactory;
    });