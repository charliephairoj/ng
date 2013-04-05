'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('UserAuth', []).
    
     /*
     * Current User 
     */
    factory('CurrentUser', function($http, $log, $q, $rootScope){
        
        //Create the initial object
        function User(){
            //Request current user information
            var promise = $http({method:'GET', url:'/auth_service'});
            
            promise.then(function(response){
                    angular.copy(response.data, this);
                    console.log(this);                
            }.bind(this));
        }
        
        //checks if user has a permission
        User.prototype.hasPermission = function(permStr){
            //If the permissions are not yet
            //loaded then false is returnd
            return this.modules ? this.permissions.indexOf(permStr) !== -1 ? true :false : false;
        };
        
        //Checks if user has a module
        User.prototype.hasModule = function(moduleStr){
            //If the permissions are not yet
            //loaded then false is returnd
            return this.modules ? this.modules.indexOf(moduleStr) !== -1 ? true :false : false;
        };
        
        //return the user
        return new User();
    });