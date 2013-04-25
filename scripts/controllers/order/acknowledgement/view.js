'use strict';

angular.module('employeeApp')
  .controller('OrderAcknowledgementViewCtrl', ['$scope', 'Acknowledgement', 'Notification', '$location',
  function ($scope, Acknowledgement, Notification, $location) {
      Notification.display('Loading Acknowledgements...')
      $scope.ackList = Acknowledgement.poll().query();
      
      $scope.add = function(evt){
          evt.preventDefault();
          $location.path('/supply/prop/add');
      };
      
      $scope.$on('$destroy', function(){
          Acknowledgement.stopPolling();
      });
  }]);
