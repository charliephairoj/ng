'use strict';

angular.module('employeeApp.services')
  .factory('Configuration', ['eaResource', function(eaResource) {
      return eaResource('configuration/:id', {id:'@id'});   
  }]);
