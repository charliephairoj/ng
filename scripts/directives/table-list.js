'use strict';

angular.module('employeeApp')
  	.directive('tableList', ['Table', 'Notification', function (Table, Notification) {
    	return {
      		templateUrl: 'views/templates/table-list.html',
      		replace: true,
      		restrict: 'A',
      		scope: {
      			onSelect: '&'
      		},
      		link: function postLink(scope, element, attrs) {
        		var fetching = true;
      			
                
                /*
                 * Initial fetching of the customers.
                 * 
                 * We will turn the fetching flag to false
                 * once we received the results
                 */
      			scope.tables = Table.query({limit:20}, function(response) {
      				fetching = false;
      			});
      			
      			/*
      			 * Search
      			 */
      			scope.$watch('query', function(q){
      				if (q) {
	      				Table.query({q:q, limit:10}, function(resources) {
			      			for(var i=0; i < resources.length; i++) {
				      			if(scope.tables.indexOfById(resources[i].id) == -1) {
				      				scope.tables.push(resources[i]);
				      			}
			      			}
			      			
			      		});
		      		}
      			});
      			/*
      			 * Loads the next set of customers if there is no fetching
      			 * currently running
      			 */
      			scope.loadNext = function(){
      				if(!fetching) {
      					Notification.display("Loading more upholsteries...", false);
      					fetching = true;
      					Table.query({
      						offset: scope.tables.length,
      						limit: 50
      					}, function(resources) {
      						fetching = false;
      						Notification.hide();
      						for(var i=0; i<resources.length; i++) {
      							scope.tables.push(resources[i]);
      						}
      					});
      				}
      			}
      			
      			scope.select = function(table) {
      				scope.onSelect({$table:table});
      			}
      			
      			
      		}
    	};
  	}]);
