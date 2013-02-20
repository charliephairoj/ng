'use strict';

/* Controllers */


function MainMenuCtrl($scope) {
    
    
   
   
}
MainMenuCtrl.$inject = ['$scope'];


/*
 * Controller for the Model Page
 */

function ViewModelsCtrl($scope, Model){
    
    //Function to delete a model
    $scope.remove = function(model){
        
        //Delete model from server
        model.$delete(function(){
            /*
             * Deletes the model from the local list
             * by searching for the index then splicing
             */
            var modelIndex = $scope.models.indexOf(model);
            $scope.models.splice(modelIndex, 1);
        });
    };
    
}

ViewModelsCtrl.$inject = ['$scope', 'Model'];



function AddModelCtrl($scope, Model){
  
    
    
    //Adds a new models
    $scope.addNewModel = function(model){
        console.log(Model);
        //Create Vars
        var fd = new FormData(), newModel = new Model();
        
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

AddModelCtrl.$inject = ['$scope', 'Model'];



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



function AddCustomerCtrl($scope, Customer){
    
    
    //Mehtods
    $scope.saveCustomer = function(){
        //New customer  
        var newCustomer = new Customer();
        //Apply the customer details first
        newCustomer.name = $scope.contact.name;
        newCustomer.email = $scope.contact.email;
        newCustomer.telephone = $scope.contact.email;
        newCustomer.fax = $scope.contact.email;
        
    };
}

AddCustomerCtrl.$inject = ['$scope', 'Customer'];

function ViewCustomersCtrl($scope, Customer){
    
    $scope.customerList = Customer.query();
    $scope.customer = {};
    $scope.address = {};
    
    //Watchers
    $scope.$watch('marker', function(){
        if($scope.marker){
            if($scope.marker.lng && $scope.marker.lat){
                
                $scope.address.lng = $scope.marker.lng;
                $scope.address.lat = $scope.marker.lat; 
            }
        }
        
        
    }, true);
    //Mehtods
    
    $scope.getLocation = function(){
        var position = $scope.map.getPosition($scope.address);
        angular.extend($scope.address, position);
    };
    
    $scope.saveCustomer = function(){
        //New customer  
        var newCustomer = new Customer();
        //Apply the customer details first
        angular.copy($scope.customer, newCustomer);
        newCustomer.address = {};
        angular.copy($scope.address, newCustomer.address);
        
        newCustomer.$save(function(){
            $scope.add_customer=false;
            $scope.customerList = Customer.query();
            
        });
    };
}

ViewCustomersCtrl.$inject = ['$scope', 'Customer'];


function CustomerDetailsCtrl($scope, Customer, $routeParams, $location, Notification){
    
    $scope.customer =  Customer.get({'id':$routeParams.id});
    //Mehtods
    $scope.map = function(){
        $scope.viewMap=true;
        $scope.map.setPosition({lat:$scope.customer.address.lat, lng:$scope.customer.address.lng});
         
    };
    
    $scope.update = function(){
        Notification.display('Updating...', false);
        //Holds jobs
        var jobHolder = [];
        //Loop through all the addresses
        angular.forEach($scope.customer.addresses, function(address, index){
            console.log(address);
            jobHolder.push(address);
            $scope.map.getPosition(address, function(position){
                console.log(position);
                angular.extend($scope.customer.addresses[index], position);
                jobHolder.shift();
                console.log(jobHolder);
                if(jobHolder.length === 0){
                    $scope.customer.$save(function(){
                        Notification.display('Updated');
                    });
                }
                
            });
        });
        
        
        
    };
    
    $scope.remove = function(){
        $scope.customer.$delete(function(){
            $location.path('/customers');
        });
        
    };
}

CustomerDetailsCtrl.$inject = ['$scope', 'Customer', '$routeParams', '$location', 'Notification'];



function AddSupplierCtrl($scope, Supplier, $location, Notification){
    
    
    //Mehtods
    
    //addS  contact to the supplier
    $scope.addContact = function(){
        //Notify
        Notification.display('Contact Added to Supplier');
        
        
        $scope.supplier.contacts = $scope.supplier.contacts || [];
      
        
        $scope.supplier.contacts.push(angular.copy($scope.contact));
        
        $scope.contact = {};
        
        $scope.showAddContact = false;
        
    };
    
    $scope.getLocation = function(){
         var position = $scope.map.getPosition($scope.supplier.address, function(response){
             angular.extend($scope.supplier.address, response);
         });
         
    };
    
    //Method to save the supplier to the database
    $scope.save = function(){
        
        if($scope.form.$valid){
            //Notify
            Notification.display('Saving Supplier...', false);
            //New customer  and address objects
            var supplier = new Supplier();
            
            angular.copy($scope.supplier, supplier);
                    
            supplier.$save(function(){
                //Notify
                Notification.display('Supplier Saved');
                $location.path('/suppliers');
            });
        }
        
        
        
        
    };
}

AddSupplierCtrl.$inject = ['$scope', 'Supplier', '$location', 'Notification'];

//View supplierList controller
function ViewSuppliersCtrl($scope, Supplier, Poller){
    
    //Poller.poll($scope, function(){
        $scope.supplierList = Supplier.query();
    //});
    
    
}

ViewSuppliersCtrl.$inject = ['$scope', 'Supplier', 'Poller'];

function SupplierDetailCtrl($scope, Supplier, $routeParams, $location, Poller, SupplierContact, Notification){
    
    $scope.supplier =  Supplier.get({'id':$routeParams.id});
    
    //addS  contact to the supplier
    $scope.addContact = function(){
        
        if(!$scope.supplier.contacts){
            $scope.supplier.contacts = [];
        }
        
        $scope.supplier.contacts.push(angular.copy($scope.contact));
        
        $scope.contact = {};
        
        $scope.showAddContact = false;
        
        //Save changes
        $scope.supplier.$save();
        
    };
    
    //Remove a supplier contact
    $scope.deleteContact = function($index){
        
        var contact = SupplierContact.get({'id':$scope.supplier.contacts[$index].id}, function(){
           
            $scope.supplier.contacts.splice($index, 1);
            contact.$delete();
            
            $scope.supplier.$save();
            $scope.$apply();
        });
        
    
    };
    
    
    $scope.update = function(){
        //Notify
        Notification.display('Updating Supplier...', false);
        $scope.map.getPosition($scope.supplier.address, function(position){
            angular.extend($scope.supplier.address, position);
            $scope.supplier.$save(function(data){
                Notification.display('Supplier Updated');
            });
        });
        
    };
    
    $scope.remove = function(){
        $scope.supplier.$delete(function(){
            $location.path('/suppliers');
        })
        
    }
}

SupplierDetailCtrl.$inject = ['$scope', 'Supplier', '$routeParams', '$location', 'Poller', 'SupplierContact', 'Notification'];


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
