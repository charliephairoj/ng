'use strict';

angular.module('employeeApp')
    .controller('ProductInventoryCtrl', ['$scope','AcknowledgementItem', function ($scope, AcknowledgementItem) {
        $scope.itemList = AcknowledgementItem.query({status:'available'});
    }]);
