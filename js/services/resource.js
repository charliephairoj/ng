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
            //determines if storage works
            StorageEngine.isSupported = function(){
                try {
                    return 'localStorage' in window && window['localStorage'] !== null;
                }catch(e){
                    return false;
                }
            };
            
            //querya all items of name space
            StorageEngine.query = function(){
                var keys = JSON.parse(storage.getItem(key));
                //checks storage of keys exists
                if(keys === null || !keys || keys.length===0){
                    
                    return false;
                    
                }
                
                //create array to hold data
                var data = [], i;
                //iterate through all the keys
                for(i in keys){
                    data.push(JSON.parse(storage.getItem(key+keys[i])));
                }
                //return the data
                return data;
                
            };
            
            StorageEngine.save = function(data){
                 //Create vars
                var keyData = [],
                        i,
                        itemKey;
                        
                //Determines if this is an array
                if(data instanceof Array){ 
                    //loops through the data
                    for (i in data){
                        //Add the id
                        if(keyData.indexOf(data[i]['id']) === -1){
                            if(data[i].id !== null || data[i].id){
                                keyData.push(data[i].id);
                                itemKey = key+data[i].id;
                            }else{
                           
                                itemKey = key+Math.round(Math.random()*10001);
                                keyData.push(itemKey);
                            }
                        //What to do if the key is in the key array
                        }else{
                            itemKey = key+data[i].id
                        }
                        //save the object as
                        //json string 
                        storage.setItem(itemKey, JSON.stringify(data[i]));
                       
                    }
                    
                    //Saves the keys as
                    //a json string
                    storage.setItem(key, JSON.stringify(keyData));
                }else{
                    //retrieve keys and parses
                    var keyData = JSON.parse(storage.getItem(key));
                    
                    if(!keyData || keyData === null){
                        keyData = [];
                    }
                    //checks if key is in array
                    if(keyData.indexOf(data['id']) === -1){
                        //adds key to 
                        //array if not found and not null
                        if(data.id !== null && data.id){
                            keyData.push(data.id);
                            itemKey = key+data.id;
                        }else{
                             itemKey = key+Math.round(Math.random()*10001);
                             keyData.push(itemKey);
                        }
                    //What to do if the key is already in the key array
                    }else{
                        itemKey = key+data.id
                    }
                    //store keys as json string
                    storage.setItem(key, JSON.stringify(keyData));
                    //stores item as json string
                    storage.setItem(itemKey, JSON.stringify(data));
                }
                
                //return the key
                return itemKey;
            };
            
            
            StorageEngine.get = function(params){
                if(params.id){
                    var preData = storage.getItem(key+params.id);
                    if(preData && preData!=null){
                        return JSON.parse(preData);
                    }else{
                        return false;
                    }
                }
                    
            };
            
         
            
            StorageEngine.remove = function(data){
                //GET THE KEYS
                var keyData = JSON.parse(storage.getItem(key)),
                    index,
                    i,
                    itemKey;
                    
                //Check if an array
                if(data instanceof Array){
                  
                    //iterate over loop
                    for(i in data){
                        //checks that this item has an id
                        if(data[i].id){
                            //adds to they localstorage
                            storage.removeItem(key+data[i].id);
                            //get index of key in keys
                            index = keyData.indexOf(key+data[i].id);
                            //remove the key
                            keyData.splice(index, 1);
                            
                        }
                    }
                }else{
                   //checks item has an id
                   if(data.id){
                       //creates the key
                       itemKey = key+data.id;
                   }else{
                       if(data){
                           //creates the key
                           itemKey = data;
                       }
                   }
                   console.log(itemKey)
                   console.log(storage.getItem(itemKey));
                   //removes the item
                   storage.removeItem(itemKey);
                   //get index from keys
                   index = keyData.indexOf(itemKey);
                   
                   if(index === -1){
                       itemKey = data;
                       if(data.id){
                           itemKey = data.id
                       }
                       index = keyData.indexOf(itemKey)
                   }
                   //remove key from keydata
                   keyData.splice(index, 1);
                   
                   //save keydata
                   storage.setItem(key, JSON.stringify(keyData));
                }
            };
            
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
    factory('ecResource', function($resource, $storage){
        
        //apply data
        function applyData(target, data){
            angular.forEach(data, function(value, key){
                console.log(value+' '+key);
                
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
                this.key = targetUrl;
                 angular.copy(data || {}, this);
            }
            
            
            //Add query function
            Resource.query = function(params){
                //declare vars
                var resources = [],i, data;
                
                if(!params){
                    params = {};
                }
                //request data from storage
                data = storage.query();
                //checks if data exits
                if(!data){
                    //request data from server
                    serverResource.query(function(responseData){
                        storage.save(responseData);
                        //fills in promise array when data is receieved
                        for(i in responseData){
                            //creates new resource then adds to array
                            if(params.hasOwnProperty('resource')){
                                if(params.resource  === false){
                                    resources.push(extractData(responseData[i]));
                                }else{
                                    resources.push(new Resource(extractData(responseData[i]))); 
                                }
                                
                            }else{
                                resources.push(new Resource(extractData(responseData[i])));
                           }
                            
                        }
                    });
                    
                }else{
                    //creates new array with functions
                    for(i in data){
                        //adds to array
                        if(params.hasOwnProperty('resource')){
                            if(params.resource === false){
                                resources.push(data[i]);
                            }else{
                                resources.push(new Resource(data[i]));
                            }
                            
                            
                        }else{
                            resources.push(new Resource(data[i]));
                        }
                        
                    }
                    
                     //request data from server
                    serverResource.query(function(responseData){
                        storage.save(responseData);
                        //fills in promise array when data is receieved
                        resources = [];
                        for(i in responseData){
                            //creates new resource then adds to array
                           
                            if(params.hasOwnProperty('resource')){
                                if(params.resource  === false){
                                    resources.push(extractData(responseData[i]));
                                }else{
                                    resources.push(new Resource(extractData(responseData[i]))); 
                                }
                                
                            }else{
                                resources.push(new Resource(extractData(responseData[i])));
                           }
                        }
                        
                        storage.save(resources);
                    });
                }
                
                
                //returns the data
                return resources;
            };
            
            //Get function
            Resource.get = function(params){
                
                if(params.id){
                    //get the data from local storage
                    var data = storage.get({'id':params.id}),
                        resource;
                    //create a new resource
                    resource = new Resource(data);
                    //get id and set it to the server resource
                    //request from server
                    //after request is received 
                    //it will automatically update the resource
                    //Make ajax call
                    jQuery.ajax(getRoute(targetUrl, params), {
                        type:'GET',
                        processData:false,
                        contentType:false,
                        success: function(responseData, status){
                            
                            
                            applyData(resource, responseData);
                            console.log(resource);
                            storage.save(resource);
                        }.bind(this)
                    });
                    
                    
                    
                    //return the resource
                    return resource;
                                        
                }
            };
            
            Resource.prototype.get = Resource.get;
            
            //Save function
            Resource.prototype.$save = function(callback){
                var fd = new FormData(), 
                    data = extractData(this),
                    tempKey,
                    method = "POST";
                
                console.log(data.id);
                if(data.id){
                    method = "PUT";
                }
                //saves to storage
                //so that it is immediately available
                tempKey = storage.save(this);
                console.log(tempKey);
               
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
                        
                        
                        //remove the temp item
                        storage.remove(tempKey);
                        //save new item to storage
                        storage.save(resource);
                        
                        //deep copy to this
                        angular.copy(resource, this);
                        
                        //call the call back
                        if(callback){
                            callback(responseData);
                        }
                        
                    }.bind(this)
                });
                
                
            };
           
            
            Resource.prototype.$delete = function(callback){
                //saves to storage
                //so that it is immediately available
                storage.remove(this);
                
               
                //Make ajax call
                jQuery.ajax(getRoute(targetUrl, this), {
                    type:'DELETE',
                    processData:false,
                    contentType:false,
                    success: function(responseData, status){
                        console.log(responseData);
                        if(callback){
                            callback(responseData);
                        }
                    }
                });
            };
            
            
            
            return Resource;
            
            
        }
        
        return ResourceFactory;
    });