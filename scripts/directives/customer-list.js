
angular.module('employeeApp')
.directive('customerList', ['Customer', 'Notification', '$parse', function (Customer, Notification, $parse) {
	return {
		templateUrl: 'views/templates/customer-list.html',
		replace: true,
		restrict: 'A',
		scope: {
			visible: '=customerList',
			onSelect: '&'
		},
		link: function postLink(scope, element, attrs) {
			var fetching = true,
				currentSelection;
			scope.currentIndex = 0;
			
			/*
			* Initial fetching of the customers.
			* 
			* We will turn the fetching flag to false
			* once we received the results
			*/
			scope.customers = Customer.query({limit:20}, function (response) {
				fetching = false;
			});
			
			/*
			 * Search
			 */
			scope.$watch('query', function (q) {
				if (q) {
					Customer.query({q:q, limit:5}, function(resources) {
						for (var i=0; i < resources.length; i++) {
							if (scope.customers.indexOfById(resources[i].id) == -1) {
								scope.customers.push(resources[i]);
							}
						}
					});
				}
			});
			/*
			 * Loads the next set of customers if there is no fetching
			 * currently running
			 */
			scope.loadNext = function () {
				if (!fetching) {
					Notification.display("Loading more customers...", false);
					fetching = true;
					Customer.query({
						offset: scope.customers.length,
						limit: 50
					}, function (resources) {
						fetching = false;
						Notification.hide();
						for(var i=0; i<resources.length; i++) {
							scope.customers.push(resources[i]);
						}
					});
				}
			};
			
			/*
			 * The function to run when a customer is selected
			 */
			scope.select = function (customer) {
				scope.onSelect({'customer': customer});
			};
			
			/*
			function parseKeydown(evt) {
				console.log(evt);
				if (evt.which === 38) {
					scope.currentIndex -= 1;
				} else if (evt.which === 40) {
					scope.currentIndex += 1;
				}
			}
			
			scope.$watch('currentIndex', function (val) {
				console.log(val);
			});
			*/
			$(window).keydown(parseKeydown);
		}
    };
}]);
