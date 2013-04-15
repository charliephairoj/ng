'use strict';

angular.module('employeeApp.services')
  .factory('Model', ['eaResource', function(eaResource) {
      return eaResource('model/:id', {id:'@id'});   
  }]);
