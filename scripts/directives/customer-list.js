
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
			var fetching = true;
			
			/*
			* Visibility Controll
			* 
			* This section controls whether the product selector 
			* is visible or not. By watching the "visible" attribute,
			* which has two way binding with the controller, we can see
			* when the controller wants the selector to be displayed
			* 
			* If the selector is shown, and the background is click, the
			* attribute in the controller is changed via two way binding 
			* and an "onhide" function that is called once the selector is 
			* hidden
			*/
			scope.$watch('visible', function (val) {
				if(val){
					scope.modal.onhide = function(){
						if ($rootScope.$$phase === "$digest" || $rootScope.$$phase === "$apply") {
							scope.visible = false;
						} else {
							$rootScope.$apply(function () {
								scope.visible = false; 
							});
						}
					};
					
					try {
						scope.modal.show();
					} catch (e) {}
				} else {
					try {
						scope.modal.hide();
					} catch (e) {}
				}
			});
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
		}
    };
}]);
