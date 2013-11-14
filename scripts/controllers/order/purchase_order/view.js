'use strict';

angular.module('employeeApp')
  	.controller('OrderPurchaseOrderViewCtrl', ['$scope', 'PurchaseOrder', '$filter', 'Notification',
  	function ($scope, PurchaseOrder, $filter, Notification) {
    	
    	//Flags and variables
    	var fetching = true;
    	
    	//System wide message
    	Notification.display('Loading purchase orders...', false);
    	
    	//Poll Server for pos
    	$scope.poList = PurchaseOrder.query(function () {
    		fetching = false;
    		Notification.hide();
    	}, function () {
    		fetching = false;
    	});
    	
    	/*
    	 * Search Mechanism
    	 * 
    	 * a wartch is put on the query model. 
    	 * whenever it changes a request is made to the server 
    	 * with the query
    	 * 
    	 * The resources are then integrated with the list of 
    	 * PO's so that there are no duplicates
    	 */
    	$scope.$watch('query', function (q) {
    		if(q) {
    			PurchaseOrder.query({limit:5, q:q}, function (resources) {
    				for (var i=0; i<resources.length; i++) {
    					if ($scope.poList.indexOfById(resources[i].id) == -1) {
    						$scope.poList.push(resources[i]);
    					}
    				}
    			});
    		}
    	});
    	
    	$scope.loadNext = function () {
    		if (!fetching) {
    			fetching = true;
	    		PurchaseOrder.query({
	    			limit:20,
	    			offset: $scope.poList.length
	    		}, function (resources) {
	    			fetching = false;
	    			for (var i=0; i<resources.length; i++) {
	    				$scope.poList.push(resources[i]);
	    			}
	    		});
    		}
    	}
    	
  	}]);
