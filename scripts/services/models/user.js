'use strict';

angular.module('employeeApp.services')
  .factory('User', ['ecResource', function(ecResource) {
    return ecResource('user/:id', {id:'@id'});   
  }]);
