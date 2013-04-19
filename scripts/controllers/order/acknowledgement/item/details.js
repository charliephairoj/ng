'use strict';

angular.module('employeeApp')
  .controller('OrderAcknowledgementItemDetailsCtrl', ['$scope', '$routeParams', 'AcknowledgementItem',
  function ($scope, $routeParams, AcknowledgementItem) {
        AcknowledgementItem.get({id:$routeParams.id})
  }]);
