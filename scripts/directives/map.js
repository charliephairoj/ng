'use strict';

angular.module('employeeApp')
  .directive('map', [function () {
    //Create the variables to be used
    var latLng = {},
        map,
        marker,
        //Options for the map 
        mapOptions= {
            center: new google.maps.LatLng(13.776239,100.527884),
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.HYBRID
        };
    
    function getRegion(country){
        switch(country.toLocaleLowerCase()){
            case "thailand":
                return 'TH';
            case "usa":
                return "US";
            case "us":
                return 'US';
            case "italy":
                return 'IT';
            case 'spain':
                return 'ES';
            case 'germany':
                return 'DE';
            case 'china':
                return 'CN';
            case 'india':
                return 'IN';
            case 'new zealand':
                return 'NZ';
            case 'australia':
                return 'AU';
            default:
                return false;
        }
    }
    //Function to initialize the map
    function initialize() {
        
        
            
             
    }
    return {
        restrict:'A',
        replace:false,
        link: function(scope, element, attrs){
            var geocoder = new google.maps.Geocoder();
            scope.map = scope.map || {};
            map = new google.maps.Map(document.getElementById("map_canvas"),mapOptions);
            scope.map.map = map;    
            scope.map.markers = [];   
            //Refresh the map if a shown event is broadcast
            scope.$on('shown', function(){
              google.maps.event.trigger(map, 'resize');
            });
            //Create a marker and adds to scope.map.markers
            scope.map.createMarker = function(obj){
              if(obj.lat && lat.lng){
                  var marker = new google.maps.Marker({
                      position: new google.maps.LatLng(obj.lat, obj.lng),
                      draggable:true,
                      map: map,
                      title:params.title
                  });
                  if(obj.mouseUp){
                      google.maps.event.addListener(marker, 'mouseup', obj.mouseUp);
                  }
                  //Add Marker to array
                  scope.map.markers.push(marker);
                  //return marker
                  return marker;
              }else{
                  return false;
              }
            };
            //Set map position
            scope.map.setPosition = function(obj){
                var latLng = new google.maps.LatLng(obj.lat, obj.lng);
                map.panTo(latLng);
                map.setZoom(14);
                if(obj.updateMarker){
                    scope.map.markers.length > 0 ? scope.map.markers[0].setPosition(latLng) : scope.map.createMarker(obj);
                }
            };
            //geocodes from the address
            scope.map.getPosition = function(obj, arg2, arg3){
              //If all necessary parts of the address are defined
                //create address string
                  var address =  obj.address1 ? address+' '+obj.address1 : '';
                  address = obj.address2 ? address+' '+obj.address2 : address;
                  address = obj.city ? address+', '+obj.city : address;
                  address = obj.territory ? address+', '+obj.territory : address;
                  address = obj.country ? address+', '+obj.country : address;
                  address = obj.zipcode ? address+' '+obj.zipcode : address;
                  var requestObj = {address:address};
                  if(obj.country){
                      var region = getRegion(obj.country);
                      if(region){
                          requestObj.region = region;
                      }
                  }else if(requestObj.address.search(/[\u0E00-\u0E7F]+/g) != -1){
                      requestObj.region = 'TH';
                  }
                  //Geocode the address via google maps
                  geocoder.geocode(requestObj, function(results, status){
                    if(results.length>0){
                        var positions = [];
                        angular.forEach(results, function(result){
                            positions.push({lat:result.geometry.location.lat(),
                                            lng:result.geometry.location.lng()});
                         
                        });
                        if(angular.isFunction(arg2)){
                            arg2(positions[0]);
                        } 
                    }else{
                        if(angular.isFunction(arg3)){
                            arg3();
                        }
                    }
                  });
            };
          
        }
    };
  }]);
