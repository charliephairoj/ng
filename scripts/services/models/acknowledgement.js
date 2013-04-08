'use strict';

angular.module('employeeApp.services')
  .factory('Acknowledgement', ['ecResource', function(ecResource) {
      return ecResource('acknowledgement/:id', {id:'@id'});   
  }]);
