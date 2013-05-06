'use strict';

/*
 * indexedDB Storage
 * 
 * This file implements a indexedDB backend to store objects
 * from the server and the provide them as a cache and other 
 * potential uses. 
 */
angular.module('employeeApp.services')
    .factory('eaIndexDB', ['$q', function($q) {
        function factory(){
            /*
             * Initialize the Database
             */
            window.
            
            /*
             * Construct the database object that will
             * wrap the core indexedDB features. 
             */
            function Database(){
                console.log(window.indexedDB);
                window.indexedDB.open('test');
                this.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
                var request = this.indexedDB.open('test');
                request.onsuccess = function(e){
                    console.log('ok');  
                    this.db = request.result;
                    console.log(this.db);
                    this.transaction = this.db.transaction(['customers'], 'readwrite');
                    this.objectStore = this.transaction.objectStore("customers");
                    console.log(this.objectStore);
                    this.transaction.onsuccess = function(evt){
                        console.log(evt);
                    };
                    this.objectStore.onsuccess = function(evt){
                        console.log(evt);
                    };
                    this.objectStore.add({id:5, name:'charlie'});
                }.bind(this);
                request.onerror = function(){
                    console.log('pee');
                }.bind(this);
                
                request.onupgradeneeded = function(event){
                    this.db = event.target.result;
                    this.objectStore = db.createObjectStore("customers", {keyPath:"id"});
                }.bind(this);
                
            }
            
            /*
             * This section will implements the public facing APIs that
             * are available to retrieve data
             */
            Database.prototype.query = function(){
                var deferred = $q.defer();
                return deferred.promise;
            }
            Database.prototype.get = function(){
                var deferred = $q.defer();
                this.objectStore.get();
                return deferred.promise;
            }
            
            Database.prototype.save = function(obj){
                var deferred = $q.defer();
                this.objectStore.add(obj);
                
                return deferred.promise;
            };
            
            
            
            return new Database();
        }
    }]);
