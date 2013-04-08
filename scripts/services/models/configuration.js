'use strict';

angular.module('employeeApp.services')
  .factory('Configuration', ['ecResource', function(ecResource) {
      return ecResource('configuration/:id', {id:'@id'});   
  }]);
