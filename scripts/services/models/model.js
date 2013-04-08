'use strict';

angular.module('employeeApp.services')
  .factory('Model', ['ecResource', function(ecResource) {
      return ecResource('model/:id', {id:'@id'});   
  }]);
