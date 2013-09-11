'use strict';

angular.module('employeeApp')
    .controller('ProductUpholsteryViewCtrl', ['$scope', 'Upholstery', 'Notification', '$filter', '$location',
    function ($scope, Upholstery, Notification, $filter, $location) {
        Notification.display('Loading Upholstery...');
        
        $scope.upholList = Upholstery.poll().query(function(){
            Notification.hide();
        });
        
        var filterFn = function(){
      		$scope.data = $filter('orderBy')($filter('filter')($scope.upholList, $scope.query), 'id', true);
      	};
      	
      	$scope.$watch('upholList.length+query', filterFn);
        
        $scope.gridOptions = {
        	data: 'data',
        	beforeSelectionChange: function(state){
	    		$location.path('/product/upholstery/'+state.entity.id);
	    		return false;
	    	},
     		columnDefs: [{field: 'id', displayName: 'ID', width: '75px'},
     					 {field: 'image.url',
     					  width: '150px',
     					  displayName: 'Example',
     					  cellClass: 'image',
     					  cellTemplate: '<img ng-src="{{row.getProperty(col.field)}}"/>'},
     					 {field: 'model.model', displayName: 'Model'},
     					 {field: 'model.name', displayName: 'Name'},
     					 {field: 'width', displayName: 'Width'},
     					 {field: 'depth', displayName: 'Depth'},
     					 {field: 'height', displayName: 'Height'}]
        }
        $scope.$on('$destroy', function(){
            Upholstery.stopPolling();
        });
   
    }]);
