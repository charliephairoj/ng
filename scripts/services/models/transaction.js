'use strict';

angular.module('employeeApp.services')
  .factory('Transaction', ['ecResoure', function(ecResource) {
      return ecResource('transaction/:id', {id:'@id'});   
  }]);
