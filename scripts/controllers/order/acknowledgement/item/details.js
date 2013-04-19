'use strict';

angular.module('employeeApp')
  .controller('OrderAcknowledgementItemDetailsCtrl', ['$scope', '$routeParams', 'AcknowledgementItem',
  function ($scope, $routeParams, AcknowledgementItem) {
        $scope.item = AcknowledgementItem.get({id:$routeParams.id});
  }]);
