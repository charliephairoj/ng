/*
 * Controller for the Model Page
 */

function ViewModelsCtrl($scope, Model){
    
    $scope.modelList = Model.poll().query();
    $scope.$on('$destroy', function(){
        Model.stopPolling();
    });
}

ViewModelsCtrl.$inject = ['$scope', 'Model'];



