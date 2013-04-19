'use strict';

angular.module('employeeApp')
  .factory('AcknowledgementItem', [function() {
      return eaResource('acknowledgement/item/:id', {id:'@id'});   
  }]);
