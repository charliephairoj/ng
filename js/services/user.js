'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('UserAuth', []).
    
    
    /*
     * Current User 
     */
    factory('CurrentUser', function($http, $log){
        
        
        //Create the initial object
        function User(){
            //begin initialization of object
            this.init();
        }
        /*
         * Initializes the object
         * Request the current user data from the 
         * the server
         */
        User.prototype.init = function(){
            //Request current user information
            $http({method:'GET', url:'/auth_service'}).success(function(data){
                console.log(data);
                //assigns to permissions
                this.permissions = data.permissions;
                this.modules = data.modules;
            }.bind(this));
        };
        
        //checks if user has a permission
        User.prototype.hasPermission = function(permStr){
            //If the permissions are not yet
            //loaded then false is returnd
            if(!this.modules){
                return false;
            }
            
            //checks if permissions is present
            if(this.permissions.indexOf(permStr) !== -1){
                return true;
            }else{
                return false;
            }
        };
        
        //Checks if user has a module
        User.prototype.hasModule = function(moduleStr){
            //If the permissions are not yet
            //loaded then false is returnd
            if(!this.modules){
                return false;
            }
            
            //checks if module is present
            if(this.modules.indexOf(moduleStr) !== -1){
                return true;
            }else{
                return false;
            }
        };
        
        //return the user
        return new User;
    });