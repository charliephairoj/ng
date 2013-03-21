/*
 * Controller for the Model Page
 */

function ViewModelsCtrl($scope, Model){
    
    $scope.modelList = Model.query();
    
}

ViewModelsCtrl.$inject = ['$scope', 'Model'];



