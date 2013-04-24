'use strict';

angular.module('employeeApp')
  .controller('SupplyPropViewCtrl', ['$scope', 'Supply', '$filter', '$q', 'Notification',
  function ($scope, Supply, $filter, $q, Notification) {
    $scope.supplyList = Supply.poll().query({type:'prop'});
    $scope.$on('$destroy', function(){
        Supply.stopPolling();
    });
    
    $scope.upload = function(index, image){
     
        Notification.display('Uploading Image...');
        
        var resource = $filter('orderBy')($filter('filter')($scope.supplyList, $scope.query), 'supplier.name')[index],
            deferred = $q.defer(),
            promise = deferred.promise,
            fd = new FormData();
            
        
        
        console.log(resource);
        console.log(promise);
        //Create promise events
        promise.then(function(data){
            /*The success fulfillment of the
             * promise will kick in the events:
             * -Show success notice
             * -update image property of prop
             */
            
            
            //Perform scope updates if
            //The scope still exists
            if ($scope){
                $scope.$apply(function(){
                    Notification.display('Image Updated');
                    resource.image = resource.image || {};
                    angular.copy(data, resource.image);
                });
            }
            
        }, function(reason){
            $scope.$apply(function(){
                Notification.display('Unable to Upload Image');
            })
            
        });
        
        //Append image and upload the form data
        fd.append('image', image);
        jQuery.ajax("supply/image", {
           type:'POST',
           data:fd,
           processData:false,
           contentType:false,
           success: function(response){
               deferred.resolve(response);
           },
           error: function(){
               deferred.reject();
           }
        });
    };
    
  }]);
