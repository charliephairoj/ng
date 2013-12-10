
angular.module('employeeApp')
.controller('OrderAcknowledgementViewCtrl', ['$scope', 'Acknowledgement', 'Notification', '$location', '$filter',
function ($scope, Acknowledgement, Notification, $location, $filter) {
	
	
	/*
	 * Vars
	 * 
	 * -fetching: this is a switch to see if there is currently a call being made
	 */
	var fetching = true;
	//Display Program Notification
	Notification.display('Loading Acknowledgements...', false);

	//Poll the server for acknowledgements
	$scope.acknowledgements = Acknowledgement.query({limit:20}, function (e) {
		Notification.hide();
		fetching = false;
	});

	/*
	 * Take the query in the searchbar and then sends 
	 * the query to the server to get more results. The
	 * resuls are then integrated with the current list of
	 * resources;
	 */
	$scope.$watch('query', function (q) {
		if (q) {
			Acknowledgement.query({q:q, limit:5}, function (resources) {
				for (var i=0; i < resources.length; i++) {
					if ($scope.acknowledgements.indexOfById(resources[i].id) == -1) {
						$scope.acknowledgements.push(resources[i]);
					}
				}
			});
		}
	});

	//Loads the next set of data
	$scope.loadNext = function () {
		if (!fetching) {
			fetching = true;
			Notification.display("Loading more acknowledgements", false);
			Acknowledgement.query({
				limit:50, 
				offset:$scope.acknowledgements.length
			}, function (resources) {
				fetching = false;
				Notification.hide();
				for (var i=0; i<resources.length; i++) {
					$scope.acknowledgements.push(resources[i]);
				}
			});
		}
	};
}]);
