'use strict';

angular.module('employeeApp')
  .factory('Supply', ['eaResource', function(eaResource) {
    return eaResource('supply/:id', {id:'@id'});   
  }]);
