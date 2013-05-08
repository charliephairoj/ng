'use strict';

/*
 * indexedDB Storage
 * 
 * This file implements a indexedDB backend to store objects
 * from the server and the provide them as a cache and other 
 * potential uses. 
 * 
 * Private Methods:
 * - _save()
 * - _get()
 * - _query()
 * - _remove()
 * 
 * Public Methods:
 * -save()
 * -get()
 * -query()
 * -remove()
 * -clear()
 */
angular.module('employeeApp.services')
    .factory('eaIndexedDB', ['$q', '$timeout', '$rootScope',  function($q, $timeout, $rootScope) {
        var database = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        function factory(namespace){
            /*
             * Create a store of namespaces in the localStorage
             */
            var namespaces = JSON.parse(window.localStorage.getItem('namespaces')) || [];
            if(namespaces.indexOf(namespace) == -1){
                namespaces.push(namespace);
            }
            window.localStorage.setItem('namespaces', JSON.stringify(namespaces));
            /*
             * Create the class to be prototyped
             * 
             * We initialize the indexedDB with the appropriate
             * object store by using the class name
             * 
             * We open the database and use a version number
             * that is determined by the total number of namespaces, 
             * so as to automatically update the database to contain
             * the new object store
             */
            function Database(namespace){
                this.namespace = namespace;
                this.indexedDB = database;
                this.ready = false;
                
                var request = this.indexedDB.open('app', namespaces.length);
                
                /*
                 * The version number is based on the number of namespaces
                 * When the number of namespaces increases, then the version
                 * number increases, initiating an upgrade needed call. 
                 * 
                 * Namespaces that do not have a corresponding object store 
                 * are then associated with a new object store
                 */
                request.onupgradeneeded = function(event){
                    this.db = event.target.result;
                    for(var key in namespaces){
                        console.log(namespaces[key]);
                        console.log(this.db.objectStoreNames.contains(namespaces[key]));
                        if(!this.db.objectStoreNames.contains(namespaces[key])){
                            var objectStore = this.db.createObjectStore(namespaces[key], {keyPath:'id'});
                            objectStore.createIndex("idIndex", "id", { unique: true });
                        }
                    }
                }.bind(this);
                
                /*
                 * If the database is successfully opened or upgraded
                 * then the db is assigned to the parent, the ready status
                 * is set to true, and the onready callback is called if 
                 * it is defined. 
                 */
                request.onsuccess = function(e){
                    this.db = request.result;
                    this.ready = true;
                    (this.onready || angular.noop)();
                }.bind(this);
                
                /*
                 * If the database is unable to open then the error is printed
                 * to the console. 
                 */
                request.onerror = function(e){
                    console.error(e);
                }.bind(this);
            }
            
            /*
             * Private functions
             */
            
            Database.prototype._cleanObj = function(obj){
                var re = new RegExp(/^\$/);
                for(var key in obj){
                    if(re.test(key) || angular.isFunction(obj[key])){
                        delete obj[key]
                    }
                }
                
                return obj;
            }
            Database.prototype._save = function(obj, success, error){
                var cleanObj = this._cleanObj(obj);
                
                var request = this.db.transaction([this.namespace], 'readwrite')
                    .objectStore(this.namespace)
                    .put(cleanObj);
                       
                request.onsuccess = function(evt){
                    (success || angular.noop)();
                };
                    
                request.onerror = function(evt){
                    (error || angular.noop)();
                };
               
            }
            
            Database.prototype._get = function(param, success, error){
                param = parseFloat(param);
                var request = this.db.transaction(this.namespace)
                    .objectStore(this.namespace)
                    .openCursor(IDBKeyRange.only(param)).onsuccess = function(evt){
                        var cursor = evt.target.result;
                        if(cursor){
                           (success || angular.noop)(cursor.value);
                        }
                    }
                    /*
                    .get(param);
                
                request.onsuccess = function(evt){
                    console.log(evt);
                    console.log(request.results);
                    (success || angular.noop)(request.result);
                };
                    
                request.onerror = function(evt){
                    console.log(evt);
                    console.log('error');
                    (error || angular.noop)();
                };*/
               
            }
            
            Database.prototype._query = function(param, success, error){
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
                    console.error(evt);
                    (error || angular.noop)();
                }
            }
            Database.prototype._remove = function(arg, success, error){
                var request = this.db.transaction([this.namespace], "readwrite")
                    .objectStore(this.namespace)
                    .delete(arg);
                request.onsuccess = function(evt){
                    (success || angular.noop)();
                };
                request.onerror = function(evt){
                    (error || angular.noop)();
                };
            }
            
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
                            success = arg1;
                            error = arg2;
                        }else{
                            param = arg1;
                            success = arg2;
                            error = arg3;
                        }
                        break;
                    default:
                        throw new RangeError("Expects between 1-3 arguments");
                }
                try{
                    this._query(param, success, error);
                }catch(e){
                    
                }
                
                
            }
            
            Database.prototype.get = function(param, success, error){
                if(arguments.length < 1 && arguments.length > 3){
                    throw new RangeError("Expects between 1-3 argumeents");
                }
                
                try{
                    this._get(param, success, error);
                }catch(e){
                    console.error(e);
                }
            }
            
            Database.prototype.save = function(obj, success, error){
                try{
                    if(angular.isArray(obj)){
                        for(var key in obj){
                            this._save(obj[key]);
                        }
                        (success || angular.noop)();
                    }else{
                        this._save(obj, success, error);
                    }
                }catch(e){
                    console.error(e);
                }
            };
            
            Database.prototype.remove = function(arg, success, error){
                try{
                    this._remove(arg, success, error);
                }catch(e){
                    console.error(e);
                }
            };
            
            Database.prototype.clear = function(success, error){
                this._query({}, function(data){
                    for(var key in data){
                        this._remove(data[key].id);
                    }
                });
            }
            
            Database.prototype.destroy = function(){
                this.indexedDB.deleteDatabase('app');
            }
            
            return new Database(namespace);
        }
        
        return factory;
    }]);
