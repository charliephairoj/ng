'use strict';

angular.module('employeeApp')
   .controller('SupplyViewCtrl', ['$scope', 'Supply', 'Notification', '$filter', 'Supplier',
   function ($scope, Supply, Notification, $filter, Supplier) {
     	
     	/*
     	 * Vars and flags
     	 */
     	var fetching = true;
     	
     	//system message
     	Notification.display('Loading supplies...', false);
     	
     	
     	$scope.supplies = Supply.query(function(){
     		fetching = false;
     		Notification.hide();
     	});
     	
     	/*
     	 * Search mechanism
     	 * 
     	 * This function will send a GET request to the server
     	 * whenever the query string changes and that string will 
     	 * be sent along as a parameter. 
     	 */
     	$scope.$watch('query', function (q) {
     		if (q) {
     			Supply.query({limit:10, q:q}, function (resources) {
     				for (var i=0; i<resources.length; i++) {
     					if ($scope.supplies.indexOfById(resources[i].id) == -1) {
     						$scope.supplies.push(resources[i]);
     					}
     				}
     			});
     		}
     	});
     	
     	/*
     	 * Load more supplies
     	 * 
     	 * This function will load more supplies from the server
     	 * be using the current number of supplies as the offset
     	 */
     	$scope.loadNext = function () {
     		if (!fetching) {
     			Supply.query({
     				offset: $scope.supplies.length,
     				limit: 50
     			}, function (resources) {
     				for (var i=0; i<resources.length; i++) {
     					$scope.supplies.push(resources[i]);
     				}
     			});
     		}
     	};
     	
     	
   }]);
