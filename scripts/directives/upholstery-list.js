
angular.module('employeeApp')
.directive('upholsteryList', ['Upholstery', 'Notification', function (Upholstery, Notification) {
	return {
		templateUrl: 'views/templates/upholstery-list.html',
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
			scope.upholsteries = Upholstery.query({limit:20}, function (response) {
				fetching = false;
			});

			/*
			* Search
			*/
			scope.$watch('query', function(q){
				if (q) {
					Upholstery.query({q:q, limit:10}, function (resources) {
						for (var i=0; i < resources.length; i++) {
							if (scope.upholsteries.indexOfById(resources[i].id) == -1) {
								scope.upholsteries.push(resources[i]);
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
					Notification.display("Loading more upholsteries...", false);
					fetching = true;
					Upholstery.query({
						offset: scope.upholsteries.length,
						limit: 50
					}, function (resources) {
						fetching = false;
						Notification.hide();
						for (var i=0; i<resources.length; i++) {
							scope.upholsteries.push(resources[i]);
						}
					});
				}
			};

			scope.select = function (upholstery) {
				scope.onSelect({$upholstery:upholstery});
			};
		}
	};
}]);
