'use strict';

angular.module('employeeApp.services')
  .factory('Fabric', ['ecResource', function(ecResource) {
    return ecResource('fabric/:id', {id:'@id'});   
  }]);
