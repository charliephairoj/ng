'use strict';

/*
 * Local Storage Service
 * 
 * This Service will keep an active collection that can be 
 * queried via id. The collection will also act as an interface 
 * with the localStorage of the browser. The storage of items
 * in the collection will be entirely based on the id of the.
 * The main function will be a factory that returns a collection
 * for a specified namespace. 
 * 
 * Capabilities:
 * 
 * -main collection for a namespace
 * -Maintain active collection
 * -Get an object from the collection
 * -Save an object to the collection
 *   -check for duplicate id. If found
 *    then updates instead of create a new one
 * -get all objects from the collection
 * -delete an object from the collection
 * -keep collection in sync with localStorage
 * 
 * Public Methods
 * 
 * -query(arg)
 * -save()
 * -get(arg)
 * -remove(arg)
 * 
 * Private Methods
 * 
 * -saveToStorage()
 * -loadFromStorage()
 * 
 */
angular.module('employeeApp.services')
  .factory('eaStorage', [function() {
      
      //Factory Function 
      function factory(namespace){
          
          //Save object to storage
          function saveToStorage(namespace, data) {
              window.localStorage.setItem(namespace, JSON.stringify(data));    
          }
          
          //Get Object from storage
          function loadFromStorage(namespace) {
              return JSON.parse(window.localStorage.getItem(namespace));
          }
          
          //Storage initialization
          function storage(namespace) {
              this.namespace = namespace;
              this.collection = loadFromStorage(this.namespace) || {};
          }
          
          function compare(item, arg) {
              for (aKey in arg) {
                  if (item.hasOwnProperty(aKey)){
                      if (item[aKey] !== arg[aKey]){
                          return false;
                      }
                  } else {
                      return false;
                  }
              }
              
              return true;
          }
          
          /*
           * Query items form the collection
           * 
           * The argument must be in the form of an
           * object where the keys will be used to compare
           * with keys of objects in the collection
           * and the value compared with the objects' values
           */
          storage.prototype.query = function(arg){
              
              if(typeof(arg) === 'object') {
                  var data = [],
                      key;
                  for(key in this.collection) {
                      if (compare(this.collection[key], arg)) {
                          data.push(this.collection[key]);
                      }
                  }
                  
                  //Return the data set
                  return data;
                  
              } else {
                  throw Error;
              }
              
          };
          
          //Save an obj
          storage.prototype.save = function(obj){
              //Checks if the obj has an id
              if (obj.hasOwnProperty('id')) {
                  //checks if there is an object in the collection
                  //with the same id
                  if (this.collection[obj.id]) {
                      //update item
                      angular.extend(this.collection[obj.id], obj);
                  } else {
                      //adds new item
                      this.collection[obj.id] = obj
                  }
                  //Save the data to storage
                  saveToStorage(this.namespace, this.collection);
              } else {
                  throw Error;
              }
          };
          
          //Get an obj by id
          storage.prototype.get = function(id){
              return this.collection[id] ? this.collection[id] : null;
          };
          
          //Delete an object by id
          storage.prototype.remove = function(id){
              if (this.collection.hasOwnProperty(id)) {
                  delete this.collection[id];
                  saveToStorage(this.namespace, this.collection);
              }
          };
          
          //Returns the namespace based storage
          return new storage(namespace);
      }
      
      //Return Factory Function 
      return factory;
    
  }]);
