'use strict';

angular.module('employeeApp')
  	.controller('OrderAcknowledgementDetailsCtrl', ['$scope', 'Acknowledgement', '$routeParams', 'Notification', '$http', 
  	function ($scope, Acknowledgement, $routeParams, Notification, $http) {
  		
  		//Show system notification
    	Notification.display('Loading Acknowledgement...', false);
    	
    	//Set Vars
    	$scope.showCal = false;
    	
    	//GET request server for Acknowledgements
    	$scope.acknowledgement = Acknowledgement.get({'id':$routeParams.id}, function(){
        	Notification.display('Acknowledgement Loaded');
    	});
    	
    	//Grid Options
    	$scope.gridOptions = {
    		data: 'acknowledgement.products',
    		columnDefs: [{field:'image', displayName: 'Image'}]
    	}
    
    	//Request pdf for acknowledgements from server
	    $scope.getPDF = function(type) {
	        Notification.display('Retrieving PDF...', false);
	        $http.get("acknowledgement/"+$scope.acknowledgement.id+"/pdf", {params:{type:type}}).
	            success(function(response){
	                Notification.hide();
	                window.open(response.url);
	            }).
	            error(function(response){
	            	Notification.display('Unable to retrieve PDFs', false);
	            });
	    };
    
    	//Request log data for acknowledgement
	    $scope.viewLog = function(){
	        $http.get("acknowledgement/"+$scope.acknowledgement.id+"/log").success(function(data){
	             angular.forEach(data, function(log){
	                 
	                 $scope.logs = $scope.logs || [];
	                 $scope.logs.push(log);
	                 $scope.showLog = true;
	             })
	        });
	    }
	    
	    //Save updates to the server
	    $scope.save = function(){
	        Notification.display('Saving Acknowledgement...', false);
	        $scope.acknowledgement.$save(function(response){
	            window.open(response.acknowledgement_url);
	            window.open(response.production_url);
	            Notification.display('Acknowledgement '+$scope.acknowledgement.id+' Saved');
	        }, 
	        function(){
	            Notification.display('Failed to save acknowledgement '+$scope.acknowledgement.id, false);
	        });
	    };
  	}]);
