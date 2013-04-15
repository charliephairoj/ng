'use strict';

angular.module('employeeApp.services')
  .factory('Supplier', ['eaResource',function(eaResource) {
      return eaResource('supplier/:id', {id:'@id'});   
  }]);
