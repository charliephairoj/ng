'use strict';

angular.module('employeeApp')
  .controller('OrderAcknowledgementViewCtrl', ['$scope', 'Acknowledgement', 'Notification', 
  function ($scope, Acknowledgement, Notification) {
      Notification.display('Loading Acknowledgements...')
      $scope.ackList = Acknowledgement.poll().query();
      $scope.$on('$destroy', function(){
          Acknowledgement.stopPolling();
      });
  }]);
