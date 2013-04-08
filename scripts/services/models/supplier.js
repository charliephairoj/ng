'use strict';

angular.module('employeeApp.services')
  .factory('Supplier', ['ecResource',function(ecResource) {
      return ecResource('supplier/:id', {id:'@id'});   
  }]);
