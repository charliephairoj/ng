'use strict';

angular.module('employeeApp.services')
  .factory('Shipping', ['ecResource', function(ecResource) {
    return ecResource('shipping/:id', {id:'@id'});   
  }]);
