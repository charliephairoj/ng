'use strict';

/*
 * indexedDB Storage
 * 
 * This file implements a indexedDB backend to store objects
 * from the server and the provide them as a cache and other 
 * potential uses. 
 */
angular.module('employeeApp.services')
    .factory('eaIndexDB', ['$q', function($q, indexes) {
        var database = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        function factory(namespace){
            //Create a store of namespaces in the localStorage
            var namespaces = window.localStorage.getItem('namespace') || [];
            if(namespaces.indexOf(namespace) == -1){
                namespaces.push(namespace);
            }
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
                        this.db.createObjectStore(namespaces[key], {keyPath:'id'});
                    }
                }.bind(this);
                
                request.onsuccess = function(e){
                    this.db = request.result;
                }.bind(this);
                
                request.onerror = function(){
                }.bind(this);
            }
            
            /*
             * Initialize the Database
             */
            
            
            /*
             * This section will implements the public facing APIs that
             * are available to retrieve data
             */
            Database.prototype.query = function(arg1, arg2, arg3){
                var success,
                    error,
                    param;
                switch(arguments.length){
                    case 1:
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
                        param = arg1;
                        success = arg2;
                        error = arg3;
                        break;
                }
                
                var data = [];
                var objectStore = this.db.transaction([this.namespace], 'readwrite')
                    .objectStore(this.namespace);
                    
                var request = objectStore.openCursor().onsuccess = function(evt){
                    var cursor = evt.target.result;
                    if(cursor){
                        data.push(cursor.value);
                        cursor.continue();
                    }else{
                        (success || angular.noop)(data);
                    }
                }
                request.onerror = function(evt){
                    (error || angular.noop)();
                }
                
                
            }
            
            Database.prototype.get = function(param, success, error){
                var request = this.db.transaction([this.namespace], 'readonly')
                    .objectStore(this.namespace)
                    .get(param);
                   
                request.onsuccess = function(evt){
                    (success || angular.noop)(request.result);
                };
                
                request.onerror = function(evt){
                    (error || angular.noop)();
                };
            }
            
            Database.prototype.save = function(obj, success, error){
                var request = this.db.transaction([this.namespace], 'readwrite')
                    .objectStore(this.namespace)
                    .add(obj);
                   
                request.onsuccess = function(evt){
                    (success || angular.noop)();
                };
                
                request.onsuccess = function(evt){
                    (error || angular.noop)();
                };
                
            };
            
            Database.prototype.remove = function(arg, success, error){
                var request = this.db.transaction([this.namespace], "readwrite")
                    .objectStore(this.namespace)
                    .delete(arg);
                request.onsuccess = function(evt){
                    (success || angular.noop)();
                };
                request.onerror = function(evt){
                    (error || angular.noop)();
                };
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
