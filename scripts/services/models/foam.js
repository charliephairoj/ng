'use strict';

angular.module('employeeApp.services')
  .factory('Foam', ['ecResource', function(ecResource) {
    return ecResource('foam/:id', {id:'@id'});   
  }]);
