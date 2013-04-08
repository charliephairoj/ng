'use strict';

angular.module('employeeApp.services')
  .factory('Customer', ['ecResource', function(ecResource) {
    return ecResource('customer/:id', {id:'@id'});   
  }]);
