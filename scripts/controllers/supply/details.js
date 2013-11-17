'use strict';

angular.module('employeeApp')
  	.controller('SupplyDetailsCtrl', ['$scope', '$routeParams', 'Notification', 'Supply',
  	function ($scope, $routeParams, Notification, Supply) {
    	
    	Notification.display('Retrieving supply...', false);
    	
    	$scope.supply = Supply.get({'id':$routeParams.id}, function () {
    		Notification.hide();	
    	});
    	
    	/*
    	 * Update the supply
    	 * 
    	 * Sends a PUT request to the server with all the values
    	 * of the entire resource
    	 */
    	$scope.update = function () {
    		Notification.display('Updating '+$scope.supply.description+'...', false);
    		$scope.supply.$update(function () {
    			Notification.display($scope.supply.description+' updated.');
    		});
    	};
    	
    	/*
    	 * Add a quantity
    	 * 
    	 * Sends a POST request to the server via the add url with 
    	 * the quanttity as a parameter
    	 */
    	$scope.add = function (quantity) {
    		if (!quantity) {
    			var quantity = $scope.quantity;
    		}
    		
    		$scope.supply.$add({quantity:quantity}, function () {
    			
    		});
    	}
    	
    	/*
    	 * Subtract a quantity
    	 * 
    	 * Sends a POST reques to the server via the subtract url with the 
    	 * quantity as a parameter
    	 */
    	$scope.subtract = function (quantity) {
    		if (!quantity) {
    			var quantity = $scope.quantity;
    		}
    		
    		$scope.supply.$subtract({quantity:quantity}, function () {
    			
    		});
    	}
    	
    	$scope.$on('$destroy', function () {
    		$scope.update();
    	});
  	}]);
