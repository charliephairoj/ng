'use strict';

angular.module('employeeApp.services')
  .factory('Group', ['ecResource', function(ecResource) {
    return ecResource('group/:id', {id:'@id'});   
  }]);
