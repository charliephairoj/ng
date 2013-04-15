'use strict';

angular.module('employeeApp.services')
  .factory('Shipping', ['eaResource', function(eaResource) {
    return eaResource('shipping/:id', {id:'@id'});   
  }]);
