'use strict';

angular.module('employeeApp.services')
  .factory('Customer', ['eaResource', function(eaResource) {
    return eaResource('customer/:id', {id:'@id'});   
  }]);
