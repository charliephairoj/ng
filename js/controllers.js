'use strict';

/* Controllers */


function MainMenuCtrl($scope) {
    
    
   
   
}
MainMenuCtrl.$inject = ['$scope'];





function ViewConfigsCtrl($scope, Configuration){
    
    
    
}

ViewConfigsCtrl.$inject = ['$scope', 'Configuration'];


function AddConfigCtrl($scope, Configuration){
     
    //Adds a new models
    $scope.addNewConfig = function(config){
        console.log('test');
        //close the modal
        $scope.showAddItemModal = false;
        //Initialize the configuration
        var newConfig = new Configuration();
        //Assign the properties
        newConfig.configuration = config.configuration;
        //save
        newConfig.$save(function(responseData, status){
            if(status === 'success'){
                console.log(responseData);
                //Assign the new id
                //newConfig.configID = responseData
            }
        });
      
    };
    
    
}

AddConfigCtrl.$inject = ['$scope', 'Configuration'];




function AddUpholCtrl($scope){
    $scope.modelConfigs = [];
    $scope.listConfigs = function(val){
        
        console.log($scope.uphol.model.configurations);
        console.log($scope.modelConfigs);
        $scope.modelConfigs = $scope.uphol.model.configurations;
    };
    
    //Adds a new models
    $scope.addNewModel = function(model){
        //Create Vars
        var fd = new FormData(), newModel = {};//new Model();
        //close the modal
        $scope.showAddItemModal = false;
        
        //loop through files and add to fd
        jQuery.each($scope.filesToUpload, function(index, file){
            fd.append(index, file);
        });
        
        //Get Model data
        //Create New Model 
        newModel.name = $scope.model.name;
        newModel.model = $scope.model.number;
        newModel.collection = $scope.model.collection;
        
        //Add Model information
        fd.append("modelData", JSON.stringify({'name':newModel.name, 'model':newModel.model, 'collection':newModel.collection}));
        
        //Make ajax call
        jQuery.ajax('/model', {
            type:'POST',
            processData:false,
            contentType:false,
            data:fd,
            success: function(responseData, status){
                if(status==='success'){
                    //Assign id and image urls
                    newModel.modelID = responseData.model.modelID;
                    newModel.images = responseData.model.images;
                    //Add model to collection
                    $scope.models.push(newModel);
                    //Empty input fields
                    $scope.model={};
                    //Call directive function to clear upload files
                    $scope.clearFiles();
                }else{
                    
                }
                
            }
        });
      
    };
    
    
    
}

AddUpholCtrl.$inject = ['$scope'];





/*
 * Library Area
 */


//View Library

function ViewLibraryCtrl($scope, LibraryBook, Poller, Notification){
    
    Poller.poll($scope, function(){
        $scope.bookList = LibraryBook.query(console.log($scope.bookList));
        console.log($scope.bookList);
    });
    
    
    
    //Upload Image
    $scope.upload = function(){
        
        //Notify
        Notification.display('Uploading Image...')
        
        //Close the modal
        $scope.addPhoto = false;
        
        var fd = new FormData();
        var data = {};
        
        data.description = $scope.description;
        data.category = $scope.category;
        
        fd.append('data', JSON.stringify(data));
        fd.append('image', $scope.images[0]);
        
        //clear the form
        $scope.description = null;
        $scope.category = null;
        $scope.images = [];
        $scope.imagePreviews = [];
        
        jQuery.ajax("library", {
           type:'POST',
           data:fd,
           processData:false,
           contentType:false,
           success: function(responseData){
               //Notify
               Notification.diplay('Image Uploaded');
               
               $scope.$apply();
           }
        });
        
        
    };
}

ViewLibraryCtrl.$inject = ['$scope', 'LibraryBook', 'Poller', 'Notification']
