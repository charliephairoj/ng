'use strict';

/*
 * indexedDB Storage
 * 
 * This file implements a indexedDB backend to store objects
 * from the server and the provide them as a cache and other 
 * potential uses. 
 */
angular.module('employeeApp.services')
    .factory('eaIndexedDB', ['$q', '$timeout', function($q, $timeout) {
        var database = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        function factory(namespace){
            //Create a store of namespaces in the localStorage
            var namespaces = JSON.parse(window.localStorage.getItem('namespaces')) || [];
            if(namespaces.indexOf(namespace) == -1){
                namespaces.push(namespace);
            }
            window.localStorage.setItem('namespaces', JSON.stringify(namespaces));
            /*
             * Create the shell class to be prototyped later
             */
            function Database(namespace){
                this.namespace = namespace;
                this.indexedDB = database;
                var request = this.indexedDB.open('app', namespaces.length);
                
                request.onupgradeneeded = function(event){
                    this.db = event.target.result;
                    for(var key in namespaces){
                        if(!this.db.objectStoreNames.contains(namespaces[key])){
                            this.db.createObjectStore(namespaces[key], {keyPath:'id'});
                        }
                    }
                }.bind(this);
                
                request.onsuccess = function(e){
                    this.db = request.result;
                }.bind(this);
                
                request.onerror = function(){
                }.bind(this);
            }
            
            /*
             * Private functions
             */
            
            Database.prototype._save = function(obj, success, error){
                try{
                    var request = this.db.transaction([this.namespace], 'readwrite')
                        .objectStore(this.namespace)
                        .add(obj);
                       
                    request.onsuccess = function(evt){
                        (success || angular.noop)();
                    };
                    
                    request.onsuccess = function(evt){
                        (error || angular.noop)();
                    };
                }catch(e){
                    //throw new Error(e);
                    //console.error(e.message);
                }
            }
            
            Database.prototype._get = function(param, success, error){
                try{
                    var request = this.db.transaction([this.namespace], 'readonly')
                        .objectStore(this.namespace)
                        .get(param);
                       
                    request.onsuccess = function(evt){
                        (success || angular.noop)(request.result);
                    };
                    
                    request.onerror = function(evt){
                        (error || angular.noop)();
                    };
                }catch(e){
                    //throw new Error(e);
                    //console.log(e.message);
                    //(error || angular.noop)();
                }
            }
            
            Database.prototype._remove = function(param, success, error){
                
            }
            
            /*
             * This section will implements the public facing APIs that
             * are available to retrieve data
             */
            Database.prototype.query = function(arg1, arg2, arg3){
                console.log(new Date());
                console.log(arguments.length);
                var success,
                    error,
                    param;
                switch(arguments.length){
                    case 1:
                        console.log(angular.isFunction(arg1));
                        if(angular.isFunction(arg1)){
                            success = arg1;
                        }else{
                            param = arg1;
                        }
                        angular.isFunction(arg1) ? success = arg1 : param = arg1;
                        break;
                    case 2:
                        if(angular.isFunction(arg1)){
                            success = arg1;
                            error = arg2;
                        }else{
                            params = arg1;
                            success = arg2;
                        }
                        break;
                    case 3:
                        if(angular.isFunction(arg1)){
                            success = arg1
                            
                        }
                        param = arg1;
                        success = arg2;
                        error = arg3;
                        break;
                    default:
                        throw new TypeError()
                }
                if(this.db){
                    var data = [];
                    var objectStore = this.db.transaction([this.namespace], 'readwrite')
                        .objectStore(this.namespace);
                        
                    var request = objectStore.openCursor().onsuccess = function(evt){
                        var cursor = evt.target.result;
                        if(cursor){
                            data.push(cursor.value);
                            cursor.continue();
                        }else{
                            console.log(success);
                            (success || angular.noop)(data);
                        }
                    }
                    request.onerror = function(evt){
                        console.error(evt);
                        (error || angular.noop)();
                    }
                }else{
                    $timeout(function(){
                        console.log([arg1, arg2, arg3]);
                        this.query(arg1, arg2, arg3);
                    }.bind(this), 100);
                }
                
                
            }
            
            Database.prototype.get = function(param, success, error){
                this._get(param, success, error);
            }
            
            Database.prototype.save = function(obj, success, error){
                if(this.db){
                    if(angular.isArray(obj)){
                        for(var key in obj){
                            this._save(obj[key]);
                        }
                        (success || angular.noop)();
                    }else{
                        this._save(obj, success, error);
                    }
                }else{
                     $timeout(function(){
                        this.save(obj, success, error);
                    }.bind(this), 100);
                }
            };
            
            Database.prototype.remove = function(arg, success, error){
                if(this.db){
                    var request = this.db.transaction([this.namespace], "readwrite")
                        .objectStore(this.namespace)
                        .delete(arg);
                    request.onsuccess = function(evt){
                        (success || angular.noop)();
                    };
                    request.onerror = function(evt){
                        (error || angular.noop)();
                    };
                }else{
                     $timeout(function(){
                        this.remove(arg, success, error);
                    }.bind(this), 100);
                }
            };
            
            Database.prototype.clear = function(success, error){
                var objectStore = this.db.transaction([this.namespace], 'readwrite')
                    .objectStore(this.namespace);
                    
                var request = objectStore.openCursor().onsuccess = function(evt){
                    var cursor = evt.target.result;
                    if(cursor){
                        objectStore.delete(cursor.key);
                        cursor.continue();
                    }else{
                        (success || angular.noop)();
                    }
                }
                request.onerror = function(evt){
                    (error || angular.noop)();
                }
            }
            
            Database.prototype.destroy = function(){
                this.indexedDB.deleteDatabase('app');
            }
            
            return new Database(namespace);
        }
        
        return factory;
    }]);
