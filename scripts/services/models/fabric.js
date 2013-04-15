'use strict';

angular.module('employeeApp.services')
  .factory('Fabric', ['eaResource', function(eaResource) {
    return eaResource('fabric/:id', {id:'@id'});   
  }]);
