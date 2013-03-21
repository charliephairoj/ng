function AddUpholsteryCtrl($scope, Model, Configuration, Upholstery, Notification){
    $scope.modelList = Model.query();
    $scope.configurationList = Configuration.query();
    $scope.upholstery = new Upholstery();
    
    $scope.save = function(){
        Notification.display('Saving Upholstery Product...');
        $scope.upholstery.$save(function(){
            Notification.display('Upholstery Product Saved');
        }); 
    };
    
}

AddUpholsteryCtrl.$inject = ['$scope', 'Model', 'Configuration', 'Upholstery', 'Notification'];