
angular.module('employeeApp')
.directive('upholsteryList', ['Upholstery', 'Notification', '$filter', function (Upholstery, Notification, $filter) {
	return {
		templateUrl: 'views/templates/upholstery-list.html',
		replace: true,
		restrict: 'A',
		scope: {
			onSelect: '&'
		},
		link: function postLink(scope, element, attrs) {
			var fetching = true,
				currentSelection;
			//scope.currentIndex = 0;
			
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
					Upholstery.query({q:q, limit:10 + (scope.query.length*2)}, function (resources) {
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
			/*
			function parseKeydown(evt) {
				console.log(evt);
				if (evt.which === 38) {
					if (scope.currentIndex != 0) {
						scope.currentIndex -= 1;
					}
				} else if (evt.which === 40) {
					if (scope.currentIndex < $filter('filter')(scope.upholsteries, scope.query)) {
						scope.currentIndex += 1;
					}
				}
			}
			
			$(window).keydown(parseKeydown);
			
			
			scope.$watch('currentIndex', function (val) {
				console.log(val);
				currentSelection = $filter('filter')(scope.upholsteries, scope.query);
				console.log(currentSelection);
			}); 
			*/
			scope.select = function (upholstery) {
				scope.onSelect({$upholstery:upholstery});
			};
			
			/*
			scope.$destroy(function () {
				console.log('bye');
				$(window).off('keydown', parseKeydown);
			});*/
		}
	};
}]);
