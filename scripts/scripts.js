angular.module('employeeApp.services', ['ngResource']);
angular.module('employeeApp.directives', []);
angular.module('employeeApp.filters', []);
angular.module('employeeApp', [
  'ngRoute',
  'ngResource',
  'employeeApp.directives',
  'employeeApp.filters',
  'employeeApp.services',
  'ui.date'
]).config([
  '$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    }).when('/contact/customer/add', {
      templateUrl: 'views/contact/customer/add.html',
      controller: 'ContactCustomerAddCtrl'
    }).when('/contact/customer/:id', {
      templateUrl: 'views/contact/customer/details.html',
      controller: 'ContactCustomerDetailsCtrl'
    }).when('/contact/customer', {
      templateUrl: 'views/contact/customer/view.html',
      controller: 'ContactCustomerViewCtrl'
    }).when('/contact/supplier/add', {
      templateUrl: 'views/contact/supplier/add.html',
      controller: 'ContactSupplierAddCtrl'
    }).when('/contact/supplier', {
      templateUrl: 'views/contact/supplier/view.html',
      controller: 'ContactSupplierViewCtrl'
    }).when('/contact/supplier/:id', {
      templateUrl: 'views/contact/supplier/details.html',
      controller: 'ContactSupplierDetailsCtrl'
    }).when('/contact', { templateUrl: 'views/contact.html' }).when('/product/upholstery/add', {
      templateUrl: 'views/product/upholstery/add.html',
      controller: 'ProductUpholsteryAddCtrl'
    }).when('/product/upholstery', {
      templateUrl: 'views/product/upholstery/view.html',
      controller: 'ProductUpholsteryViewCtrl'
    }).when('/product/upholstery/:id', {
      templateUrl: 'views/product/upholstery/details.html',
      controller: 'ProductUpholsteryDetailsCtrl'
    }).when('/product', { templateUrl: 'views/product.html' }).when('/product/model/add', {
      templateUrl: 'views/product/model/add.html',
      controller: 'ProductModelAddCtrl'
    }).when('/product/model', {
      templateUrl: 'views/product/model/view.html',
      controller: 'ProductModelViewCtrl'
    }).when('/product/model/:id', {
      templateUrl: 'views/product/model/details.html',
      controller: 'ProductModelDetailsCtrl'
    }).when('/order/acknowledgement/create', {
      templateUrl: 'views/order/acknowledgement/create.html',
      controller: 'OrderAcknowledgementCreateCtrl'
    }).when('/order', { templateUrl: 'views/order.html' }).when('/order/acknowledgement', {
      templateUrl: 'views/order/acknowledgement/view.html',
      controller: 'OrderAcknowledgementViewCtrl'
    }).when('/order/shipping/create', {
      templateUrl: 'views/order/shipping/create.html',
      controller: 'OrderShippingCreateCtrl'
    }).when('/order/shipping', {
      templateUrl: 'views/order/shipping/view.html',
      controller: 'OrderShippingViewCtrl'
    }).when('/order/shipping/deliveries/today', {
      templateUrl: 'views/order/shipping/today.html',
      controller: 'OrderShippingTodayCtrl'
    }).when('/order/shipping/deliveries/week', {
      templateUrl: 'views/order/shipping/week.html',
      controller: 'OrderShippingWeekCtrl'
    }).when('/administrator/group/add', {
      templateUrl: 'views/administrator/group/add.html',
      controller: 'AdministratorGroupAddCtrl'
    }).when('/administrator/group', {
      templateUrl: 'views/administrator/group/view.html',
      controller: 'AdministratorGroupViewCtrl'
    }).when('/administrator/group/:id', {
      templateUrl: 'views/administrator/group/details.html',
      controller: 'AdministratorGroupDetailsCtrl'
    }).when('/administrator/user/add', {
      templateUrl: 'views/administrator/user/add.html',
      controller: 'AdministratorUserAddCtrl'
    }).when('/administrator/user/:id', {
      templateUrl: 'views/administrator/user/details.html',
      controller: 'AdministratorUserDetailsCtrl'
    }).when('/administrator/user', {
      templateUrl: 'views/administrator/user/view.html',
      controller: 'AdministratorUserViewCtrl'
    }).when('/administrator', { templateUrl: 'views/administrator.html' }).when('/supply', {
      templateUrl: 'views/supply/view.html',
      controller: 'SupplyViewCtrl'
    }).when('/supply/fabric', {
      templateUrl: 'views/supply/fabric/view.html',
      controller: 'SupplyFabricViewCtrl'
    }).when('/supply/fabric/add', {
      templateUrl: 'views/supply/fabric/add.html',
      controller: 'SupplyFabricAddCtrl'
    }).when('/supply/fabric/:id', {
      templateUrl: 'views/supply/fabric/details.html',
      controller: 'SupplyFabricDetailsCtrl'
    }).when('/supply/foam/add', {
      templateUrl: 'views/supply/foam/add.html',
      controller: 'SupplyFoamAddCtrl'
    }).when('/supply/foam/:id', {
      templateUrl: 'views/supply/foam/details.html',
      controller: 'SupplyFoamDetailsCtrl'
    }).when('/supply/foam', {
      templateUrl: 'views/supply/foam/view.html',
      controller: 'SupplyFoamViewCtrl'
    }).when('/accounting', { templateUrl: 'views/accounting.html' }).when('/accounting/transaction', {
      templateUrl: 'views/accounting/transaction/view.html',
      controller: 'AccountingTransactionViewCtrl'
    }).when('/accounting/transaction/add', {
      templateUrl: 'views/accounting/transaction/add.html',
      controller: 'AccountingTransactionAddCtrl'
    }).when('/accounting/transaction/:id', {
      templateUrl: 'views/accounting/transaction/details.html',
      controller: 'AccountingTransactionDetailsCtrl'
    }).when('/order/acknowledgement/:id', {
      templateUrl: 'views/order/acknowledgement/details.html',
      controller: 'OrderAcknowledgementDetailsCtrl'
    }).when('/order/shipping/delivery', {
      templateUrl: 'views/order/shipping/delivery.html',
      controller: 'OrderShippingDeliveryCtrl'
    }).when('/order/shipping/:id', {
      templateUrl: 'views/order/shipping/details.html',
      controller: 'OrderShippingDetailsCtrl'
    }).when('/order/acknowledgement/item/:id', {
      templateUrl: 'views/order/acknowledgement/item/details.html',
      controller: 'OrderAcknowledgementItemDetailsCtrl'
    }).when('/supply/prop', {
      templateUrl: 'views/supply/prop/view.html',
      controller: 'SupplyPropViewCtrl'
    }).when('/supply/prop/add', {
      templateUrl: 'views/supply/prop/add.html',
      controller: 'SupplyPropAddCtrl'
    }).when('/supply/prop/:id', {
      templateUrl: 'views/supply/prop/details.html',
      controller: 'SupplyPropDetailsCtrl'
    }).when('/supply/lumber/view', {
      templateUrl: 'views/supply/lumber/view.html',
      controller: 'SupplyLumberViewCtrl'
    }).when('/product/inventory', {
      templateUrl: 'views/product/inventory.html',
      controller: 'ProductInventoryCtrl'
    }).when('/product/table', {
      templateUrl: 'views/product/table/view.html',
      controller: 'ProductTableViewCtrl'
    }).when('/product/rug', {
      templateUrl: 'views/product/rug.html',
      controller: 'ProductRugCtrl'
    }).when('/product/rug/view', {
      templateUrl: 'views/product/rug/view.html',
      controller: 'ProductRugViewCtrl'
    }).when('/product/rug/add', {
      templateUrl: 'views/product/rug/add.html',
      controller: 'ProductRugAddCtrl'
    }).when('/product/table/add', {
      templateUrl: 'views/product/table/add.html',
      controller: 'ProductTableAddCtrl'
    }).when('/product/table/:id', {
      templateUrl: 'views/product/table/details.html',
      controller: 'ProductTableDetailsCtrl'
    }).when('/project', {
      templateUrl: 'views/project/view.html',
      controller: 'ProjectViewCtrl'
    }).when('/project/:id', {
      templateUrl: 'views/project/details.html',
      controller: 'ProjectDetailsCtrl'
    }).when('/hr', { templateUrl: 'views/hr.html' }).when('/hr/employee', {
      templateUrl: 'views/hr/employee/view.html',
      controller: 'HrEmployeeViewCtrl'
    }).when('/project/room/:id', {
      templateUrl: 'views/project/room/details.html',
      controller: 'ProjectRoomDetailsCtrl'
    }).when('/order/purchase_order', {
      templateUrl: 'views/order/purchase_order/view.html',
      controller: 'OrderPurchaseOrderViewCtrl'
    }).when('/order/purchase_order/create', {
      templateUrl: 'views/order/purchase_order/create.html',
      controller: 'OrderPurchaseOrderCreateCtrl'
    }).when('/order/purchase_order/:id', {
      templateUrl: 'views/order/purchase_order/details.html',
      controller: 'OrderPurchaseOrderDetailsCtrl'
    }).when('/supply/:id', {
      templateUrl: 'views/supply/details.html',
      controller: 'SupplyDetailsCtrl'
    }).otherwise({ redirectTo: '/' });
  }
]);
function search(list, key, value, callback, error) {
  for (var i = 0; i < list.length; i++) {
    if (list[i].hasOwnProperty(key)) {
      if (list[i][key] == value) {
        callback(list[i], i);
        return list[i];
      }
    }
  }
  if (angular.isFunction(error)) {
    error();
  }
  return false;
}
function merge(permList, groupPerms) {
  if (permList && groupPerms) {
    angular.forEach(groupPerms, function (perm) {
      search(permList, 'id', perm.id, function (item, index) {
        permList[index].status = true;
      });
    });
  }
}
/*
 * Declare the standard headers
 */
angular.module('employeeApp').config([
  '$httpProvider',
  function ($httpProvider) {
    $httpProvider.defaults.headers.post = {
      'Cache-Control': 'no-cache',
      'expires': '-1',
      'pragma': 'no-cache',
      'Content-Type': 'application/json'
    };
    $httpProvider.defaults.headers.get = {
      'Cache-Control': 'no-cache',
      'expires': '-1',
      'pragma': 'no-cache'
    };
    /*
     * Takes out the objects from the data 
     */
    $httpProvider.defaults.transformResponse.push(function (data, headers) {
      if (typeof data == 'object') {
        if (data.hasOwnProperty('meta') && data.hasOwnProperty('objects')) {
          return data.objects;
        }
      }
      return data;
    });
  }
]);
/*
 * Run top level application code
 */
angular.module('employeeApp').run([
  '$rootScope',
  'CurrentUser',
  'scanner',
  '$http',
  'Geocoder',
  function ($rootScope, CurrentUser, scanner, $http, Geocoder) {
    /*
	 * Get the current user and place it at the top scope
	 */
    $rootScope.currentUser = new CurrentUser();
    /*
     * Prototypical extension of core classes
     */
    //Array: indexById
    Array.prototype.indexOfById = function (needle) {
      needle = typeof needle == 'object' ? needle.hasOwnProperty('id') ? needle.id : null : needle;
      var haystack = this;
      for (var i = 0; i < haystack.length; i++) {
        if (haystack[i].id == needle) {
          return i;
        }
      }
      return -1;
    };
    /*
     * Finding a key by value
     * 
     * This function finds the first instance of a key 
     * based on the value provided
     */
    $rootScope.safeApply = function (fn) {
      var phase = this.$root.$$phase;
      if (phase == '$apply' || phase == '$digest') {
        if (fn && typeof fn === 'function') {
          fn();
        }
      } else {
        this.$apply(fn);
      }
    };
    /*
     * Set values and objects that are used throughout
     * the application
     */
    $rootScope.units = {
      'in': 'Inch',
      cm: 'Centimeter',
      m: 'Meter',
      mm: 'Millimeter',
      yd: 'Yard',
      kg: 'Kilogram',
      pack: 'Pack',
      container: 'Container',
      pc: 'Piece'
    };
    window.globalScanner = new scanner('global');
    globalScanner.enable();
    /*
	 * Geolocating the user
	 * 
	 * Establishes the current country that the user is currently in.
	 * First uses the HTML5 geolocation test to determine, if the browser
	 * has implemented. And then retrieves the lat and lng. The lat and lng 
	 * are then reverse geolocated with the google maps reserves geocode
	 * service. The results are then search for the country code. 
	 * 
	 */
    //Set initial country
    $rootScope.country = 'TH';
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        //Reverse geocode and returns the promise
        var promise = Geocoder.reverseGeocode(position.coords.latitude, position.coords.longitude);
        //Set the success and error callbacks for the promise
        promise.then(function (results) {
          //Cycle through componenets to look for country
          for (var i in results[0].address_components) {
            var component = results[0].address_components[i];
            if (typeof component.types == 'object') {
              if (component.types.indexOf('country') != -1) {
                console.log(component);
                //Set country to main scope, to be called later
                $rootScope.country = 'KH';  //$rootScope.country = component.short_name;
              }
            }
          }
        }, function () {
          console.error('Getting the position failed');
        });
      }, function (e) {
        console.log(e);
      });
    } else {
      console.log('Geolocation not available');
    }
  }
]);
angular.module('employeeApp').controller('ContactCustomerAddCtrl', [
  '$scope',
  'Customer',
  '$location',
  'Notification',
  'Geocoder',
  function ($scope, Customer, $location, Notification, Geocoder) {
    $scope.customer = new Customer();
    $scope.save = function () {
      if ($scope.form.$valid) {
        Notification.display('Creating customer...', false);
        $scope.customer.$save(function () {
          Notification.display('Customer created');
          $location.path('/contact/customer');
        }, function (e) {
          Notification.display('There was an error in creating the customer', false);
        });
      } else {
        Notification.display('Please fill out all required fields correctly', false);
      }
    };
    $scope.getPosition = function () {
      if ($scope.customer.address.address1 && $scope.customer.address.city && $scope.customer.address.territory && $scope.customer.address.country && $scope.customer.address.zipcode) {
        //Get promise and bind to call backs
        var promise = Geocoder.geocode($scope.customer.address);
        promise.then(function (results) {
          if ($scope.marker) {
            $scope.marker.setPosition(results[0].geometry.location);
          } else {
            $scope.marker = $scope.map.createMarker(results[0].geometry.location);
            $scope.marker.onchange = function (latLng) {
              //Set address lat and lng
              $scope.customer.address.lat = $scope.marker.lat;
              $scope.customer.address.lng = $scope.marker.lng;
            };
          }
          //Reposition the map to the marker
          $scope.map.setPosition(results[0].geometry.location);
          //Set the Address lat and lng
          $scope.customer.address.lat = $scope.marker.lat;
          $scope.customer.address.lng = $scope.marker.lng;
        }, function (status) {
          console.error(status);
        });
      }
    };
  }
]);
angular.module('employeeApp').controller('ContactCustomerDetailsCtrl', [
  '$scope',
  'Customer',
  '$routeParams',
  '$location',
  'Notification',
  '$timeout',
  function ($scope, Customer, $routeParams, $location, Notification, $timeout) {
    var updateLoopActive = false, timeoutPromise;
    $scope.customer = Customer.get({ 'id': $routeParams.id }, function () {
    });
    /*
    function updatePosition(results){
        if ($scope.marker) {
            $scope.marker.setPosition(results[0].geometry.location);
        } else {
            $scope.marker = $scope.map.createMarker(results[0].geometry.location);
            $scope.marker.onchange = function (latLng) {
                //Set address lat and lng
                $scope.customer.address.lat = $scope.marker.lat;
                $scope.customer.address.lng = $scope.marker.lng;
                $scope.customer.address.user_defined_latlng = true;
                $scope.customer.$update();
            };
        }
      
        //Reposition the map to the marker
        $scope.map.setPosition(results[0].geometry.location);
      
        //Set the Address lat and lng
        $scope.customer.address[0].lat = $scope.marker.lat;
        $scope.customer.address[0].lng = $scope.marker.lng;
    }
    */
    //Mehtods
    $scope.update = function () {
    };
    $scope.$watch(function () {
      var customer = angular.copy($scope.customer);
      delete customer.last_modified;
      return customer;
    }, function (newVal, oldVal) {
      if (oldVal.hasOwnProperty('id') && !updateLoopActive) {
        updateLoopActive = true;
        timeoutPromise = $timeout(function () {
          Notification.display('Updating customer...', false);
          var customer = angular.copy($scope.customer);
          customer.$update(function () {
            updateLoopActive = false;
            Notification.display('Customer updated');
          }, function () {
            Notification.display('There was an error updating the customer');
          });
        }, 5000);
      }
    }, true);
    /*
    $scope.updatePosition = function () {
        var promise = Geocoder.geocode($scope.customer.address);
        promise.then(function (results) {
            updatePosition(results);
        });
    };*/
    $scope.remove = function () {
      $scope.customer.$delete(function () {
        $location.path('/contact/customer');
      });
    };
    $scope.$on('$destroy', function () {
      $timeout.cancel(timeoutPromise);
      Notification.display('Updating customer...', false);
      $scope.customer.$update(function () {
        Notification.display('Customer updated.');
      });
    });
  }
]);
angular.module('employeeApp').controller('ContactCustomerViewCtrl', [
  '$scope',
  'Customer',
  'Notification',
  '$location',
  '$filter',
  function ($scope, Customer, Notification, $location, $filter) {
    var fetching = false;
    //Display system notification
    Notification.display('Loading Customers...', false);
    //Poll the server for customers
    $scope.customers = Customer.query(function () {
      Notification.hide();
    });
    /*
     * Searches the server
     * 
     * This function will search the server via GET
     * with the query string as a parameter
     * if the query string is not undefined
     * 
     * The resources returned are then added to the 
     * list of they are are not already in the list
     */
    $scope.$watch('query', function (q) {
      if (q) {
        Customer.query({ q: q }, function (resources) {
          for (var i = 0; i < resources.length; i++) {
            if ($scope.customers.indexOfById(resources[i]) == -1) {
              $scope.customers.push(resources[i]);
            }
          }
        });
      }
    });
    $scope.loadNext = function () {
      if (!fetching) {
        fetching = true;
        Customer.query({
          offset: $scope.customers.length,
          limit: 50
        }, function (resources) {
          fetching = false;
          for (var i = 0; i < resources.length; i++) {
            $scope.customers.push(resources[i]);
          }
        });
      }
    };
  }
]);
angular.module('employeeApp').controller('ContactSupplierAddCtrl', [
  '$scope',
  'Supplier',
  '$location',
  'Notification',
  function ($scope, Supplier, $location, Notification) {
    $scope.supplier = new Supplier();
    //Mehtods
    //addS  contact to the supplier
    $scope.addContact = function () {
      //Notify
      Notification.display('Contact Added to Supplier');
      $scope.supplier.contacts = $scope.supplier.contacts || [];
      $scope.supplier.contacts.push(angular.copy($scope.contact));
      $scope.contact = {};
      $scope.showAddContact = false;
    };
    $scope.getLocation = function () {
      var position = $scope.map.getPosition($scope.supplier.address, function (response) {
          angular.extend($scope.supplier.address, response);
          $scope.map.setPosition({
            lat: response.lat,
            lng: response.lng,
            updateMarker: true
          });
        });
    };
    //Method to save the supplier to the database
    $scope.save = function () {
      if ($scope.form.$valid) {
        //Notify
        Notification.display('Saving supplier...', false);
        $scope.supplier.$save(function () {
          //Notify
          Notification.display('Supplier Saved');
          $location.path('/contact/supplier');
        }, function (e) {
          Notification.display('There was an error in creating this supplier', false);
        });
      } else {
        Notification.display('Please fill out all required sections correctly');
      }
    };
  }
]);
angular.module('employeeApp').controller('ContactSupplierViewCtrl', [
  '$scope',
  'Supplier',
  'Notification',
  '$filter',
  function ($scope, Supplier, Notification, $filter) {
    //System message
    Notification.display('Loading suppliers...', false);
    //Load initial suppliers
    $scope.suppliers = Supplier.query(function () {
      Notification.hide();
    });
    /*
     * Search Mechanism
     */
    $scope.$watch('query', function (q) {
      if (q) {
        Supplier.query({ q: q }, function (resources) {
          for (var i = 0; i < resources.length; i++) {
            if ($scope.suppliers.indexOfById(resources[i]) == -1) {
              $scope.suppliers.push(resources[i]);
            }
          }
        });
      }
    });
    $scope.loadNext = function () {
      Supplier.query({
        offset: $scope.suppliers.length,
        limit: 50
      }, function (resources) {
        for (var i = 0; i < resources.length; i++) {
          $scope.suppliers.push(resources[i]);
        }
      });
    };
  }
]);
angular.module('employeeApp').controller('ContactSupplierDetailsCtrl', [
  '$scope',
  'Supplier',
  '$routeParams',
  '$location',
  'SupplierContact',
  'Notification',
  '$timeout',
  function ($scope, Supplier, $routeParams, $location, SupplierContact, Notification, $timeout) {
    var updateLoopActive = false, timeoutPromise;
    //Retreive the supplier from the server
    $scope.supplier = Supplier.get({ 'id': $routeParams.id });
    //addS  contact to the supplier
    $scope.addContact = function (contact) {
      $scope.supplier.contacts = $scope.supplier.contacts || [];
      contact = contact || $scope.contact;
      $scope.supplier.contacts.push(contact);
      $scope.contact = {};
      $scope.showAddContact = false;
      //Save changes
      $scope.supplier.$update();
    };
    //Remove a supplier contact
    $scope.deleteContact = function ($index) {
      var contact = SupplierContact.get({ 'id': $scope.supplier.contacts[$index].id }, function () {
          $scope.supplier.contacts.splice($index, 1);
          contact.$delete();
          $scope.supplier.$save();
          $scope.$apply();
        });
    };
    $scope.$watch(function () {
      var supplier = angular.copy($scope.supplier);
      delete supplier.last_modified;
      return supplier;
    }, function (newVal, oldVal) {
      if (!updateLoopActive && oldVal.hasOwnProperty('id')) {
        updateLoopActive = true;
        timeoutPromise = $timeout(function () {
          Notification.display('Updating supplier...', false);
          var supplier = angular.copy($scope.supplier);
          supplier.$update(function () {
            updateLoopActive = false;
            Notification.display('Supplier updated');
          }, function () {
            Notification.display('There was an error updating the supplier');
          });
        }, 5000);
      }
    }, true);
    $scope.update = function () {
    };
    $scope.remove = function () {
      $scope.supplier.$remove(function () {
        $location.path('/contact/supplier');
      });
    };
    $scope.$on('$destroy', function () {
      Notification.display('Updating supplier...', false);
      $scope.supplier.$update(function () {
        Notification.display('Supplier updated');
      }, function (e) {
        Notification.display('There was an error updating the supplier');
      });
    });
  }
]);
/* jshint ignore: start */
angular.module('employeeApp.services').factory('ecResource', [
  '$storage',
  '$rootScope',
  '$http',
  '$q',
  '$parse',
  '$resource',
  function ($storage, $rootScope, $http, $q, $parse, $resource) {
    function ResourceFactory(url, paramDefaults, actions) {
      var DEFAULT_ACTIONS = {
          'get': { method: 'GET' },
          'save': { method: 'POST' },
          'update': { method: 'PUT' },
          'query': {
            method: 'GET',
            isArray: true
          },
          'remove': { method: 'DELETE' },
          'delete': { method: 'DELETE' }
        }, oResource, storage = $storage(url.split(/\//g)[0]), value, poll = false, getter = function (obj, path) {
          return $parse(path)(obj);
        };
      /*Helper Functions*/
      function extractParams(data, actionParams) {
        var ids = {};
        actionParams = angular.extend({}, paramDefaults, actionParams);
        angular.forEach(actionParams, function (value, key) {
          if (angular.isFunction(value)) {
            value = value();
          }
          ids[key] = value.charAt && value.charAt(0) == '@' ? getter(data, value.substr(1)) : value;
        });
        return ids;
      }
      function indexOfId(array, id) {
        for (var i = 0; i < array.length; i++) {
          if (array[i].hasOwnProperty('id')) {
            if (array[i].id == id) {
              return i;
            }
          }
        }
        return -1;
      }
      //Extend all actions to include default and argument actions
      actions = angular.extend({}, DEFAULT_ACTIONS, actions);
      //Assign original and new resource
      oResource = new $resource(url, paramDefaults, actions);
      function Resource(value) {
        angular.extend(this, value || {});
        this.$$poll = false;
        this.$$last_checked = false;
        this.$$timeout;
        this.$$date = true;
      }
      /*
             * Set Date for when doing mock tests
             */
      Resource.disableDate = function () {
        this.$$date = false;
      };
      Resource.prototype.disableDate = Resource.disableDate;
      /*
             * Create a polling function. When the polling function 
             * is call the poll value will be set to true
             */
      Resource.poll = function () {
        this.$$poll = true;
        poll = true;
        return this;
      };
      Resource.prototype.poll = Resource.poll;
      Resource.stopPolling = function () {
        poll = false;
        return this;
      };
      Resource.prototype.poll = Resource.poll;
      //Loop through actions
      angular.forEach(actions, function (action, name) {
        var hasBody = action.method == 'POST' || action.method == 'PUT' || action.method == 'PATCH';
        //Default methods
        Resource[name] = function (a1, a2, a3, a4) {
          var params = {};
          var data;
          var success = angular.noop;
          var error = null;
          var promise;
          switch (arguments.length) {
          case 4:
            error = a4;
            success = a3;
          //fallthrough
          case 3:
          case 2:
            if (angular.isFunction(a2)) {
              if (angular.isFunction(a1)) {
                success = a1;
                error = a2;
                break;
              }
              success = a2;
              error = a3;  //fallthrough
            } else {
              params = a1;
              data = a2;
              success = a3;
              break;
            }
          case 1:
            if (angular.isFunction(a1))
              success = a1;
            else if (hasBody)
              data = a1;
            else
              params = a1;
            break;
          case 0:
            break;
          default:
            throw 'Expected between 0-4 arguments [params, data, success, error], got ' + arguments.length + ' arguments.';
          }
          if (action.isArray) {
            value = angular.isArray(value) ? value || [] : [];
          } else {
            value = angular.isObject(value) && !value.hasOwnProperty('length') ? value || {} : {};
          }
          value['$$marker'] = 'poop';
          //Runs storage mechanism if exists
          if (storage[name]) {
            //Determines if param or data is used
            var strorageData = hasBody ? storage[name](data) || value : storage[name](params) || value;
            //Determines if array or not when creating resource
            if (action.isArray) {
              angular.forEach(strorageData, function (item, index) {
                var index = indexOfId(value, item.id);
                if (index > -1) {
                  angular.extend(value[index], new Resource(item));
                }
                index > -1 ? angular.extend(value[index], new Resource(item)) : value.push(new Resource(item));
              });
            } else {
              value = new Resource(strorageData);
            }
            //Copies storage data with key to self
            if (hasBody) {
              angular.extend(value, this);
            }
          }
          /*
                     * Determines whether to include the last modified parameter depending
                     * on whether the 'last_checked' var has a value or not
                     */
          /*
                    if(this.$$last_checked && action.method == "GET" && poll){ 
                        angular.extend(params, {last_modified:this.$$last_checked.toISOString()})
                    }
                    if(storage.getLastModified() && action.method == "GET"){
                        angular.extend(params, {last_modified:storage.getLastModified().toISOString()});
                    }
                    */
          var oPromise = oResource[name](params, data, function (response) {
              //save data to storage
              action.method == 'DELETE' ? storage.remove(params) : storage.save(response);
              //copy data to body
              if (action.method == 'DELETE' || hasBody) {
                angular.extend(this, response);
              }
              //pass data to placeholder
              if (action.isArray) {
                //Reset array
                var index;
                angular.forEach(response, function (item) {
                  var index = indexOfId(value, item.id);
                  if (index > -1) {
                    angular.extend(value[index], item);
                  } else {
                    value.push(new Resource(item));
                  }
                });
              } else {
                angular.extend(value, new Resource(response));
              }
              this.$$last_checked = new Date();
              storage.saveLastModified(this.$$last_checked);
              if (poll && action.method == 'GET') {
                this.$$timeout = setTimeout(Resource[name], 5000);
              }
              console.log(value.length);
              //execute callback
              success(response);
            }.bind(this), function (e) {
              console.log(e);
            });
          //return placeholder
          return value;
        };
        //Prototypical methods
        Resource.prototype['$' + name] = function (a1, a2, a3) {
          var params = extractParams(this), success = angular.noop, error;
          switch (arguments.length) {
          case 3:
            params = a1;
            success = a2;
            error = a3;
            break;
          case 2:
          case 1:
            if (angular.isFunction(a1)) {
              success = a1;
              error = a2;
            } else {
              params = a1;
              success = a2 || angular.noop;
            }
          case 0:
            break;
          default:
            throw 'Expected between 1-3 arguments [params, success, error], got ' + arguments.length + ' arguments.';
          }
          var data = hasBody ? this : undefined;
          Resource[name].call(this, params, data, success, error);
        };
      });
      return Resource;
    }
    return ResourceFactory;
  }
]);
/* jshint ignore:end */
angular.module('employeeApp.services').factory('$storage', [function () {
    function storageFactory(key) {
      //Create the main factory
      function StorageEngine(key) {
        //ASSIGNS KEY TO OBJECT
        this.key = key;
        //CHECKS IF SUPPORTS LOCALSTORAGE
        if ('localStorage' in window && window.localStorage !== null) {
          this.storage = window.localStorage;
          this.getKeys();
        }
      }
      //determines if storage works
      StorageEngine.prototype.isSupported = function () {
        try {
          return 'localStorage' in window && window.localStorage !== null;
        } catch (e) {
          return false;
        }
      };
      /*
         * The following methods deal with the key and 
         * array of keys that holds the ids for individual 
         * objects under this key.
         */
      //Create a key
      StorageEngine.prototype.createKeysArray = function () {
        this.keys = [];
        this.saveKeys();
        return this.keys;
      };
      //Save keys
      StorageEngine.prototype.saveKeys = function () {
        typeof this.keys === 'object' ? this.storage.setItem(this.key, JSON.stringify(this.keys)) : this.createKeysArray();  // jshint ignore:line
      };
      StorageEngine.prototype.createKey = function () {
        key = 'storage-temp' + Date.now();
        return key;
      };
      //Save a key
      StorageEngine.prototype.saveKey = function (arg) {
        var itemKey = this.key + arg;
        //CHECK IF keys is valid
        this.keys = this.keys || this.createKeysArray();
        //Checks for duplicates
        if (this.keys.indexOf(itemKey) === -1) {
          this.keys.push(itemKey);
          this.saveKeys();
        }
        return itemKey;
      };
      //Retrieve all keys
      StorageEngine.prototype.getKeys = function () {
        //Get keys
        this.keys = JSON.parse(this.storage.getItem(this.key));
        //If keys are not an array, create an array to hold keys
        if (typeof this.keys != 'object') {
          //Create an for keys and saves it
          this.createKeysArray();
        }
        return this.keys;
      };
      //Delete a key
      StorageEngine.prototype.deleteKey = function (key) {
        //Checks whether keys are valid
        this.keys = this.keys || this.getKeys();
        var index = this.keys.indexOf(key);
        if (index != -1) {
          this.keys.splice(index);
          this.saveKeys();
          return true;
        } else {
          return false;
        }
      };
      //Clear Keys
      StorageEngine.prototype.clearKeys = function () {
        this.keys = [];
        this.storage.setItem(this.key, JSON.stringify(this.keys));
        if (JSON.parse(this.storage.getItem(this.key)).length === 0) {
          return true;
        } else {
          return false;
        }
      };
      //Get a key
      StorageEngine.prototype.getKey = function (arg) {
        //CREATE TEMPORARY KEY
        return this.key + arg;
      };
      /*
         * The following methods deal with the actual retrieving, storing
         * and delete of the object themselves represented by the keys
         */
      //querya all items of name space
      StorageEngine.prototype.query = function () {
        //create array to hold data
        var data = [], i;
        //iterate through all the keys
        this.keys = this.getKeys();
        for (i in this.keys) {
          data.push(JSON.parse(this.storage.getItem(this.keys[i])));
        }
        //return the data
        return data;
      };
      //Save item into storage
      StorageEngine.prototype.save = function (data) {
        var itemKey;
        //Function to save object if it has an id
        function saveFn(obj) {
          if (obj.hasOwnProperty('id')) {
            var itemKey = this.saveKey(obj.id);
            this.storage.setItem(itemKey, JSON.stringify(obj));
            return true;
          } else {
            return false;
          }
        }
        var saveObject = saveFn.bind(this);
        //Check if the data is valid
        if (data) {
          //Checks if an array or not
          if (angular.isArray(data)) {
            //loop through items
            for (var i = 0; i < data.length; i++) {
              //return false if data did not save
              if (!saveObject(data[i])) {
                return false;
              }
            }
          } else {
            //return false if data did not save
            return saveObject(data) ? data : false;
          }
        } else {
          //return false if data is not valid
          return false;
        }
      };
      //Get an item from storage
      StorageEngine.prototype.get = function (args) {
        if (args.hasOwnProperty('id')) {
          var itemKey;
          //CHECKS IF THE ARG
          itemKey = this.getKey(args.id);
          if (itemKey) {
            return JSON.parse(this.storage.getItem(itemKey));
          } else {
            return 'itemKey';
          }
        } else {
          return args;
        }
      };
      //Remove an Item from storage
      StorageEngine.prototype.remove = function (args) {
        //declare vars
        var itemKey;
        //checks if object has an id
        if (args.hasOwnProperty('id')) {
          //get item key from id
          itemKey = this.getKey(args.id);
          //delete item and item key
          this.storage.removeItem(itemKey);
          this.deleteKey(itemKey);
          return true;  //returns false is has no id
        } else {
          return false;
        }
      };
      //Clear Items
      StorageEngine.prototype.clear = function () {
        var index;
        //clear items
        for (index in this.keys) {
          this.storage.removeItem(this.keys[index]);
        }
        //clear keys
        this.clearKeys();
      };
      /*
         * Save and retrieves last modified time for resources
         */
      StorageEngine.prototype.saveLastModified = function (date) {
        this.storage.setItem(this.key + '-last_modified', date.toISOString());
      };
      StorageEngine.prototype.getLastModified = function () {
        var dateStr = this.storage.getItem(this.key + '-last_modified');
        if (dateStr) {
          return new Date(dateStr);
        } else {
          return false;
        }
      };
      return new StorageEngine(key);
    }
    return storageFactory;
  }]);
angular.module('employeeApp.services').factory('Customer', [
  '$resource',
  function ($resource) {
    return $resource('/api/v1/customer/:id', { id: '@id' }, {
      update: { method: 'PUT' },
      create: { method: 'POST' }
    });
  }
]);
angular.module('employeeApp.services').factory('Supplier', [
  '$resource',
  function ($resource) {
    return $resource('/api/v1/supplier/:id', { id: '@id' }, {
      update: { method: 'PUT' },
      create: { method: 'POST' }
    });
  }
]);
angular.module('employeeApp.services').factory('CurrentUser', [
  '$http',
  function ($http) {
    //Create the initial object
    function User() {
      //Declare flags and array holder for fns
      this.ready = false;
      this._onready = [];
      //Get information about the current user
      var promise = $http.get('/api/v1/current_user');
      promise.then(function (response) {
        angular.extend(this, response.data || {});
        this.ready = true;
        for (var i = 0; i < this._onready.length; i++) {
          this._onready[i](response.data);
        }
      }.bind(this));
    }
    //checks if user has a permission
    User.prototype.hasPermission = function (permStr) {
      //If the permissions are not yet
      //loaded then false is returnd
      return this.modules ? this.permissions.indexOf(permStr) !== -1 ? true : false : false;
    };
    //Checks if user has a module
    User.prototype.hasModule = function (moduleStr) {
      //If the permissions are not yet
      //loaded then false is returnd
      return this.modules ? this.modules.indexOf(moduleStr) !== -1 ? true : false : false;
    };
    Object.defineProperties(User.prototype, {
      onready: {
        set: function (fn) {
          if (typeof fn == 'function') {
            this._onready.push(fn);
          }
        }
      }
    });
    //return the user
    return User;
  }
]);
angular.module('employeeApp.services').factory('Notification', [
  '$timeout',
  '$rootScope',
  function ($timeout, $rootScope) {
    function center(target) {
      var width = $(window).width();
      var tWidth = $(target).width();
      if ($(target).css('left') === 0) {
        $(target).css('left', width - tWidth);
      } else {
        $(target).css('margin-left', -(tWidth / 2));
      }
    }
    function Notifier() {
      this.notification = angular.element('#notification');
      this.promise = null;
    }
    /*
     * The display function will display a new messge
     * And call a timeout after a certain amount of time
     * to fade out the message. If the message is already displayed,
     * it will just change the message and cancel the old timeout.
     */
    Notifier.prototype.display = function (message, autoHide) {
      //Change message and 
      $rootScope.safeApply(function () {
        this.notification.html(message);
        center(this.notification);
        this.notification.addClass('active');
      }.bind(this));
      //Cancels the fadingout and 
      //removal of message
      if (this.promise) {
        $timeout.cancel(this.promise);
      }
      if (autoHide !== false) {
        this.promise = $timeout(function () {
          this.hide();
        }.bind(this), 1000);
      }
    };
    Notifier.prototype.hide = function () {
      //Remove Message and 
      this.notification.removeClass('active');
    };
    return new Notifier();
  }
]);
angular.module('employeeApp.services').factory('SupplierContact', [
  'eaResource',
  function (eaResource) {
    return eaResource('supplier_contact/:id', { id: '@id' });
  }
]);
angular.module('employeeApp.filters').filter('dateRange', [function () {
    function filter(date, start, end, success) {
      if (start.getTime() <= date.getTime() && date.getTime() <= end.getTime()) {
        success();
      }
    }
    function convertToDateObject(arg) {
      switch (typeof arg) {
      case 'object':
        return arg;
      case 'string':
        return new Date(arg);
      case 'number':
        return new Date(arg);
      default:
        return new Date(arg);
      }
    }
    return function (array, key, arg1, arg2) {
      var predicates = [], start = convertToDateObject(arg1), end = convertToDateObject(arg2), testDate = null;
      angular.forEach(array, function (item) {
        if (item.hasOwnProperty(key)) {
          if (typeof item[key] == 'object') {
            filter(item[key], start, end, function () {
              predicates.push(item);
            });
          } else if (typeof item[key] == 'string') {
            testDate = new Date(item[key]);
            filter(testDate, start, end, function () {
              predicates.push(item);
            });
          } else if (typeof item[key] == 'number') {
            testDate = new Date(item[key]);
            filter(testDate, start, end, function () {
              predicates.push(item);
            });
          }
        }
      });
      return predicates;
    };
  }]);
angular.module('employeeApp.filters').filter('dateFilter', [function () {
    function filter(item, target, comparison, success) {
      switch (comparison) {
      case 'equals':
        if (item.getMonth() == target.getMonth() && item.getYear() == target.getYear() && item.getDate() == target.getDate()) {
          return true;
        }
        break;
      case 'greater':
        if (item.getTime() >= target.getTime()) {
          return true;
        }
        break;
      case 'less':
        if (item.getTime() <= target.getTime()) {
          return true;
        }
        break;
      default:
        if (item.getMonth(item) == target.getMonth() && item.getYear() == target.getYear() && item.getDate() == target.getDate()) {
          return true;
        }
        break;
      }
      return false;
    }
    return function (array, key, date, comparison) {
      var predicates = [];
      angular.forEach(array, function (item) {
        if (item.hasOwnProperty(key)) {
          if (typeof item[key] == 'object') {
            if (filter(item[key], date, comparison)) {
              predicates.push(item);
            }
          } else if (typeof item[key] == 'string') {
            var testDate = new Date(item[key]);
            filter(testDate, date, comparison, function (verifiedObj) {
              predicates.push(verifiedObj);
            });
          }
        }
      });
      return predicates;
    };
  }]);
angular.module('employeeApp.filters').filter('beautify', [function () {
    return function (input) {
      try {
        //declare vars
        var newStrArray = [], newStr, upperLetter, newWord,
          //split the words into array
          words = input.split(/\s+/);
        //loops through the words and uppercase first letter
        angular.forEach(words, function (word) {
          //Capitalize first lteer 
          upperLetter = word.charAt(0).toUpperCase();
          //get remainder of word
          newWord = word.slice(1);
          //create new formatted word
          newWord = upperLetter + newWord;
          //add to new string array
          newStrArray.push(newWord);
        });
        //join new string array
        newStr = newStrArray.join(' ');
        //return string
        return newStr;
      } catch (e) {
        return input;
      }
    };
  }]);
angular.module('employeeApp.filters').filter('exclude', [function () {
    //function to compare
    return function (array, key, value) {
      if (!(array instanceof Array)) {
        return [];
      }
      var filtered = [];
      for (var i in array) {
        if (array[i][key] != value) {
          filtered.push(array[i]);
        }
      }
      return filtered;
    };
  }]);
angular.module('employeeApp.filters').filter('telephone', [function () {
    return function ($input) {
      var clean = $input.replace(/ /g, '').replace(/\-/g, '');
      return clean;
    };
  }]);
angular.module('employeeApp').controller('ProductUpholsteryAddCtrl', [
  '$scope',
  'Model',
  'Configuration',
  'Upholstery',
  'Notification',
  '$location',
  function ($scope, Model, Configuration, Upholstery, Notification, $location) {
    $scope.modelList = Model.query({ limit: 0 });
    $scope.configurationList = Configuration.query({ limit: 0 });
    $scope.upholstery = new Upholstery();
    //Text for tooltips
    $scope.modelText = 'Choose a Model';
    $scope.configurationText = 'Choose a Configuration';
    $scope.widthText = 'Enter a Width in millimeters';
    $scope.depthText = 'Enter a Depth in millimeters';
    $scope.bpText = 'Enter the number of Back Pillows';
    $scope.apText = 'Enter the number of Accent Pillows';
    $scope.lpText = 'Enter the number of Lumbar Pillows';
    $scope.cpText = 'Enter the number of Corner Pillows';
    $scope.upload = function () {
      //Notify of uploading image
      Notification.display('Uploading Image...', false);
      var fd = new FormData();
      fd.append('image', $scope.images[0]);
      //clear the form
      $scope.addLength = null;
      $scope.addRemark = null;
      jQuery.ajax('/api/v1/upholstery/image', {
        type: 'POST',
        data: fd,
        processData: false,
        contentType: false,
        success: function (responseData) {
          Notification.display('Image Uploaded');
          $scope.upholstery.image = $scope.upholstery.image || {};
          angular.copy(responseData, $scope.upholstery.image);
          $scope.$apply();
        }
      });
    };
    $scope.save = function () {
      Notification.display('Saving Upholstery Product...');
      $scope.upholstery.$create(function () {
        Notification.display('Upholstery Product Saved');
        $location.path('/product/upholstery');
      });
    };
  }
]);
angular.module('employeeApp').controller('ProductUpholsteryViewCtrl', [
  '$scope',
  'Upholstery',
  'Notification',
  '$filter',
  '$location',
  function ($scope, Upholstery, Notification, $filter, $location) {
    var fetching = false;
    Notification.display('Loading Upholstery...', false);
    $scope.resources = Upholstery.query({ limit: 20 }, function () {
      Notification.hide();
    });
    $scope.$watch('query', function (q) {
      if (q) {
        Upholstery.query({
          q: q,
          limit: 5
        }, function (resources) {
          for (var i = 0; i < resources.length; i++) {
            if ($scope.resources.indexOfById(resources[i]) == -1) {
              $scope.resources.push(resources[i]);
            }
          }
        });
      }
    });
    $scope.loadNext = function () {
      if (!fetching) {
        Notification.display('Loading more upholstery...', false);
        Upholstery.query({
          offset: $scope.resources.length,
          limit: 10
        }, function (resources) {
          Notification.hide();
          for (var i = 0; i < resources.length; i++) {
            $scope.resources.push(resources[i]);
          }
        });
      }
    };
  }
]);
angular.module('employeeApp').controller('ProductUpholsteryDetailsCtrl', [
  '$scope',
  'Upholstery',
  '$routeParams',
  'Notification',
  '$location',
  function ($scope, Upholstery, $routeParams, Notification, $location) {
    $scope.updateLoopActive = true;
    $scope.uphol = Upholstery.get({ 'id': $routeParams.id }, function () {
      $scope.safeApply(function () {
        $scope.updateLoopActive = false;
      });
    });
    //Upload Image
    $scope.upload = function () {
      //Notify of uploading image
      Notification.display('Uploading Image...', false);
      var fd = new FormData();
      fd.append('image', $scope.images[0]);
      jQuery.ajax('/api/v1/upholstery/image', {
        type: 'POST',
        data: fd,
        cache: false,
        processData: false,
        contentType: false,
        success: function (responseData) {
          Notification.display('Image Updated');
          $scope.uphol.image = {};
          angular.copy(responseData, $scope.uphol.image);
          $scope.uphol.$update();
          $scope.imagePreviews = null;
          $scope.images = null;
          $scope.$apply();
        }
      });
    };
    $scope.$watch(function () {
      var uphol = angular.copy($scope.uphol);
      try {
        delete uphol.last_modified;
        delete uphol.image;
      } catch (e) {
      }
      return uphol;
    }, function (newVal, oldVal) {
      if (!$scope.updateLoopActive && oldVal.hasOwnProperty('id')) {
        $scope.updateLoopActive = true;
        Notification.display('Updating ' + $scope.uphol.description + '...', false);
        $scope.uphol.$update(function () {
          $scope.updateLoopActive = false;
          Notification.display($scope.uphol.description + ' updated.');
        });
      }
    }, true);
    $scope.update = function () {
      Notification.display('Saving Upholsterty...', false);
      $scope.uphol.$update(function () {
        Notification.display('Upholstery Saved');
      });
    };
    $scope.remove = function () {
      Notification.display('Deleteing Upholstery Product');
      $scope.uphol.$delete(function () {
        Notification.display('Upholstery Product Deleted');
        $location.path('/product/upholstery');
      });
    };
    $scope.$on('$destroy', function () {
      $scope.update();
    });
  }
]);
angular.module('employeeApp.services').factory('Upholstery', [
  '$resource',
  function ($resource) {
    return $resource('/api/v1/upholstery/:id', { id: '@id' }, {
      update: { method: 'PUT' },
      create: { method: 'POST' }
    });
  }
]);
angular.module('employeeApp.services').factory('Model', [
  '$resource',
  function ($resource) {
    return $resource('/api/v1/model/:id', { id: '@id' }, {
      update: { method: 'PUT' },
      create: { method: 'POST' }
    });
  }
]);
angular.module('employeeApp.services').factory('Configuration', [
  '$resource',
  function ($resource) {
    return $resource('/api/v1/configuration/:id', { id: '@id' }, {
      update: { method: 'PUT' },
      create: { method: 'POST' }
    });
  }
]);
angular.module('employeeApp').controller('ProductModelAddCtrl', [
  '$scope',
  'Model',
  'Notification',
  '$location',
  function ($scope, Model, Notification, $location) {
    $scope.model = new Model();
    //Tooltips
    $scope.nameText = 'Enter a Name for this Model';
    $scope.modelText = 'Enter a Model Number for this Model';
    $scope.collectionText = 'Enter this Model\'s Collection';
    //Adds a new models
    $scope.save = function (model) {
      Notification.display('Saving Model...', false);
      $scope.model.$create(function () {
        $location.path('/product/model');
        Notification.display('Model Saved');
      });
    };
    $scope.uploadImage = function () {
      //Notify of uploading image
      Notification.display('Uploading Image...', false);
      var fd = new FormData();
      fd.append('image', $scope.images[0]);
      //clear the form
      $scope.addLength = null;
      $scope.addRemark = null;
      jQuery.ajax('/api/v1/model/image', {
        type: 'POST',
        data: fd,
        processData: false,
        contentType: false,
        success: function (responseData) {
          Notification.display('Image Uploaded');
          $scope.model.image = $scope.model.image || {};
          angular.copy(responseData, $scope.model.image);
          $scope.$update();
          $scope.$apply();
        }
      });
    };
  }
]);
angular.module('employeeApp').controller('ProductModelViewCtrl', [
  '$scope',
  'Model',
  'Notification',
  function ($scope, Model, Notification) {
    var fetching = false;
    $scope.modelList = Model.query(function () {
    });
    $scope.$watch('query', function (q) {
      if (q) {
        Model.query({
          q: q,
          limit: 10
        }, function (resources) {
          for (var i = 0; i < resources.length; i++) {
            if ($scope.modelList.indexOfById(resources[i]) == -1) {
              $scope.modelList.push(resources[i]);
            }
          }
        });
      }
    });
    $scope.loadNext = function () {
      if (!fetching) {
        Notification.display('Loading more models...', false);
        Model.query({
          limit: 50,
          offset: $scope.modelList.length
        }, function (resources) {
          for (var i = 0; i < resources.length; i++) {
            $scope.modelList.push(resources[i]);
          }
        });
      }
    };
  }
]);
angular.module('employeeApp').controller('ProductModelDetailsCtrl', [
  '$scope',
  'Model',
  '$routeParams',
  '$location',
  'Notification',
  '$http',
  function ($scope, Model, $routeParams, $location, Notification, $http) {
    $scope.model = Model.get({ 'id': $routeParams.id });
    //Uploads Profie Image
    $scope.upload = function () {
      //display notification
      Notification.display('Uploading Model Image...', false);
      var fd = new FormData();
      fd.append('image', $scope.images[0]);
      //clear the form
      $scope.addLength = null;
      $scope.addRemark = null;
      jQuery.ajax('fabric/' + $scope.model.id + '/image', {
        type: 'POST',
        data: fd,
        processData: false,
        contentType: false,
        success: function (response) {
          Notification.display('Model Image Updated');
          $scope.model.image = $scope.model.image || {};
          angular.copy(response, $scope.model.image);
          $scope.model.$save();
          $scope.imagePreviews = null;
          $scope.images = null;
          $scope.$apply();
        }
      });
    };
    $scope.remove = function () {
      //Notify
      Notification.display('Deleting Model...');
      //Ajax call to delete
      $scope.model.$delete(function () {
        //Notify
        Notification.display('Model Deleted');
        //Reroute to view page
        $location.path('/product/model');
      });
    };
    $scope.update = function () {
      Notification.display('Saving Model...', false);
      $scope.model.$update(function () {
        Notification.display('Model Updated');
      });
    };
    $scope.$on('$destroy', function () {
      $scope.update();
    });
  }
]);
angular.module('employeeApp.services').factory('Acknowledgement', [
  '$resource',
  '$http',
  function ($resource, $http) {
    return $resource('/api/v1/acknowledgement/:id', { id: '@id' }, {
      update: { method: 'PUT' },
      create: { method: 'POST' }
    });
  }
]);
angular.module('employeeApp').controller('OrderAcknowledgementCreateCtrl', [
  '$scope',
  'Acknowledgement',
  'Customer',
  '$filter',
  'Notification',
  function ($scope, Acknowledgement, Customer, $filter, Notification) {
    //Vars
    $scope.showFabric = false;
    $scope.uploading = false;
    $scope.customImageScale = 100;
    $scope.ack = new Acknowledgement();
    var uploadTargets = [];
    var storage = window.localStorage;
    if (storage.getItem('acknowledgement-create')) {
      angular.extend($scope.ack, JSON.parse(storage.getItem('acknowledgement-create')));
    }
    $scope.ack.items = $scope.ack.items || [];
    $scope.employee = { id: $scope.currentUser.id };
    $scope.tempSave = function () {
      storage.setItem('acknowledgement-create', JSON.stringify($scope.ack));
    };
    $scope.addCustomer = function (customer) {
      //Set Customer
      $scope.ack.customer = customer;
      //Hide Customer Panel
      $scope.showCustomers = false;
      $scope.tempSave();
    };
    $scope.addItem = function (product) {
      $scope.ack.items.push(product);
      $scope.tempSave();
    };
    $scope.removeItem = function (index) {
      $scope.ack.items.splice(index, 1);
      $scope.tempSave();
    };
    $scope.create = function () {
      $scope.ack.employee = $scope.currentUser;
      $scope.tempSave();
      try {
        if ($scope.isValidated()) {
          Notification.display('Creating Acknowledgement...', false);
          $scope.ack.$create(function (response) {
            Notification.display('Acknowledgement created');
            if (response.pdf.acknowledgement) {
              window.open(response.pdf.acknowledgement);
            }
            if (response.pdf.production) {
              window.open(response.pdf.production);
            }
            angular.extend($scope.ack, JSON.parse(storage.getItem('acknowledgement-create')));
          }, function (e) {
            console.error(e);
            Notification.display('There was an error in creating the Acknowledgement', false);
          });
        }
      } catch (e) {
        Notification.display(e.message, false);
      }
    };
    $scope.reset = function () {
      $scope.ack = new Acknowledgement();
      $scope.ack.items = [];
      storage.removeItem('acknowledgement-create');
      Notification.display('Acknowledgement reset.');
    };
    //Validations
    $scope.isValidated = function () {
      /*
         * The following are test to see if
         * The property has already been added
         */
      if (!$scope.ack.customer) {
        throw new TypeError('Please add a customer.');
      } else {
        if (!$scope.ack.customer.hasOwnProperty('id')) {
          throw new ReferenceError('Missin customer ID');
        }
      }
      //Validate ordered Items
      if (!$scope.ack.items) {
        throw new TypeError('Products is not an array');
      } else {
        //Verifies that there are items ordered
        if ($scope.ack.items.length <= 0) {
          throw new RangeError('No products added to the order');
        } else {
          for (var i = 0; i < $scope.ack.items.length; i++) {
            var item = $scope.ack.items[i];
            /*
                     * Check that there is a quantity 
                     * for each piece of product
                     */
            if (!$scope.ack.items[i].hasOwnProperty('quantity') || !$scope.ack.items[i].quantity) {
              throw new RangeError('Expecting a quantity of at least 1 for ' + $scope.ack.items[i].description);
            }
            /*
                     * Validates that every item has a price
                     */
            if (!$scope.ack.items[i].hasOwnProperty('has_price')) {
            } else {
              if (!$scope.ack.items[i].has_price) {
              }
            }
            /*
                     * Validates custom items
                     */
            if (!item.hasOwnProperty('id')) {
              if (!item.is_custom) {
                throw new TypeError('Item without id is not custom. Please contact an Administrator.');
              }
            }
          }
        }
      }
      //Validate Delivery Date
      if (!$scope.ack.delivery_date) {
        throw new TypeError('Please select a preliminary delivery date.');
      }
      //Validate vat
      if ($scope.ack.vat === undefined || $scope.ack.vat === null) {
        throw new TypeError('Please set the vat.');
      }
      //Validate purchase order number
      if (!$scope.ack.po_id) {
        throw new TypeError('PO# is not defined');
      }
      //Return true for form validated
      return true;
    };
  }
]);
angular.module('employeeApp').controller('OrderAcknowledgementViewCtrl', [
  '$scope',
  'Acknowledgement',
  'Notification',
  '$location',
  '$filter',
  'KeyboardNavigation',
  function ($scope, Acknowledgement, Notification, $location, $filter, KeyboardNavigation) {
    /*
	 * Vars
	 * 
	 * -fetching: this is a switch to see if there is currently a call being made
	 */
    var fetching = true, index = 0, currentSelection;
    //Display Program Notification
    Notification.display('Loading Acknowledgements...', false);
    //Poll the server for acknowledgements
    $scope.acknowledgements = Acknowledgement.query({ limit: 20 }, function (e) {
      Notification.hide();
      fetching = false;
      changeSelection(index);
    });
    /*
	 * Take the query in the searchbar and then sends 
	 * the query to the server to get more results. The
	 * resuls are then integrated with the current list of
	 * resources;
	 */
    $scope.$watch('query', function (q) {
      if (q) {
        Acknowledgement.query({
          q: q,
          limit: 5
        }, function (resources) {
          for (var i = 0; i < resources.length; i++) {
            if ($scope.acknowledgements.indexOfById(resources[i].id) == -1) {
              $scope.acknowledgements.push(resources[i]);
            }
          }
          index = 0;
          changeSelection(index);
        });
      }
    });
    //Loads the next set of data
    $scope.loadNext = function () {
      if (!fetching) {
        fetching = true;
        Notification.display('Loading more acknowledgements', false);
        Acknowledgement.query({
          limit: 50,
          offset: $scope.acknowledgements.length
        }, function (resources) {
          fetching = false;
          Notification.hide();
          for (var i = 0; i < resources.length; i++) {
            $scope.acknowledgements.push(resources[i]);
          }
        });
      }
    };
    function filter(array) {
      return $filter('filter')(array, $scope.query);
    }
    function changeSelection(i) {
      $scope.safeApply(function () {
        if (currentSelection) {
          currentSelection.$selected = false;
        }
        currentSelection = filter($scope.acknowledgements)[i];
        if (currentSelection) {
          currentSelection.$selected = true;
        }
      });
      var selection = $('.item.selected');
      var container = selection.parents('.outer-container');
      var scrollTop = container.scrollTop();
      var cHeight = container.innerHeight();
      if (scrollTop > selection.outerHeight() * i) {
        container.scrollTop(selection.outerHeight() * i);
      } else if (scrollTop + cHeight < selection.outerHeight() * i) {
        container.scrollTop(selection.outerHeight() * i);
      }
    }
    var keyboardNav = new KeyboardNavigation();
    keyboardNav.ondown = function () {
      if (index < filter($scope.acknowledgements).length - 1) {
        index += 1;
        changeSelection(index);
      }
    };
    keyboardNav.onup = function () {
      if (index !== 0) {
        index -= 1;
        changeSelection(index);
      }
    };
    keyboardNav.onenter = function () {
      $scope.safeApply(function () {
        $location.path('/order/acknowledgement/' + currentSelection.id);
      });
    };
    keyboardNav.enable();
    $scope.$on('$destroy', function () {
      keyboardNav.disable();
    });
  }
]);
angular.module('employeeApp.services').factory('Fabric', [
  '$resource',
  function ($resource) {
    return $resource('/api/v1/fabric/:id/:action', { id: '@id' }, {
      update: { method: 'PUT' },
      create: { method: 'POST' },
      add: {
        method: 'POST',
        params: { action: 'add' }
      },
      subtract: {
        method: 'POST',
        params: { action: 'subtract' }
      }
    });
  }
]);
angular.module('employeeApp.directives').directive('fadeLoad', [function () {
    return {
      restrict: 'A',
      replace: false,
      link: function (scope, element, attrs) {
        element.css('opacity', 0);
        element.bind('load', function () {
          element.fadeTo(1000, 1);
        });
      }
    };
  }]);
angular.module('employeeApp').directive('fadeIn', [function () {
    return {
      restrict: 'A',
      replace: false,
      link: function (scope, element, attrs) {
        element.addClass('fadeIn');
      }
    };
  }]);
angular.module('employeeApp').directive('ecBlur', [function () {
    return {
      restrict: 'A',
      replace: false,
      link: function (scope, element, attrs) {
        element.bind('blur', function () {
          scope.$eval(attrs.ecBlur);
        });
      }
    };
  }]);
angular.module('employeeApp').directive('dragOn', [function () {
    return {
      restrict: 'A',
      replace: false,
      link: function (scope, element, attrs) {
        element.attr('draggable', true);
        element.bind('dragstart', function (event) {
          event.originalEvent.dataTransfer.setData('text/plain', JSON.stringify(scope.$eval(attrs.dragOn)));
        });
      }
    };
  }]);
angular.module('employeeApp').directive('dropOn', [function () {
    function emptyStrFilter(element, index, array) {
      return element !== '';
    }
    /*
     * Function helps get the target object
     * in the scope
     */
    function getTarget(scope, targetString) {
      //Assigns vars
      /*
         * Extracts the first string part, which
         * we can expect to exsist. Then we extract
         * the last part, which we check if we need
         * to make
         */
      var preTarget = targetString.split(/\.\w*$/).shift(), targetObj = targetString.split(/\./).pop(), target;
      //Evaluates against scope
      target = scope.$eval(preTarget);
      //check if obj exsists and create if not
      target[targetObj] = target[targetObj] || {};
      //advances the progressing
      target = target[targetObj];
      //Return 
      return target;
    }
    /*
     * Function returns the data from the drop event
     * and automatically parses it
     */
    function getData(event) {
      return JSON.parse(event.originalEvent.dataTransfer.getData('text/plain'));
    }
    //Prevent Propagation
    function preventPropagation(event) {
      event.stopPropagation();
      event.preventDefault();
      event.originalEvent.dataTransfer.effectAllowed = 'copy';
    }
    return {
      restrict: 'A',
      replace: false,
      link: function (scope, element, attrs) {
        element.bind('drop', function (event) {
          preventPropagation(event);
          element.removeClass('drag');
          /*
                 * Gets the target and copies
                 * the data from the dragged 
                 * object to it
                 */
          scope.$apply(function () {
            var target = getTarget(scope, attrs.dropOn);
            angular.copy(getData(event), target);
          });
        }).bind('dragover', function (event) {
          preventPropagation(event);
          element.addClass('drag');
        }).bind('dragleave', function (event) {
          preventPropagation(event);
          element.removeClass('drag');
        });
      }
    };
  }]);
angular.module('employeeApp').directive('imageDropTarget', [
  '$parse',
  function ($parse) {
    return {
      restrict: 'A',
      replace: false,
      link: function ($scope, element, attrs) {
        /*
             * Create Objects and Functions to be used
             */
        //File Reader
        var fileReader = new FileReader();
        fileReader.onload = function (evt) {
          var image = { 'url': evt.target.result };
          //Create array if not exists
          $scope.imagePreviews = $scope.imagePreviews || [];
          $scope.$apply(function () {
            $scope.imagePreviews.push(image);
          });
        };
        /*
             * Available methods to interact with this directive 
             * inlucde: clear images
             */
        //Clear Image
        $scope.clearImages = function () {
          $scope.images ? $scope.images.length = 0 : $scope.images = [];  // jshint ignore:line
        };
        /*
             * Add functions to deal with the drag enter,leave and
             * over actions of the user
             */
        //Drag Enter
        element.bind('dragenter', function (evt) {
          evt.preventDefault();
          element.addClass('active');
        });
        //Drag Leave
        element.bind('dragleave', function (evt) {
          evt.preventDefault();
          element.removeClass('active');
        });
        //Drag over
        element.bind('dragover', function (evt) {
          evt.preventDefault();
          element.addClass('active');
        });
        /*
             * This Section deals with the Dropping of the file, 
             * checking if it is an image, and adding it to the array
             * "scope.images"
             */
        element.bind('drop', function (evt) {
          //prevent default
          evt.preventDefault();
          evt.stopPropagation();
          element.removeClass('active');
          //Get original evt within jquery evt
          var e = evt.originalEvent;
          //Get the files
          var files = e.dataTransfer.files;
          //Loop Through all up loaded files,
          //validate that they are images and add
          //it to the "scope.images"
          for (var i = 0; i < files.length; i++) {
            if (files[i].type == 'image/png' || files[i].type == 'image/jpeg') {
              //Create array if not exists
              $scope.images = $scope.images || [];
              //Push image   
              $scope.images.push(files[i]);
              //Read data and push to preview
              fileReader.readAsDataURL(files[i]);
            }
          }
          //Eval the attr of this directive
          $scope.$eval(attrs.imageDropTarget);
        });
      }
    };
  }
]);
angular.module('employeeApp').directive('beautify', [
  '$filter',
  '$parse',
  function ($filter, $parse) {
    return {
      restrict: 'A',
      link: function (scope, element, attr) {
        //bind to blur
        element.bind('blur', function () {
          //create new beautified version
          var beautifiedValue = $filter('beautify')(element.context.value);
          //apply to input
          element.context.value = beautifiedValue;
          //assign to model
          $parse(attr.ngModel).assign(scope, beautifiedValue);
        });
      }
    };
  }
]);
angular.module('employeeApp.directives').directive('telephone', [
  '$filter',
  '$parse',
  function ($filter, $parse) {
    return {
      restrict: 'A',
      link: function (scope, element, attr) {
        //bind to blur
        element.bind('blur', function () {
          //create new beautified version
          var filteredValue = $filter('telephone')(element.context.value);
          //apply to input
          element.context.value = filteredValue;
          //assign to model
          $parse(attr.ngModel).assign(scope, filteredValue);
        });
      }
    };
  }
]);
angular.module('employeeApp.directives').directive('map', [
  'mapMarker',
  function (mapMarker) {
    //Create the variables to be used
    var latLng = {}, map, marker;
    //Options for the map 
    try {
      var mapOptions = {
          center: new google.maps.LatLng(13.776239, 100.527884),
          zoom: 10,
          mapTypeId: google.maps.MapTypeId.HYBRID
        };
    } catch (e) {
    }
    return {
      restrict: 'A',
      replace: false,
      link: function (scope, element, attrs) {
        try {
          scope.map = {
            Marker: mapMarker,
            LatLng: google.maps.LatLng
          };
          scope.map.map = new google.maps.Map(element.get(0), mapOptions);
          //Refresh the map if a shown event is broadcast
          scope.$on('shown', function () {
            google.maps.event.trigger(scope.map.map, 'resize');
          });
          scope.map.refresh = function () {
            google.maps.event.triggger(this.map);
          };
          //Create a marker and adds to scope.map.markers
          scope.map.createMarker = function (obj) {
            if (obj instanceof google.maps.LatLng) {
              latLng = obj;
            } else if (obj.hasOwnProperty('lat') && obj.hasOwnProperty('lng')) {
              latLng = new google.maps.LatLng(obj.lat, obj.lng);
            } else {
              latLng = null;
            }
            return new scope.map.Marker({
              map: this.map,
              position: latLng
            });
          };
          //Set map position
          scope.map.setPosition = function (obj) {
            if (obj instanceof google.maps.LatLng) {
              latLng = obj;
            } else {
              latLng = new google.maps.LatLng(obj.lat, obj.lng);
            }
            this.map.panTo(latLng);
            this.map.setZoom(14);
          };
        } catch (e) {
        }
      }
    };
  }
]);
angular.module('employeeApp').directive('clickUrl', [function () {
    return {
      restrict: 'A',
      link: function (scope, element, attr) {
        element.bind('click', function () {
          scope.category = 'fabric';
          $location.path(attr.clickUrl);
          scope.$apply();
        });
      }
    };
  }]);
angular.module('employeeApp.directives').directive('modal', [function () {
    var backdrop;
    var closeButton;
    function create_backdrop() {
      return angular.element('<div id="backdrop"></div>');
    }
    function postLink(scope, element, attr) {
    }
    return {
      restrict: 'A',
      scope: false,
      compile: function () {
        return {
          pre: function (scope, tElement, tAttrs) {
            tElement.addClass('modal hide');
            if (tAttrs.title) {
              closeButton = angular.element('<button type="button" class="close">&times;</button>');
              var title = angular.element('<div class="title"><h4>' + tAttrs.title + '</h4></div>');
              title.append(closeButton);
              tElement.append(title);
            } else {
            }
          },
          post: function (scope, element, attrs) {
            function show(scope, element) {
              element.removeClass('hide');
              backdrop = create_backdrop();
              $(document.body).append(backdrop);
              backdrop.on('click', function () {
                hide(scope, element, backdrop);
              });
              backdrop.fadeTo(500, 0.7);
              element.fadeTo(500, 1, function () {
                scope.$broadcast('shown');
              });
            }
            function hide(scope, element, backdrop, callback) {
              element.fadeOut(400, function () {
                element.addClass('hide');
                scope.$broadcast('hidden');
              });
              if (backdrop) {
                backdrop.fadeOut(500, function () {
                  backdrop.remove();
                  (callback || angular.noop)();
                  try {
                    (scope.modal._onhide && scope.modal || angular.noop)();
                  } catch (e) {
                    console.warn(e);
                  }
                  if (attrs.ngModel || attrs.modal) {
                    if (scope.$$phase == '$apply' || scope.$$phase == '$digest') {
                      scope[attrs.ngModel || attrs.modal] = false;
                    } else {
                      scope.$apply(function () {
                        scope[attrs.ngModel || attrs.modal] = false;
                      });
                    }
                  }
                  if (attrs.onhide) {
                    scope.$eval(attrs.onhide);
                  }
                });
              }
            }
            /*
					* Hide the modal when the page
					* changes based on the scope 
					* messages
					*/
            scope.$on('$destroy', function () {
              if (backdrop) {
                backdrop.remove();
              }
            });
            if (attrs.ngModel || attrs.modal) {
              scope.$watch(attrs.ngModel || attrs.modal, function (value) {
                if (value) {
                  show(scope, element);
                } else {
                  hide(scope, element, backdrop);
                }
              });
            }
            scope.modal = { _onhide: undefined };
            scope.modal.show = function () {
              show(scope, element);
            };
            scope.modal.hide = function (callback) {
              hide(scope, element, backdrop, callback);
            };
            Object.defineProperties(scope.modal, {
              onhide: {
                set: function (fn) {
                  this._onhide = fn;
                }
              }
            });
            if (closeButton) {
              closeButton.click(function () {
                scope.$apply(function () {
                  scope[attrs.ngModel || attrs.modal] = false;
                });
              });
            }
          }
        };
      }
    };
  }]);
angular.module('employeeApp').controller('OrderShippingCreateCtrl', [
  '$scope',
  'Acknowledgement',
  '$filter',
  'Notification',
  'Shipping',
  '$location',
  'scanner',
  function ($scope, Acknowledgement, $filter, Notification, Shipping, $location, scanner) {
    var fetchingAck = true;
    $scope.acknowledgements = Acknowledgement.query({ limit: 20 }, function () {
      fetchingAck = false;
    });
    $scope.shipping = new Shipping();
    var ack;
    scanner.onscan = function (code) {
      var re = new RegExp(/^A\-(s+)?/);
      if (re.test(code)) {
        Notification.display('Retrieving Acknowledgement# ' + code.split('-')[1], false);
        Acknowledgement.get({ id: code.split('-')[1] }, function (response) {
          Notification.hide();
          var ack = response;
          $scope.shipping.acknowledgement = { id: ack.id };
          $scope.shipping.customer = ack.customer;
          $scope.shipping.products = ack.products;
          $scope.shipping.delivery_date = new Date(ack.delivery_date);
        }, function () {
          Notification.display('Unable to locate Acknowledgement#' + code.split('-')[1]);
        });
      }
    };
    $scope.addAcknowledgement = function (ack) {
      $scope.shipping.acknowledgement = { id: ack.id };
      $scope.shipping.customer = ack.customer;
      $scope.shipping.items = ack.items;
      $scope.shipping.delivery_date = new Date(ack.delivery_date);
      //Hide Customer Panel
      $scope.showAck = false;
    };
    $scope.$watch('query', function (q) {
      if (q) {
        Acknowledgement.query({
          limit: 5,
          q: q
        }, function (resources) {
          for (var i = 0; i < resources.length; i++) {
            if ($scope.acknowledgements.indexOfById(resources[i].id) == -1) {
              $scope.acknowledgements.push(resources[i]);
            }
          }
        });
      }
    });
    $scope.loadNext = function () {
      if (!fetchingAck) {
        fetchingAck = true;
        Acknowledgement.query({
          offset: $scope.acknowledgements.length,
          limit: 20
        }, function (resources) {
          for (var i = 0; i < resources.length; i++) {
            $scope.acknowledgements.push(resources[i]);
          }
          fetchingAck = false;
        });
      }
    };
    $scope.create = function () {
      if ($scope.isValidated()) {
        Notification.display('Creating Acknowledgement...', false);
        $scope.shipping.$save(function (resource) {
          Notification.display('Shipping manifest created');
          if (resource.pdf.url) {
            window.open(resource.pdf.url);
          }
          $location.path('/order/shipping');
        }, function () {
          Notification.display('There was an error in creating the shipping manifest', false);
        });
      } else {
        Notification.display('The Order is Not Complete');
      }
    };
    $scope.removeProduct = function (index) {
      $scope.shipping.items.splice(index, 1);
    };
    //Validations
    $scope.isValidated = function () {
      /*
         * The following are test to see if
         * The property has already been added
         */
      if (!$scope.shipping.acknowledgement) {
        return false;
      }
      if (!$scope.shipping.delivery_date) {
        return false;
      }
      //Return true for form validated
      return true;
    };
    $scope.$on('$destroy', function () {
      scanner.onscan = null;
    });
  }
]);
/*
 * All shipped orders view
 */
angular.module('employeeApp').controller('OrderShippingViewCtrl', [
  '$scope',
  'Shipping',
  '$filter',
  'Notification',
  function ($scope, Shipping, $filter, Notification) {
    /*
	 * Vars and flags
	 */
    var fetching = true;
    Notification.display('Loading shipping manifests...', false);
    /*
	 * Get an array of shipping manifests from the server
	 */
    $scope.shippingList = Shipping.query(function (resources) {
      fetching = false;
      Notification.hide();
    });
    /*
	 * Search the server 
	 * 
	 * The controller will send a GET request to the server
	 * with the query string whenever the "$scope.query" changes
	 * and when it is not undefined
	 */
    $scope.$watch('query', function (q) {
      if (q) {
        Shipping.query({
          limit: 5,
          q: q
        }, function (resources) {
          for (var i = 0; i < resources.length; i++) {
            if ($scope.shippingList.indexOfById(resources[i].id) == -1) {
              $scope.shippingList.push(resources[i]);
            }
          }
        });
      }
    });
    /*
	 * Load more shipping manifests
	 * 
	 * The function will request more manifests based on the current number 
	 * and the offset. The number of new manifests is limited to 20, which can be 
	 * changed via the parameters. This is intended to be used in conjuction with 
	 * the "on-scroll-end" directive
	 */
    $scope.loadNext = function () {
      if (!fetching) {
        Notification.display('Loading more shipping manifests...', false);
        Shipping.query({
          offset: $scope.shippingList.length,
          limit: 20
        }, function (resources) {
          Notification.hide();
          for (var i = 0; i < resources.length; i++) {
            $scope.shippingList.push(resources[i]);
          }
        });
      }
    };
  }
]);
angular.module('employeeApp').controller('OrderShippingTodayCtrl', [
  '$scope',
  'Acknowledgement',
  function ($scope, Acknowledgement) {
    $scope.startDate = new Date();
    $scope.startDate.setHours(0, 0, 0);
    $scope.endDate = new Date();
    $scope.endDate.setHours(0, 0, 0);
    $scope.endDate.setDate($scope.endDate.getDate() + 1);
    $scope.ackList = Acknowledgement.query({
      start_date: $scope.startDate.toISOString(),
      end_date: $scope.endDate.toISOString()
    });
  }
]);
angular.module('employeeApp').controller('OrderShippingWeekCtrl', [
  '$scope',
  'Acknowledgement',
  function ($scope, Acknowledgement) {
    $scope.startDate = new Date();
    $scope.endDate = new Date();
    $scope.endDate.setDate($scope.endDate.getDate() + 7);
    $scope.ackList = Acknowledgement.query({
      start_date: $scope.startDate.toISOString(),
      end_date: $scope.endDate.toISOString()
    });
  }
]);
angular.module('employeeApp.services').factory('Shipping', [
  '$resource',
  function ($resource) {
    return $resource('/api/v1/shipping/:id', { id: '@id' }, {
      update: { method: 'PUT' },
      create: { method: 'POST' }
    });
  }
]);
angular.module('employeeApp').controller('AdministratorGroupAddCtrl', [
  '$scope',
  'Group',
  'Permission',
  '$location',
  function ($scope, Group, Permission, $location) {
    $scope.permissions = Permission.query({ limit: 0 });
    $scope.group = new Group();
    $scope.group.permissions = [];
    /*
	 * Saves the group to the server
	 */
    $scope.save = function () {
      /*
		* Adds selected permissions to the permissions
		* allowed for this group
		* Runs through all the permissions, and checks the '$checked'
		* attribute. If it is positive then that permission is added
		* to the permissions for the gorup
		*/
      for (var i = 0; i < $scope.permissions; i++) {
        if ($scope.permissions[i].$checked) {
          $scope.group.permissions.push($scope.permissions[i]);
        }
      }
      //Post the data to the server
      $scope.group.$create(function () {
        //Return to list page after successful creation
        $location.path('/administrator/group');
      });
    };
  }
]);
angular.module('employeeApp').controller('AdministratorGroupViewCtrl', [
  '$scope',
  'Group',
  function ($scope, Group) {
    //Requests groups from the server
    $scope.groups = Group.query({ limit: 0 });
  }
]);
angular.module('employeeApp').controller('AdministratorGroupDetailsCtrl', [
  '$scope',
  'Group',
  'Permission',
  '$routeParams',
  '$location',
  function ($scope, Group, Permission, $routeParams, $location) {
    /*
     * Return the index of the first
     * occurence of the id in the list
     */
    function indexById(list, item) {
      if (!list.hasOwnProperty('length')) {
        throw new TypeError('Expecting an Array');
      }
      if (typeof item == 'object') {
        if (!item.hasOwnProperty('id')) {
          throw new TypeError('Expecting an id property for argument 2');
        }
      }
      //Set the id var
      var id = typeof item == 'object' ? item.id : item;
      for (var i in list) {
        if (list[i].id == id) {
          return i;
        }
      }
      return -1;
    }
    /*
     * Marks all items in list1 with $checked = true
     * property if it is in list 2
     */
    function merge(list1, list2) {
      for (var i in list1) {
        for (var h in list2) {
          if (list1[i].id == list2[h].id) {
            list1[i].$checked = true;
          }
        }
      }
    }
    /*
     * Calls for updated verions of the resources
     */
    $scope.permissionList = Permission.query({ limit: 0 }, function () {
      merge($scope.permissionList, $scope.group.permissions);
    });
    $scope.group = Group.get({ 'id': $routeParams.id }, function () {
      merge($scope.permissionList, $scope.group.permissions);
    });
    /*
     * Removes or adds a permission to the group
     * permissions based on whether or not 
     */
    $scope.updatePermission = function (permission) {
      if (permission.$checked) {
        if (indexById($scope.group.permissions, permission) == -1) {
          $scope.group.permissions.push(angular.copy(permission));
        }
      } else {
        var index = indexById($scope.group.permissions, permission);
        if (index > -1) {
          $scope.group.permissions.splice(index, 1);
        }
      }
      $scope.group.$update(function (response) {
      });
    };
    /*
     * Deletes the group
     */
    $scope.remove = function () {
      $scope.group.$delete(function () {
        $location.path('/groups');
      });
    };
    $scope.$on('$destroy', function () {
      $scope.group.$update();
    });
  }
]);
angular.module('employeeApp').controller('AdministratorUserDetailsCtrl', [
  '$scope',
  'Group',
  'User',
  '$routeParams',
  '$location',
  '$http',
  'Notification',
  function ($scope, Group, User, $routeParams, $location, $http, Notification) {
    var destroyed = false;
    function indexById(list, item) {
      if (!list.hasOwnProperty('length')) {
        throw new TypeError('Expecting an Array');
      }
      if (typeof item == 'object') {
        if (!item.hasOwnProperty('id')) {
          throw new TypeError('Expecting an id property for argument 2');
        }
      }
      //Set the id var
      var id = typeof item == 'object' ? item.id : item;
      for (var i in list) {
        if (list[i].id == id) {
          return i;
        }
      }
      return -1;
    }
    function merge(list1, list2) {
      for (var i in list1) {
        for (var h in list2) {
          if (list1[i].id == list2[h].id) {
            list1[i].$checked = true;
          }
        }
      }
    }
    $scope.groupList = Group.query({ limit: 0 }, function () {
      merge($scope.groupList, $scope.user.groups);
    });
    $scope.user = User.get({ 'id': $routeParams.id }, function () {
      merge($scope.groupList, $scope.user.groups);
    });
    /*
	 * Add Profile Image
	 * 
	 * Recieves the image data as an argument. The data is then applied 
	 * to the user and the user is saved
	 */
    $scope.addImage = function (imageData) {
      $scope.showAddImage = false;
      $scope.user.image = imageData.hasOwnProperty('data') ? imageData.data : imageData;
      $scope.user.$update();
    };
    $scope.changePassword = function () {
      var url = '/api/v1/user/' + $scope.user.id + '/change_password';
      $http.post(url, $scope.password).success(function (e) {
        Notification.display('Password successfully changed');
        $scope.password = {};
        $scope.showChangePassword = false;
      }).error(function (err) {
        console.error(err);
      });
    };
    $scope.updateGroup = function (group) {
      if (group.$checked) {
        if ($scope.user.groups.indexOfById(group.id) == -1) {
          $scope.user.groups.push(angular.copy(group));
        }
      } else {
        var index = $scope.user.groups.indexOfById(group.id);
        if (index != -1) {
          $scope.user.groups.splice(index, 1);
        }
      }
      //Save the model
      Notification.display('Updating ' + $scope.user.username + '...', false);
      $scope.user.$update(function (response) {
        Notification.display($scope.user.username + ' updated.');
      });
    };
    $scope.remove = function () {
      if ($scope.currentUser.hasPermission('delete_user')) {
        Notification.display('Deleting user ' + $scope.user.username + '...', false);
        $scope.user.$delete(function () {
          Notification.display($scope.user.username + ' deleted.');
          destroyed = true;
          $location.path('/administrator/user');
        });
      }
    };
    $scope.update = function () {
      $scope.user.$update();
    };
    $scope.$on('$destroy', function () {
      if (!destroyed) {
        $scope.user.$update();
      }
    });
  }
]);
angular.module('employeeApp').controller('AdministratorUserAddCtrl', [
  '$scope',
  'User',
  'Group',
  '$location',
  function ($scope, User, Group, $location) {
    $scope.user = new User();
    $scope.user.groups = [];
    $scope.groups = Group.query({ limit: 0 });
    /*
	 * Add Profile Image
	 * 
	 * Recieves the image data as an argument. The data is then applied 
	 * to the user and the user is saved
	 */
    $scope.addImage = function (imageData) {
      $scope.user.image = imageData.hasOwnProperty('data') ? imageData.data : imageData;
    };
    $scope.save = function () {
      //Validates the form
      if ($scope.form.$valid) {
        /*
			* Adds groups to the user
			* 
			* Runs through all the groups and checks if 
			* it hs been checked off. Groups that have been 
			* checked off are then added to the user groups
			*/
        for (var i = 0; i < $scope.groups.length; i++) {
          if ($scope.groups[i].$checked) {
            $scope.user.groups.push(angular.copy($scope.groups[i]));
          }
        }
        /*
			 * Saves the user by sending a POST request to the server
			 */
        $scope.user.$create(function () {
          $location.path('/administrator/user');
        });
      }
    };
  }
]);
angular.module('employeeApp').controller('AdministratorUserViewCtrl', [
  '$scope',
  'User',
  function ($scope, User) {
    //Request users from the server
    $scope.users = User.query({ limit: 0 });
  }
]);
angular.module('employeeApp.services').factory('Group', [
  '$resource',
  function ($resource) {
    return $resource('/api/v1/group/:id', { id: '@id' }, {
      update: { method: 'PUT' },
      create: { method: 'POST' }
    });
  }
]);
angular.module('employeeApp.services').factory('User', [
  '$resource',
  function ($resource) {
    return $resource('/api/v1/user/:id', { id: '@id' }, {
      update: { method: 'PUT' },
      create: { method: 'POST' }
    });
  }
]);
angular.module('employeeApp').controller('SupplyFabricViewCtrl', [
  '$scope',
  'Fabric',
  'Notification',
  function ($scope, Fabric, Notification) {
    var fetching = true;
    $scope.fabrics = Fabric.query(function () {
      fetching = false;
    });
    /*
     * Search the server
     * 
     * The controller will send a GET query to the server
     * with the query string as a paramter whenever the 
     * 'scope.query' changes. 
     * 
     * The results are then added to the '$scope.fabrics', if it 
     * is not already in the list, which is matched by the item id
     */
    $scope.$watch('query', function (q) {
      if (q) {
        Fabric.query({
          q: q,
          limit: 5
        }, function (resources) {
          for (var i = 0; i < resources.length; i++) {
            if ($scope.fabrics.indexOfById(resources[i].id) == -1) {
              $scope.fabrics.push(resources[i]);
            }
          }
        });
      }
    });
    /*
	* Load more fabrics
	* 
	* This function will load more fabrics based on the 
	* current number of fabrics in the list, which becomes the offset. 
	* 
	* Note: The fabrics are not checked for duplicaiton before being added
	* to the list
	*/
    $scope.loadNext = function () {
      if (!fetching) {
        fetching = true;
        Notification.display('Loading more fabrics...', false);
        Fabric.query({
          offset: $scope.fabrics.length,
          limit: 50
        }, function (resources) {
          fetching = false;
          Notification.hide();
          for (var i = 0; i < resources.length; i++) {
            if ($scope.fabrics.indexOfById(resources[i].id) == -1) {
              $scope.fabrics.push(resources[i]);
            }
          }
        });
      }
    };
  }
]);
angular.module('employeeApp').controller('SupplyFabricAddCtrl', [
  '$scope',
  'Supplier',
  'Fabric',
  '$location',
  'Notification',
  function ($scope, Supplier, Fabric, $location, Notification) {
    $scope.supplierList = Supplier.query();
    $scope.fabric = new Fabric();
    //Tooltips
    $scope.supplierText = 'Choose a Supplier for this Fabric';
    $scope.referenceText = 'Enter the Supplier\'s Reference Number';
    $scope.lengthText = 'Enter the Current Length of this Fabric in yards';
    $scope.widthText = 'Enter the Width in millimeters';
    $scope.patternText = 'Enter the Pattern of this Fabric';
    $scope.colorText = 'Enter the Color of this Fabric';
    $scope.cost = 'Enter the Cost per Yard of this Fabric';
    //Methods
    //Add Fabric
    $scope.save = function () {
      //Display saving message
      Notification.display('Saving Fabric...', false);
      //Checks the form is valid
      if ($scope.form.$valid) {
        //save to database
        $scope.fabric.$create(function () {
          Notification.display('Fabric Saved');
          $location.path('supply/fabric');
        });
      }
    };
    //Upload Image
    $scope.upload = function () {
      //Notify of uploading image
      Notification.display('Uploading Image...', false);
      var fd = new FormData();
      fd.append('image', $scope.images[0]);
      //clear the form
      $scope.addLength = null;
      $scope.addRemark = null;
      jQuery.ajax('fabric/image', {
        type: 'POST',
        data: fd,
        processData: false,
        contentType: false,
        success: function (responseData) {
          Notification.display('Image Updated');
          angular.copy(responseData, $scope.fabric);
          $scope.$apply();
        }
      });
    };
  }
]);
angular.module('employeeApp').controller('SupplyFabricDetailsCtrl', [
  '$scope',
  'Fabric',
  '$routeParams',
  '$location',
  'Notification',
  '$http',
  function ($scope, Fabric, $routeParams, $location, Notification, $http) {
    $scope.fabric = Fabric.get({ 'id': $routeParams.id });
    //Uploads Profie Image
    $scope.upload = function () {
      //display notification
      Notification.display('Uploading Image...', false);
      var fd = new FormData();
      fd.append('image', $scope.images[0]);
      //clear the form
      $scope.addLength = null;
      $scope.addRemark = null;
      jQuery.ajax('fabric/' + $scope.fabric.id + '/image', {
        type: 'POST',
        data: fd,
        processData: false,
        contentType: false,
        success: function (responseData) {
          //display success mesage
          Notification.display('Image Updated');
          $scope.fabric.image = {};
          angular.copy(responseData, $scope.fabric.image);
          $scope.fabric.$save();
          //Set new profile pic
          $scope.profileImageUrl = $scope.fabric.image.url;
          //Clear upload images and clear previews
          $scope.imagePreviews = null;
          $scope.images = null;
          $scope.$apply();
        }
      });
    };
    //Create fabric actions
    var DEFAULT_ACTIONS = [
        'reserve',
        'add',
        'subtract',
        'reset'
      ];
    function capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    $scope.add = function () {
      $scope.fabric.$add({ quantity: $scope.quantity }, function () {
      });
      $scope.showAdd = false;
      $scope.quantity = null;
    };
    $scope.subtract = function () {
      $scope.fabric.$subtract({ quantity: $scope.quantity }, function () {
      });
      $scope.showSubtract = false;
      $scope.quantity = null;
    };
    $scope.viewLog = function () {
      $http.get('fabric/' + $scope.fabric.id + '/log').success(function (data) {
        $scope.logs = [];
        angular.forEach(data, function (item) {
          $scope.logs.push(item);
        });
      });
    };
    $scope.remove = function () {
      //Notify
      Notification.display('Deleting Fabric...');
      //Ajax call to delete
      $scope.fabric.$delete(function () {
        //Notify
        Notification.display('Fabric Deleted');
        //Reroute to view page
        $location.path('/fabric');
      });
    };
    $scope.update = function () {
      Notification.display('Updating Fabric...', false);
      $scope.fabric.$update(Notification.display('Fabric Updated'));
    };
  }
]);
angular.module('employeeApp').controller('SupplyFoamDetailsCtrl', [
  '$scope',
  'Foam',
  '$routeParams',
  '$location',
  'Notification',
  function ($scope, Foam, $routeParams, $location, Notification) {
    //Poller.poll($scope, function(){
    $scope.foam = Foam.get({ 'id': $routeParams.id });
    //});
    //Uploads Profie Image
    $scope.upload = function () {
      //display notification
      Notification.display('Uploading Image...', false);
      var fd = new FormData();
      fd.append('image', $scope.images[0]);
      //clear the form
      $scope.addLength = null;
      $scope.addRemark = null;
      jQuery.ajax('supply/' + $scope.foam.id + '/image', {
        type: 'POST',
        data: fd,
        processData: false,
        contentType: false,
        success: function (responseData) {
          //display success mesage
          Notification.display('Image Updated');
          $scope.foam.image = {};
          angular.copy(responseData, $scope.foam.image);
          $scope.foam.$save();
          //Set new profile pic
          $scope.profileImageUrl = $scope.foam.image.url;
          //Clear upload images and clear previews
          $scope.imagePreviews = null;
          $scope.images = null;
          $scope.$apply();
        }
      });
    };
    $scope.remove = function () {
      $scope.foam.$delete(function () {
        $location.path('/foam');
      });
      $scope.foamList = Foam.query();
    };
    $scope.update = function () {
      Notification.display('Updating Foam...', false);
      $scope.foam.$save(function () {
        Notification.display('Foam Updated');
      });
    };
  }
]);
angular.module('employeeApp').controller('SupplyFoamAddCtrl', [
  '$scope',
  'Foam',
  'Supplier',
  '$location',
  'Notificaiton',
  function ($scope, Foam, Supplier, $location, Notification) {
    $scope.supplierList = Supplier.query();
    $scope.foam = new Foam();
    //Methods
    //Add Lumber
    $scope.save = function () {
      $scope.foam.$save(function () {
        $location.path('/foam');
      });
    };
    //Upload Image
    $scope.upload = function () {
      //Notify of uploading image
      Notification.display('Uploading Image...', false);
      var fd = new FormData();
      fd.append('image', $scope.images[0]);
      //clear the form
      $scope.addLength = null;
      $scope.addRemark = null;
      jQuery.ajax('supply/image', {
        type: 'POST',
        data: fd,
        processData: false,
        contentType: false,
        success: function (responseData) {
          Notification.display('Image Updated');
          $scope.foam.image = $scope.foam.image || {};
          angular.copy(responseData, $scope.foam.image);
          $scope.$apply();
        }
      });
    };
  }
]);
angular.module('employeeApp').controller('SupplyFoamViewCtrl', [
  '$scope',
  'Foam',
  function ($scope, Foam) {
    $scope.foamList = Foam.query();
  }
]);
angular.module('employeeApp.services').factory('Foam', [
  'eaResource',
  function (eaResource) {
    return eaResource('foam/:id', { id: '@id' });
  }
]);
angular.module('employeeApp').controller('AccountingTransactionViewCtrl', [
  '$scope',
  'Transaction',
  function ($scope, Transaction) {
    $scope.transactionList = Transaction.poll().query();
    $scope.$on('$destroy', function () {
      Transaction.stopPolling();
    });
  }
]);
angular.module('employeeApp').controller('AccountingTransactionAddCtrl', [
  '$scope',
  'Transaction',
  'Notification',
  '$location',
  'Contact',
  function ($scope, Transaction, Notification, $location, Contact) {
    $scope.transaction = new Transaction();
    $scope.contactList = Contact.query();
    $scope.save = function () {
      Notification.display('Saving Transaction...', false);
      $scope.transaction.$save(function () {
        Notification.display('Transaction Saved');
        $location.path('/accounting/transaction');
      });
    };
  }
]);
angular.module('employeeApp').controller('AccountingTransactionDetailsCtrl', [
  '$scope',
  function ($scope) {
  }
]);
angular.module('employeeApp.services').factory('Transaction', [
  'eaResource',
  function (eaResource) {
    return eaResource('transaction/:id', { id: '@id' });
  }
]);
/*
 * Local Storage Service
 * 
 * This Service will keep an active collection that can be 
 * queried via id. The collection will also act as an interface 
 * with the localStorage of the browser. The storage of items
 * in the collection will be entirely based on the id of the.
 * The main function will be a factory that returns a collection
 * for a specified namespace. 
 * 
 * Capabilities:
 * 
 * -main collection for a namespace
 * -Maintain active collection
 * -Get an object from the collection
 * -Save an object to the collection
 *   -check for duplicate id. If found
 *    then updates instead of create a new one
 * -get all objects from the collection
 * -delete an object from the collection
 * -keep collection in sync with localStorage
 * 
 * Public Methods
 * 
 * -query(arg)
 * -save()
 * -get(arg)
 * -remove(arg)
 * 
 * Private Methods
 * 
 * -saveToStorage()
 * -loadFromStorage()
 * 
 */
angular.module('employeeApp.services').factory('eaStorage', [function () {
    //Factory Function 
    function factory(namespace) {
      //compare 2 items and see if the first items
      //has the same keys and values of second item
      function compare(item, arg) {
        var aKey;
        for (aKey in arg) {
          if (item.hasOwnProperty(aKey)) {
            if (item[aKey] !== arg[aKey]) {
              return false;
            }
          } else {
            return false;
          }
        }
        return true;
      }
      function parseDate(obj) {
        if (obj.hasOwnProperty('delivery_date')) {
          obj.delivery_date = new Date(obj.delivery_date);
        }
        if (obj.hasOwnProperty('time_created')) {
          obj.time_created = new Date(obj.time_created);
        }
        if (obj.hasOwnProperty('last_login')) {
          obj.last_login = new Date(obj.last_login);
        }
        return obj;
      }
      //Storage initialization
      function storage(namespace) {
        this.namespace = namespace;
        this.collection = this.__loadFromStorage__(this.namespace) || {};
      }
      /*
		 * Properties
		*/
      /*Disabled*/
      //Get Length of collection
      storage.__defineGetter__('length', function () {
        return 'ok';  //Object.keys(this.collection).length; 
      });
      /*
		* Private functions
		*/
      /*
		* Save function
		* 
		* Saves an object with an id property
		* to the collection
		*/
      storage.prototype.__save__ = function (obj) {
        //Checks if the obj has an id
        if (obj.hasOwnProperty('id')) {
          this.collection[obj.id] = obj;
        } else {
        }
      };
      /*
		* Save to Local Storage
		* 
		* Stringifies the item and then saves it to 
		* the local storage as a string. The key is the first
		* variable while the data is the second variable
		*/
      storage.prototype.__saveToStorage__ = function (key, data) {
        window.localStorage.setItem(key, JSON.stringify(data));
      };
      /*
		* Load from Local Storage
		* 
		* The function will retrieve an item from the local storage. 
		* The data is then parsed by the JSON module before being
		* returned.
		*/
      storage.prototype.__loadFromStorage__ = function (key) {
        return JSON.parse(window.localStorage.getItem(key));
      };
      /*
		* Public Methods
		*/
      /*
		* Query items form the collection
		* 
		* The argument must be in the form of an
		* object where the keys will be used to compare
		* with keys of objects in the collection
		* and the value compared with the objects' values
		*/
      storage.prototype.query = function (arg) {
        if (typeof arg === 'object') {
          var data = [], key;
          for (key in this.collection) {
            if (compare(this.collection[key], arg)) {
              this.collection[key] = parseDate(this.collection[key]);
              data.push(this.collection[key]);
            }
          }
          //Return the data set
          return data;
        } else {
          throw new TypeError('Arguments must be in the form of a key:value object');
        }
      };
      /*
		* Save Function 
		* 
		* This function will save either and object
		* or an array of objects. Both are saved via
		* a save function
		* 
		* The save inner function checks if the object 
		* or the object in the array has an id property
		* and throws an error if it does not.
		* 
		* After all saves, the entire collection is saved
		* to the local storage
		*/
      storage.prototype.save = function (obj) {
        var i;
        if (Object.prototype.toString.call(obj) === '[object Array]') {
          for (i in obj) {
            this.__save__(obj[i]);
          }
        } else {
          this.__save__(obj);
        }
        this.__saveToStorage__(this.namespace, this.collection);
      };
      //Get an obj by id
      storage.prototype.get = function (id) {
        return this.collection[id] ? parseDate(this.collection[id]) : null;
      };
      //Iterate through all the items in the collecion
      storage.prototype.iterate = function (callback) {
        var key;
        //Loop through all keys
        for (key in this.collection) {
          //check the it is a direct property
          if (this.collection.hasOwnProperty(key)) {
            //call back fn with item as argument
            callback(parseDate(this.collection[key]));
          }
        }
      };
      //Delete an object by id
      storage.prototype.remove = function (arg) {
        //Establish id or extract it
        var id = typeof arg === 'object' ? arg.hasOwnProperty('id') ? arg.id : null : arg;
        if (this.collection.hasOwnProperty(id)) {
          delete this.collection[id];
          this.__saveToStorage__(this.namespace, this.collection);
        }
      };
      //Returns the namespace based storage
      return new storage(namespace);
    }
    //Return Factory Function 
    return factory;
  }]);
/*
 * Resource Service
 * 
 * The purpose of this service is too provide
 * a wrapper for the native $resource service
 * provided by AngularJS. This resource allows us 
 * to interface with the storage service and prepopulat
 * the response before updating with the response 
 * from the server.
 * 
 * The service must all be able to poll and used the 
 * 'last-modified' key to retrieve the most recent version
 * of data
 * 
 * Capabilities:
 * 
 * -Perform basic GET, PUT, POST and DELETE operations
 * -prepopulate the response with data from the storage
 *  service
 * 
 * Structure and Cycle:
 * 
 * The intended structure and cycle of the resource is
 * 1. A GET request is made to retrieve an item or an
 *    array of items
 *    -If there is already prexisting data then retrieve
 *     the data from the storage and respond
 *    -When the server responsds update the returned data
 *     by finding the id and then updating the item
 * 2. Save the last-checked time to be used later for polling
 * 3. Returns a new Resource that prototypically inherits from
 *    the parent. 
 * 4. Save the resource should call the underlying request from 
 *    the parent. 
 * 
 * Properties:
 * 
 * -$$poll: If true begin a timeout based
 *      repeated calling of the initial function
 * -$$last_checked: Date and Time of the last GET
 *      request made to the server that was successful
 * -$$timeout: Hold the reference to the current timeout
 * 
 * Public Methods:
 * 
 * Parent Methods:
 * -poll()
 * -get()
 * -query()
 * -save()
 * -delete()
 * 
 * Child Methods:
 * -$save()
 * -$delete()
 * -$get()
 * -$query()
 */
angular.module('employeeApp.services').factory('eaResource', [
  'eaStorage',
  '$rootScope',
  '$http',
  '$q',
  '$parse',
  '$resource',
  '$timeout',
  'eaIndexedDB',
  'Notification',
  function (eaStorage, $rootScope, $http, $q, $parse, $resource, $timeout, eaIndexedDB, Notification) {
    function ResourceFactory(url, paramDefaults, actions) {
      //Default methods available to the public
      var DEFAULT_ACTIONS = {
          'get': { method: 'GET' },
          'save': { method: 'POST' },
          'update': { method: 'PUT' },
          'query': {
            method: 'GET',
            isArray: true
          },
          'remove': { method: 'DELETE' },
          'delete': { method: 'DELETE' }
        }, oResource = new $resource(url, paramDefaults, actions),
        //jshint ignore:line
        storage = eaStorage(url.split(/\//g)[0]), db = eaIndexedDB(url), value, previousAction, previousParams, last_checked = true, poll = true, getter = function (obj, path) {
          return $parse(path)(obj);
        };
      /*Helper Functions*/
      function extractParams(data, actionParams) {
        var ids = {};
        actionParams = angular.extend({}, paramDefaults, actionParams);
        angular.forEach(actionParams, function (value, key) {
          if (angular.isFunction(value)) {
            value = value();
          }
          ids[key] = value.charAt && value.charAt(0) == '@' ? getter(data, value.substr(1)) : value;
        });
        return ids;
      }
      /*
         * Locates the index of an object
         * which matches the supplied id
         */
      function indexOfId(array, id) {
        for (var i = 0; i < array.length; i++) {
          if (array[i].hasOwnProperty('id')) {
            if (array[i].id == id) {
              return i;
            }
          }
        }
        return -1;
      }
      //Extend all actions to include default and argument actions
      actions = angular.extend({}, DEFAULT_ACTIONS, actions);
      /*
         * Initialize the Resource the properties
         */
      function Resource(value) {
        angular.extend(this, value || {});
        this.$$poll = false;
        this.$$last_checked = null;
        this.$$timeout = null;
        this.$$date = true;
      }
      /*
         * Set Date for when doing mock tests
         */
      Resource.disableLastChecked = function () {
        last_checked = false;
      };
      Resource.prototype.disableLastChecked = Resource.disableLastChecked;
      /*
         * Create a polling function. When the polling function 
         * is call the poll value will be set to true
         */
      Resource.poll = function () {
        this.$$poll = true;
        poll = true;
        return this;
      };
      Resource.prototype.poll = Resource.poll;
      Resource.stopPolling = function () {
        this.$$poll = false;
        poll = false;
        return this;
      };
      Resource.prototype.poll = Resource.poll;
      /*
         * Loop through all the actions and assign them 
         * as methods to the Resource and process the data
         * and the params for each method
         */
      angular.forEach(actions, function (action, name) {
        var hasBody = action.method == 'POST' || action.method == 'PUT' || action.method == 'PATCH';
        //Default methods
        Resource[name] = function (a1, a2, a3, a4) {
          var params = {};
          var data;
          var success = angular.noop;
          var error = null;
          var promise;
          /* jshint ignore: start */
          switch (arguments.length) {
          case 4:
            error = a4;
            success = a3;
          //fallthrough
          case 3:
          case 2:
            if (angular.isFunction(a2)) {
              if (angular.isFunction(a1)) {
                success = a1;
                error = a2;
                break;
              }
              success = a2;
              error = a3;  //fallthrough
            } else {
              params = a1;
              data = a2;
              success = a3;
              break;
            }
          case 1:
            if (angular.isFunction(a1))
              success = a1;
            else if (hasBody)
              data = a1;
            else
              params = a1;
            break;
          case 0:
            break;
          default:
            throw 'Expected between 0-4 arguments [params, data, success, error], got ' + arguments.length + ' arguments.';
          }
          /* jshint ignore: end */
          /*
                 * RESETTING AREA:
                 * 
                 * This area will reset the settings of the call if the previous 
                 * action does not meet the current action. We do this in the case 
                 * of polling where the action is the same as before.
                 */
          if (previousAction != name || params != previousParams) {
            this.$$last_checked = undefined;
          }
          /*
                 * CRTICIAL COMPONENT:
                 * 
                 * This part will determine whether to set the return referenced as an 
                 * array, object, or to keep it in its current state. This is crucial 
                 * for when polling is activated. 
                 */
          if (action.isArray) {
            value = angular.isArray(value) ? value || [] : [];
          } else {
            value = angular.isObject(value) && !value.hasOwnProperty('length') ? value || {} : {};
            value = this instanceof Resource ? this : new Resource(value);
          }
          /*
                 * Preloads Data from the indexedDB
                 * 
                 * We first must check if this is a request for data. 
                 * After we check if the db is ready. Depending on whether 
                 * it is ready or not we proceed in two different ways:
                 * 
                 * -db is ready:
                 *     -check if to make query or get call
                 * -db is not ready:
                 *     -attach an on ready call and make the 
                 *      appropriate get or query call
                 */
          if (action.method == 'GET' && !this.$$last_checked) {
            if (db.ready) {
              if (action.isArray) {
                db.query(function (data) {
                  var fn = function () {
                    for (var key in data) {
                      //Loop for existing item in value
                      var index = indexOfId(value, data[key].id);
                      if (index != -1) {
                        angular.copy(data[key], value[index]);
                      } else {
                        try {
                          value.push(new Resource(data[key]));
                        } catch (e) {
                          console.warn(e.stack);
                        }
                      }
                    }
                    (success || angular.noop)(value);
                  };
                  if ($rootScope.$$phase == '$apply' || $rootScope.$$phase == '$digest') {
                    fn();
                  } else {
                    $rootScope.$apply(function () {
                      fn();
                    });
                  }
                });
              } else {
                db.get(params.id, function (response) {
                  var fn = function () {
                    angular.copy(new Resource(response), value);
                    (success || angular.noop)(value);
                  };
                  if ($rootScope.$$phase == '$digest' || $rootScope.$$phase == '$apply') {
                    fn();
                  } else {
                    $rootScope.$apply(function () {
                      fn();
                    });
                  }
                });
              }
            } else {
              if (action.isArray) {
                db.onready = function () {
                  db.query(function (data) {
                    var fn = function () {
                      for (var key in data) {
                        //Loop for existing item in value
                        var index = indexOfId(value, data[key].id);
                        if (index != -1) {
                          angular.copy(data[key], value[index]);
                        } else {
                          try {
                            value.push(new Resource(data[key]));
                          } catch (e) {
                            console.warn(e.stack);
                          }
                        }
                      }
                      (success || angular.noop)(value);
                    };
                    if ($rootScope.$$phase == '$digest' || $rootScope.$$phase == '$apply') {
                      fn();
                    } else {
                      $rootScope.$apply(function () {
                        fn();
                      });
                    }
                  });
                };
              } else {
                db.onready = function () {
                  db.get(params.id, function (response) {
                    var fn = function () {
                      angular.copy(new Resource(response), value);
                      (success || angular.noop)(value);
                    };
                    if ($rootScope.$$phase == '$digest' || $rootScope.$$phase == '$apply') {
                      fn();
                    } else {
                      $rootScope.$apply(function () {
                        fn();
                      });
                    }
                  });
                };
              }
            }
          }
          /*
                 * Determines whether to include the last modified parameter depending
                 * on whether the 'last_checked' var has a value or not
                 */
          //dump((this.$$last_checked && typeof(this.$$last_checked) != "boolean") && action.method == "GET")
          if (this.$$last_checked !== undefined && action.method == 'GET') {
            angular.extend(params, { last_modified: this.$$last_checked.toISOString() });
          }
          /*
                if(storage.getLastModified() && action.method == "GET"){
                    angular.extend(params, {last_modified:storage.getLastModified().toISOString()});
                }
                */
          var oPromise = oResource[name](params, data, function (response) {
              /*
                     * If the hasBody is positive, it indicates this is a child
                     * resource and there for the resource it self should be update
                     * with the data because it is currently presented tot he user
                     */
              if (action.method == 'DELETE' || hasBody) {
                angular.extend(this, response);
              }
              /*
                     * If the method is GET it indicates that the user has requested 
                     * data and the resource is a gateway and it itself is no the the
                     * data holder. There for the reference that is returned to the user 
                     * should be update with either the array of items or the item data
                     * respecitvely.
                     */
              if (action.method === 'GET') {
                if (action.isArray || angular.isArray(response)) {
                  var index;
                  /*
                             * We use vanilla javascript to iterate through 
                             * the array and apply changes to that the 
                             * digest is not trigger initially. We wait till
                             * the end to trigger the digest
                             */
                  for (var i in response) {
                    //Find the index of the matched item by id
                    index = indexOfId(value, response[i].id);
                    if (index > -1) {
                      /*
                                    * In order not to waste resource we
                                    * first check if the two items are equal or not.
                                    * If they are not equal then we perform an extend
                                    */
                      if (!angular.equals(value[index], response[i])) {
                        angular.extend(value[index], new Resource(response[i]));
                        if (value[index].deleted) {
                          value.splice(index, 1);
                          var item = [];
                          item.splice(index);
                        }
                      }
                    } else {
                      //Add the new item
                      if (!response[i].deleted) {
                        try {
                          value.push(new Resource(response[i]));
                        } catch (e) {
                          console.warn(e.stack);
                        }
                      }
                    }
                  }
                } else {
                  //Upate the reference with the data
                  if (response.deleted) {
                    angular.copy({}, value);
                    Notification.display('This resource no longer exists.');
                  } else {
                    angular.extend(value, new Resource(response));
                  }
                }
              }
              /*
                     * Determines whether the action is to delete from the server
                     * or to post and get data. Because post and get data would 
                     * both return responses we would save this to the storage. 
                     * For delete requests, we would have to delete the item
                     */
              if (db.ready) {
                action.method == 'DELETE' ? db.remove(params) : hasBody ? db.save(this) : db.save(value);  // jshint ignore:line
              }
              //action.method == "DELETE" ? storage.remove(params) : hasBody ? storage.save(this) : storage.save(value);  
              /*
                     * Last checked
                     */
              if (last_checked) {
                this.$$last_checked = new Date();
              }
              /*
                     * The Resource will check if to poll the server only if
                     * the action method is a GET and the $$poll swtich is turned
                     * on. 
                     * 
                     * The request itself is incapsulated in an anonymous function
                     * so that we can pass arguments and bind 'this'
                     */
              if (this.$$poll && action.method == 'GET') {
                //Call timeout
                this.$$timeout = $timeout(function () {
                  //Create binded fn
                  var request = Resource[name].bind(this);
                  //call binded fn
                  request(params, data, success, error);
                }.bind(this), 30000);
              }
              //Run success call back
              success(response);
            }.bind(this), function (e) {
            });
          //return placeholder
          /*
                 * We set what action just took place
                 * so that we may know if to change
                 * the settings of the current action
                 */
          previousAction = name;
          previousParams = params;
          //Return the reference
          return value;
        };
        //Prototypical methods
        Resource.prototype['$' + name] = function (a1, a2, a3) {
          var params = extractParams(this), success = angular.noop, error;
          switch (arguments.length) {
          case 3:
            params = a1;
            success = a2;
            error = a3;
            break;
          case 2:
          case 1:
            if (angular.isFunction(a1)) {
              success = a1;
              error = a2;
            } else {
              params = a1;
              success = a2 || angular.noop;
            }
            break;
          case 0:
            break;
          default:
            throw 'Expected between 1-3 arguments [params, success, error], got ' + arguments.length + ' arguments.';
          }
          var data = hasBody ? this : undefined;
          Resource[name].call(this, params, data, success, error);
        };
      });
      return Resource;
    }
    return ResourceFactory;
  }
]);
angular.module('employeeApp.services').factory('scanner', [
  '$location',
  '$rootScope',
  function ($location, $rootScope) {
    var code = '', codes = '', standardCodes = [
        [
          /^PO-\d+$/,
          '/order/purchase_order/'
        ],
        [
          /^A-\d+$/,
          '/order/acknowledgement/'
        ],
        [
          /^AI-\d+$/,
          '/order/acknowledgement/item/'
        ],
        [
          /^S-\d+$/,
          '/order/shipping/'
        ]
      ], customCodes = [], parseStandardCodes = true;
    var check = function (evt) {
      this._check(evt);
    };
    function Scanner(identity) {
      this._identity = identity;
      this._activeParse = false;
      this.enabled = false;
      this._onscan = null;
      this.f = check.bind(this);
      Object.defineProperties(this, {
        _code: {
          get: function () {
            return code;
          }
        }
      });
    }
    Scanner.prototype._check = function (evt, customFn) {
      /*
		 * Checks if the character is the start code for the 
		 * scanner. If it is the start code, then turn on the parse
		 * switch to get the successive characters
		 */
      if (evt.keyCode === 76 && evt.altKey) {
        evt.preventDefault();
        this._activeParse = true;  /*
		 * Checks if the character is the end code for the scanner.
		 * If it is, then turn off the parse switch, send the code to dispatch,
		 * and reset the code variable
		 */
      } else if (evt.altKey && evt.keyCode == 71) {
        evt.preventDefault();
        this._activeParse = false;
        this._dispatch(code);
        code = '';  /*
		 * If the parse switch is on, add the keypressed character to the code string
		 */
      } else {
        if (this._activeParse) {
          evt.preventDefault();
          this._parse(evt);
        }
      }
    };
    Scanner.prototype._parse = function (evt) {
      var key = evt.keyCode;
      if (96 <= key && key <= 105 || 48 <= key && key <= 90) {
        var letter = String.fromCharCode(96 <= key && key <= 105 ? key - 48 : key);
        code += letter;
      } else if (key === 189) {
        code += '-';
      }
    };
    Scanner.prototype._dispatch = function (code) {
      //console.debug(this._identity+' status: '+this.enabled+' / code: '+this._code);
      codes = code.split('-');
      if (parseStandardCodes) {
        for (var i = 0; i < standardCodes.length; i++) {
          if (standardCodes[i][0].test(code)) {
            codes = code.split('-');
            /* jshint ignore:start */
            $rootScope.safeApply(function () {
              $location.path(standardCodes[i][1] + codes[1]);
            });  /* jshint ignore:end */
          }
        }
      }
      for (var h = 0; h < customCodes.length; h++) {
        if (customCodes[h][0].test(code)) {
          customCodes[h][1](code);
        }
      }
    };
    /*
     * Public API
     * 
     * -enable
     * -disable
     * -onscan
     */
    Object.defineProperties(Scanner.prototype, {
      standardEnabled: {
        get: function () {
          return parseStandardCodes;
        }
      }
    });
    Scanner.prototype.enable = function () {
      angular.element(document.body).on('keydown', this.f);
      this.enabled = true;
    };
    Scanner.prototype.disable = function () {
      angular.element(document.body).off('keydown', this.f);
      this.enabled = false;
    };
    Scanner.prototype.disableStandard = function () {
      parseStandardCodes = false;
    };
    Scanner.prototype.enableStandard = function () {
      parseStandardCodes = true;
    };
    Scanner.prototype.register = function (re, fn) {
      customCodes.push([
        re,
        fn
      ]);
    };
    Scanner.deregister = function (re) {
      for (var i = 0; i < customCodes.length; i++) {
        if (customCodes[i][0] == re) {
          customCodes.splice(i);
        }
      }
    };
    Scanner.prototype.destroy = function () {
      this.disable();
    };
    Object.defineProperty(Scanner.prototype, 'onscan', {
      set: function (fn) {
        this._onscan = fn;
      }
    });
    function ScannerFactory(identity) {
      return new Scanner(identity);
    }
    return ScannerFactory;
  }
]);
angular.module('employeeApp').controller('OrderAcknowledgementDetailsCtrl', [
  '$scope',
  'Acknowledgement',
  '$routeParams',
  'Notification',
  '$http',
  function ($scope, Acknowledgement, $routeParams, Notification, $http) {
    //Show system notification
    Notification.display('Loading Acknowledgement...', false);
    //Set Vars
    $scope.showCal = false;
    //GET request server for Acknowledgements
    $scope.acknowledgement = Acknowledgement.get({
      'id': $routeParams.id,
      'pdf': true
    }, function () {
      Notification.display('Acknowledgement Loaded');
    });
    //Grid Options
    $scope.gridOptions = {
      data: 'acknowledgement.products',
      columnDefs: [{
          field: 'image',
          displayName: 'Image'
        }]
    };
    //Request pdf for acknowledgements from server
    $scope.getPDF = function (type) {
      try {
        var address = $scope.acknowledgement.pdf[type.toLowerCase()];
        window.open(address);
      } catch (e) {
        var message = 'Missing ' + type + ' pdf for Acknowledgement #' + $scope.acknowledgement.id;
        Notification.display(message);
        throw new Error(message);
      }
    };
    //Request log data for acknowledgement
    $scope.viewLog = function () {
      $http.get('acknowledgement/' + $scope.acknowledgement.id + '/log').success(function (data) {
        angular.forEach(data, function (log) {
          $scope.logs = $scope.logs || [];
          $scope.logs.push(log);
          $scope.showLog = true;
        });
      });
    };
    //Save updates to the server
    $scope.save = function () {
      Notification.display('Saving Acknowledgement...', false);
      $scope.acknowledgement.$update(function (response) {
        Notification.display('Acknowledgement ' + $scope.acknowledgement.id + ' saved.');
      }, function () {
        Notification.display('Failed to save acknowledgement ' + $scope.acknowledgement.id, false);
      });
    };
  }
]);
angular.module('employeeApp').directive('scanner', [
  '$location',
  '$rootScope',
  function ($location, $rootScope) {
    var code = '';
    function dispatch(code) {
      var codes = code.split('-');
      if (codes.length > 1) {
        switch (codes[0]) {
        case 'A':
          $rootScope.$apply(function () {
            $location.path('/order/acknowledgement/' + codes[1]);
          });
          break;
        case 'S':
          $rootScope.$apply(function () {
            $location.path('/order/shipping/' + codes[1]);
          });
          break;
        default:
          break;
        }
      }
    }
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        element.keyup(function (e) {
          var key = e.keyCode;
          if (96 <= key && key <= 105 || 48 <= key && key <= 90) {
            var letter = String.fromCharCode(96 <= key && key <= 105 ? key - 48 : key);
            code += letter;
          } else {
            switch (key) {
            case 13:
              dispatch(code);
              code = '';
              break;
            case 189:
              code += '-';
              break;
            default:
              break;
            }
          }
        });
      }
    };
  }
]);
angular.module('employeeApp.services').factory('dateParser', [
  '$q',
  function ($q) {
    function formatter(obj) {
      if (obj.hasOwnProperty('delivery_date')) {
        obj.delivery_date = new Date(obj.delivery_date);
      }
      if (obj.hasOwnProperty('time_created')) {
        obj.time_created = new Date(obj.time_created);
      }
      if (obj.hasOwnProperty('last_login')) {
        obj.last_login = new Date(obj.last_login);
      }
      return obj;
    }
    return {
      'response': function (response) {
        try {
          var data = response.data;
          if (angular.isArray(data)) {
            for (var i = 0; i < data.length; i++) {
              try {
                data[i] = formatter(data[i]);
              } catch (e) {
              }
            }
          } else if (angular.isObject(data)) {
            data = formatter(data);
          }
          response.data = data;
        } catch (e) {
          console.error(e);
        }
        return response || $q.when(response);
      },
      'responseError': function (rejection) {
        return $q.reject(rejection);
      }
    };
  }
]).config(function ($httpProvider) {
  $httpProvider.interceptors.push('dateParser');
});
angular.module('employeeApp.services').factory('Permission', [
  '$resource',
  function ($resource) {
    return $resource('/api/v1/permission/:id', { id: '@id' }, {
      update: { method: 'PUT' },
      create: { method: 'POST' }
    });
  }
]);
angular.module('employeeApp').controller('OrderAcknowledgementWeeklyCtrl', [
  '$scope',
  'Acknowledgement',
  function ($scope, Acknowledgement) {
    $scope.startDate = new Date();
    $scope.endDate = new Date();
    $scope.endDate.setDate($scope.endDate.getDate() + 7);
    $scope.ackList = Acknowledgement.query({
      start_date: $scope.startDate.toISOString(),
      end_date: $scope.endDate.toISOString()
    });
  }
]);
angular.module('employeeApp').controller('OrderAcknowledgementDailyCtrl', [
  '$scope',
  'Acknowledgement',
  function ($scope, Acknowledgement) {
    $scope.today = new Date();
    $scope.ackList = Acknowledgement.query({ date: $scope.today.toISOString() });
  }
]);
angular.module('employeeApp').controller('OrderShippingDetailsCtrl', [
  '$scope',
  'Shipping',
  '$routeParams',
  'Notification',
  '$http',
  function ($scope, Shipping, $routeParams, Notification, $http) {
    Notification.display('Loading Shipping Manifest...', false);
    $scope.showCal = false;
    $scope.shipping = Shipping.get({
      'id': $routeParams.id,
      pdf: true
    }, function () {
      Notification.display('Shipping Manifest Loaded');
    });
    $scope.updateDeliveryDate = function () {
      $scope.showCal = false;
    };
    $scope.getPDF = function () {
      Notification.display('Retrieving PDF...', false);
      if ($scope.shipping.pdf.url) {
        window.open($scope.shipping.pdf.url);
      }
    };
    $scope.save = function () {
      Notification.display('Saving Shipping Manifest...', false);
      $scope.shipping.$update(function () {
        Notification.display('Shipping Manifest ' + $scope.shipping.id + ' Saved');
      });
    };
  }
]);
/**
 * The following features are still outstanding: popup delay, animation as a
 * function, placement as a function, inside, support for more triggers than
 * just mouse enter/leave, html tooltips, and selector delegatation.
 */
angular.module('employeeApp.directives').directive('tooltipPopup', function () {
  return {
    restrict: 'EA',
    replace: true,
    scope: {
      tooltipTitle: '@',
      placement: '@',
      animation: '&',
      isOpen: '&'
    },
    templateUrl: 'views/templates/tooltip-popup.html'
  };
}).directive('tooltip', [
  '$compile',
  '$timeout',
  '$parse',
  '$window',
  function ($compile, $timeout, $parse, $window) {
    var template = '<tooltip-popup ' + 'tooltip-title="{{tt_tooltip}}" ' + 'placement="{{tt_placement}}" ' + 'animation="tt_animation()" ' + 'is-open="tt_isOpen"' + '>' + '</tooltip-popup>';
    return {
      scope: true,
      link: function (scope, element, attr) {
        var tooltip = $compile(template)(scope), transitionTimeout, triggers = {
            'focus': 'blur',
            'mouseenter': 'mouseleave'
          }, triggerChoice = (attr.tooltipTrigger || 'mouseenter').toLowerCase();
        attr.$observe('tooltip', function (val) {
          scope.tt_tooltip = val;
        });
        attr.$observe('tooltipPlacement', function (val) {
          // If no placement was provided, default to 'top'.
          scope.tt_placement = val || 'right';
        });
        attr.$observe('tooltipAnimation', function (val) {
          scope.tt_animation = $parse(val);
        });
        // By default, the tooltip is not open.
        scope.tt_isOpen = false;
        // Calculate the current position and size of the directive element.
        function getPosition() {
          var boundingClientRect = element[0].getBoundingClientRect();
          return {
            width: element.prop('offsetWidth'),
            height: element.prop('offsetHeight'),
            top: boundingClientRect.top + $window.pageYOffset,
            left: boundingClientRect.left + $window.pageXOffset
          };
        }
        // Show the tooltip popup element.
        function show() {
          var position, ttWidth, ttHeight, ttPosition;
          //don't show empty tooltips
          if (!scope.tt_tooltip) {
            return;
          }
          // If there is a pending remove transition, we must cancel it, lest the
          // toolip be mysteriously removed.
          if (transitionTimeout) {
            $timeout.cancel(transitionTimeout);
          }
          // Set the initial positioning.
          tooltip.css({
            top: 0,
            left: 0,
            display: 'block'
          });
          // Now we add it to the DOM because need some info about it. But it's not 
          // visible yet anyway.
          element.after(tooltip);
          // Get the position of the directive element.
          position = getPosition();
          // Get the height and width of the tooltip so we can center it.
          ttWidth = tooltip.prop('offsetWidth');
          ttHeight = tooltip.prop('offsetHeight');
          // Calculate the tooltip's top and left coordinates to center it with
          // this directive.
          switch (scope.tt_placement) {
          case 'right':
            ttPosition = {
              top: position.top + position.height / 2 - ttHeight / 2 + 'px',
              left: position.left + position.width + 'px'
            };
            break;
          case 'bottom':
            ttPosition = {
              top: position.top + position.height + 'px',
              left: position.left + position.width / 2 - ttWidth / 2 + 'px'
            };
            break;
          case 'left':
            ttPosition = {
              top: position.top + position.height / 2 - ttHeight / 2 + 'px',
              left: position.left - ttWidth + 'px'
            };
            break;
          default:
            ttPosition = {
              top: position.top - ttHeight + 'px',
              left: position.left + position.width / 2 - ttWidth / 2 + 'px'
            };
            break;
          }
          // Now set the calculated positioning.
          tooltip.css(ttPosition);
          // And show the tooltip.
          scope.tt_isOpen = true;
        }
        // Hide the tooltip popup element.
        function hide() {
          // First things first: we don't show it anymore.
          //tooltip.removeClass( 'in' );
          scope.tt_isOpen = false;
          // And now we remove it from the DOM. However, if we have animation, we 
          // need to wait for it to expire beforehand.
          // FIXME: this is a placeholder for a port of the transitions library.
          if (angular.isDefined(scope.tt_animation) && scope.tt_animation()) {
            transitionTimeout = $timeout(function () {
              tooltip.remove();
            }, 500);
          } else {
            tooltip.remove();
          }
        }
        // Register the event listeners.
        element.bind(triggerChoice || 'mouseenter', function () {
          scope.$apply(show);
        });
        element.bind(triggers[triggerChoice] || 'mouseleave', function () {
          scope.$apply(hide);
        });
      }
    };
  }
]);
angular.module('employeeApp').controller('OrderAcknowledgementItemDetailsCtrl', [
  '$scope',
  '$routeParams',
  'AcknowledgementItem',
  'Fabric',
  'Notification',
  '$location',
  function ($scope, $routeParams, AcknowledgementItem, Fabric, Notification, $location) {
    $scope.fabricList = Fabric.query();
    $scope.item = AcknowledgementItem.get({ id: $routeParams.id });
    $scope.save = function () {
      Notification.display('Saving' + $scope.item.description + '...', false);
      $scope.item.$save(function () {
        Notification.display($scope.item.description + ' saved');
      }, function () {
        Notification.display('There was an error in saving ' + $scope.item.description, false);
      });
    };
    $scope.remove = function () {
      Notification.display('Deleting ' + $scope.item.description, false);
      $scope.item.$delete(function () {
        Notification.display('Deleting ' + $scope.item.description);
        $location.path('/order/acknowledgement');
      });
    };
  }
]);
angular.module('employeeApp').factory('AcknowledgementItem', [
  '$resource',
  function ($resource) {
    return $resource('/api/v1/acknowledgement-item/:id', { id: '@id' }, {
      update: { method: 'PUT' },
      create: { method: 'POST' }
    });
  }
]);
angular.module('employeeApp').controller('SupplyPropViewCtrl', [
  '$scope',
  'Supply',
  '$filter',
  '$q',
  'Notification',
  '$location',
  function ($scope, Supply, $filter, $q, Notification, $location) {
    $scope.supplyList = Supply.query({ type: 'prop' });
    //Change page to add page
    $scope.add = function () {
      $scope.safeApply(function () {
        $location.path('/supply/prop/add');
      });
    };
    $scope.upload = function (index, image) {
      Notification.display('Uploading Image...', false);
      var resource = $filter('orderBy')($filter('filter')($scope.supplyList, $scope.query), 'supplier.name')[index], deferred, promise, fd = new FormData();
      deferred = $q.defer();
      promise = deferred.promise;
      //Create promise events
      promise.then(function (data) {
        /*The success fulfillment of the
             * promise will kick in the events:
             * -Show success notice
             * -update image property of prop
             */
        Notification.display('Image Updated');
        //Perform scope updates if
        //The scope still exists
        $scope.safeApply(function () {
          resource.image = resource.image || {};
          angular.copy(data, resource.image);
          resource.$save(function () {
            Notification.display('Prop Saved');
          });
        });
      }, function (reason) {
        Notification.display('Unable to Upload Image');
      });
      //Append image and upload the form data
      fd.append('image', image);
      jQuery.ajax('supply/image', {
        type: 'POST',
        data: fd,
        processData: false,
        contentType: false,
        success: function (response) {
          deferred.resolve(response);
        },
        error: function () {
          deferred.reject();
        }
      });
    };
  }
]);
angular.module('employeeApp').controller('SupplyPropAddCtrl', [
  '$scope',
  'Supplier',
  'Supply',
  'Notification',
  '$location',
  '$q',
  function ($scope, Supplier, Supply, Notification, $location, $q) {
    var deferred, promise, uploading = false;
    $scope.supplierList = Supplier.query();
    $scope.prop = new Supply();
    $scope.prop.type = 'prop';
    //Tooltips
    $scope.supplierText = 'Choose a Supplier for this Fabric';
    $scope.referenceText = 'Enter the Supplier\'s Reference Number';
    $scope.widthText = 'Enter the Width in millimeters';
    $scope.depthText = 'Enter the Depth in millimeters';
    $scope.heightText = 'Enter the Height in millimeters';
    $scope.cost = 'Enter the Cost in the format of 100 or 123.45';
    //Methods
    //Add Fabric
    $scope.save = function () {
      /*
         * The function will first check if the 
         * form is valid
         * 
         * If the form is valid then there is a check
         * to see if there is an image upload in progress
         * 
         * if there is then it will save the item after the image 
         * is uploaded
         */
      //Checks the form is valid
      if ($scope.form.$valid) {
        if (uploading) {
          var prop = angular.copy($scope.prop);
          promise.then(function (response) {
            prop.image = prop.image || {};
            angular.copy(response, prop.image);
            Notification.display('Saving Prop...', false);
            prop.$save(function () {
              Notification.display('Prop Saved');
            });
          }, angular.noop);
        } else {
          Notification.display('Saving Prop...', false);
          //save to database
          $scope.prop.$save(function () {
            Notification.display('Prop Saved');
          });
        }
        $location.path('/supply/prop');
      }
    };
    //Upload Image
    $scope.upload = function () {
      //Notify of uploading image
      Notification.display('Uploading Image...', false);
      var fd = new FormData();
      fd.append('image', $scope.images[0]);
      //clear the form
      $scope.addLength = null;
      $scope.addRemark = null;
      //Create deferred and promose
      deferred = $q.defer();
      promise = deferred.promise;
      //Create promise events
      promise.then(function (data) {
        /*The success fulfillment of the
             * promise will kick in the events:
             * -Show success notice
             * -update image property of prop
             */
        Notification.display('Image Updated');
        //Perform scope updates if
        //The scope still exists
        if ($scope) {
          $scope.$apply(function () {
            $scope.prop.image = $scope.prop.image || {};
            angular.copy(data, $scope.prop.image);
          });
        }
      }, function (reason) {
        Notification.display('Unable to Upload Image');
      });
      //Set uploading switch to true
      uploading = true;
      jQuery.ajax('supply/image', {
        type: 'POST',
        data: fd,
        processData: false,
        contentType: false,
        success: function (response) {
          deferred.resolve(response);
        },
        error: function () {
          deferred.reject();
        }
      });
    };
  }
]);
angular.module('employeeApp').factory('Supply', [
  '$resource',
  function ($resource) {
    return $resource('/api/v1/supply/:id/:action', { id: '@id' }, {
      create: { method: 'POST' },
      update: { method: 'PUT' },
      add: {
        method: 'POST',
        params: { action: 'add' }
      },
      subtract: {
        method: 'POST',
        params: { action: 'subtract' }
      }
    });
  }
]);
angular.module('employeeApp').controller('SupplyPropDetailsCtrl', [
  '$scope',
  function ($scope) {
  }
]);
//'use strict';
angular.module('employeeApp').directive('searchBar', [
  '$compile',
  function ($compile) {
    'use strict';
    return {
      restrict: 'A',
      scope: { query: '=ngModel' },
      link: function postLink(scope, element, attrs) {
        var input = null;
        var model = attrs.ngModel || 'query';
        element.addClass('search-bar');
        if (attrs.searchBarDate !== undefined) {
          input = angular.element('<div data-ng-model="' + model + '" class="datepicker" ui-date></div>');
          element.addClass('date');
        } else {
          input = angular.element('<input size="40" placeholder="Search" ng-model="query" />');
        }
        var clearButton = angular.element('<span class=\'close-button\'>&times;</span>');
        $compile(input)(scope);
        element.append(input);
        element.append(clearButton);
        /*
			* The handler will detect if ctrl/cmd+F 
			* is pressed on the keyboard
			* 
			* If press occurs, we disable the default action
			* perform state specific actions
			*/
        function searchHandler(evt) {
          if (evt.which == '70' && (evt.metaKey || evt.ctrlKey)) {
            evt.preventDefault();
            //Determine
            scope.$apply(function () {
              if (element.hasClass('focus')) {
                //Hide object and blur
                input.blur();
                element.removeClass('focus');
              } else {
                //Show and focus
                input.focus();
                element.addClass('focus');
              }
            });
          }
        }
        //Bind an action 
        $(window).on('keydown', searchHandler);
        /*
			 * Clear Button
			 */
        clearButton.click(function () {
          scope.$apply(function () {
            scope.query = '';
          });
        });
        //Unbind when leaving the Page
        scope.$on('$destroy', function () {
          $(window).off('keydown', searchHandler);
        });
      }
    };
  }
]);
angular.module('employeeApp').directive('eaSave', [function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        element.text('this is the eaSave directive');
      }
    };
  }]);
angular.module('employeeApp').directive('eaAdd', [function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        function callback(evt) {
          if (evt.which == '65' && (evt.metaKey || evt.ctrlKey)) {
            evt.preventDefault();
            scope.$eval(attrs.eaAdd);
          }
        }
        $(window).on('keydown', callback);
        scope.$on('$destroy', function () {
          $(window).off('keydown', callback);
        });
      }
    };
  }]);
angular.module('employeeApp.directives').directive('imageCropper', [
  'Notification',
  '$compile',
  function (Notification, $compile) {
    function Scene(canvas, ctx, image) {
      this.ctx = ctx;
      this.canvas = canvas;
      this.img = image;
      this._scale = 1;
      this.bX = 0;
      this.bY = 0;
      this.bH = this.img.height;
      this.bW = this.img.width;
      this.cropX = null;
      this.cropY = null;
      this.cropW = null;
      this.cropH = null;
      this.mouseX = null;
      this.mouseY = null;
      this.corners = [];
      this.xProportion = this.canvas.width / this.img.width;
      this.yProportion = this.canvas.height / this.img.height;
    }
    Object.defineProperties(Scene.prototype, {
      scale: {
        get: function () {
          return this._scale;
        },
        set: function (scale) {
          this._scale = scale <= 1 ? scale : scale / 100;
        }
      },
      x: {
        get: function () {
          return this.bX;
        },
        set: function (x) {
          this.bX = x;
        }
      },
      y: {
        get: function () {
          return this.bY;
        },
        set: function (y) {
          this.bY = y;
        }
      },
      w: {
        get: function () {
          return this.bW;
        },
        set: function (w) {
          this.bW = w;
        }
      },
      h: {
        get: function () {
          return this.bH;
        },
        set: function (h) {
          this.bH = h;
        }
      }
    });
    Scene.prototype.repositionCorners = function () {
      this.corners.topLeft = {
        x: this.bX * this.xProportion,
        y: this.bY * this.yProportion
      };
      this.corners.topRight = {
        x: (this.bX + this.bW) * this.xProportion,
        y: this.bY * this.yProportion
      };
      this.corners.bottomRight = {
        x: (this.bX + this.bW) * this.xProportion,
        y: (this.bY + this.bH) * this.yProportion
      };
      this.corners.bottomLeft = {
        x: this.bX * this.xProportion,
        y: (this.bY + this.bH) * this.yProportion
      };
    };
    Scene.prototype.inCorner = function (x, y) {
      for (var key in this.corners) {
        if (Math.sqrt(Math.pow(x - this.corners[key].x, 2) + Math.pow(y - this.corners[key].y, 2)) <= 10) {
          return key;
        }
      }
    };
    Scene.prototype.drawCube = function (x, y) {
      this.ctx.beginPath();
      this.ctx.arc(x, y, 5, 0, Math.PI * 2, true);
      this.ctx.fill();
    };
    Scene.prototype.drawCubes = function () {
      this.ctx.fillStyle = 'rgb(255, 255, 255)';
      this.drawCube(this.bX * this.xProportion, this.bY * this.yProportion);
      this.drawCube((this.bX + this.bW) * this.xProportion, (this.bY + this.bH) * this.yProportion);
      this.drawCube((this.bX + this.bW) * this.xProportion, this.bY * this.yProportion);
      this.drawCube(this.bX * this.xProportion, (this.bY + this.bH) * this.yProportion);
    };
    Scene.prototype.drawBackground = function () {
      this.ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    };
    Scene.prototype.draw = function () {
      //Calculations
      this.repositionCorners();
      //Rendering
      this.drawBackground();
      this.ctx.drawImage(this.img, this.bX, this.bY, this.bW, this.bH, this.bX * this.xProportion, this.bY * this.yProportion, this.bW * this.xProportion, this.bH * this.yProportion);
      this.drawCubes();
    };
    Scene.prototype.drawImage = function () {
      this.ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height, 0, 0, this.canvas.width, this.canvas.height);
    };
    Scene.prototype.crop = function (boundingWidth, boundingHeight) {
      if (boundingHeight && boundingWidth) {
        var ratio1 = boundingHeight / boundingWidth;
        var ratio2 = this.bH / this.bW;
        if (ratio1 > ratio2) {
          this.canvas.width = boundingWidth;
          this.canvas.height = this.bH * boundingWidth / this.bW;
          angular.element(this.canvas).css('top', (boundingHeight - this.canvas.height) / 2);
          angular.element(this.canvas).css('left', (boundingWidth - this.canvas.width) / 2);
        } else {
          this.canvas.height = boundingHeight;
          this.canvas.width = this.bW * boundingHeight / this.bH;
          angular.element(this.canvas).css('left', (boundingWidth - this.canvas.width) / 2);
          angular.element(this.canvas).css('top', (boundingHeight - this.canvas.height) / 2);
        }
      } else {
        this.canvas.width = this.bW;
        this.canvas.height = this.bH;
      }
      this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h, 0, 0, this.canvas.width, this.canvas.height);  // this.canvas.width = this.bW/this.xProportion
                                                                                                                  // this.canvas.height = this.bH/this.xProportion
                                                                                                                  //this.ctx.putImageData(imageData, 0, 0, this.canvas.width, this.canvas.height);
    };
    Scene.prototype.getImageAsURL = function () {
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      canvas.width = this.w * this._scale;
      canvas.height = this.h * this._scale;
      context.drawImage(this.img, this.x, this.y, this.w, this.h, 0, 0, this.w * this._scale, this.h * this._scale);
      return canvas.toDataURL('image/jpeg');
    };
    Scene.prototype.getImageAsBlob = function () {
      var url = this.getImageAsURL();
      var bytes = atob(url.split(',')[1]);
      var stream = new Uint8Array(bytes.length);
      for (var key in bytes) {
        stream[key] = bytes.charCodeAt(key);
      }
      return new Blob([stream], { type: 'image/jpeg' });
    };
    return {
      restrict: 'A',
      template: '<div class="cropper">                        <div class="cropper-message" ng-show="!cropper.image.loaded"><h3>Drop Image Here</h3></div>                        <div class="cropper-controller" ng-show="cropper.image.loaded">                            <button ng-click="cropper.crop()" ng-show="!cropper.cropping">Crop</button>                            <button ng-click="cropper.save()" ng-show="cropper.cropping">Done Cropping</button>                            <button ng-click="save()" ng-show="!cropper.cropping">Save</button>                            <button data-ng-click="preview(cropper.getImageAsURL())">Preview</button>                            <table class="cropper-scale">                                <tr>                                    <td>Scale:</td>                                    <td><input class="scale" type="number" data-ng-model="cropper.scale" min="0" max="100">%</td>                                </tr>                                <tr>                                    <td>Width</td>                                    <td>{{cropper.image.scaled_width | number:0}}px</td>                                </tr>                                <tr>                                    <td>Height</td>                                    <td>{{cropper.image.scaled_height | number:0}}px</td>                                </tr>                            </table>                        </div>                        <div class="canvas-container" ng-class="{show:cropper.image.loaded}">                            <canvas class="cropper-canvas"></canvas>                        </div>                    </div>',
      replace: true,
      scope: {
        onSave: '&',
        onLoad: '&'
      },
      link: function postLink(scope, element, attrs) {
        var cubes = [];
        var canvasContainer = element.find('.canvas-container');
        var canvasElement = canvasContainer.find('canvas');
        var canvas = canvasContainer.find('canvas')[0];
        var parent = element;
        var fileReader = new FileReader();
        var ctx = canvas.getContext('2d');
        var mouseX;
        var mouseY;
        var corner;
        var scene;
        var image;
        var mousedown = false;
        //Set Canvas to parent width and height
        canvas.width = canvasContainer.outerWidth();
        canvas.height = canvasContainer.outerHeight();
        fileReader.onload = function (evt) {
          parent.removeClass('drag-drop-active');
          //Create Image
          image = new Image();
          image.onload = function (e) {
            //Display Notification
            Notification.display('Image Rendered');
            //Set canvas dimensions
            var height = canvasContainer.outerHeight();
            var width = canvasContainer.outerWidth();
            var ratio1 = height / width;
            var ratio2 = image.height / image.width;
            if (ratio1 > ratio2) {
              canvas.width = width;
              canvas.height = image.height * width / image.width;
            } else {
              canvas.height = height;
              canvas.width = image.width * height / image.height;
            }
            //Position the canvas relative to parent
            angular.element(canvas).css('top', (height - canvas.height) / 2);
            angular.element(canvas).css('left', (width - canvas.width) / 2);
            //Create and Draw new Scene
            scene = new Scene(canvas, ctx, image);
            scene.drawImage();
            /*
                     * Try running the onload function that is 
                     * attached to the scope directive
                     */
            try {
              scope.onLoad();
            } catch (evt) {
              console.warn(evt);
            }
            scope.$apply();
          };
          image.src = evt.target.result;
        };
        //Drag Enter
        element.bind('dragenter', function (evt) {
          evt.preventDefault();
          parent.addClass('drag-drop-active');
        });
        //Drag Leave
        element.bind('dragleave', function (evt) {
          evt.preventDefault();
          parent.removeClass('drag-drop-active');
        });
        //Drag over
        element.bind('dragover', function (evt) {
          evt.preventDefault();
          parent.addClass('drag-drop-active');
        });
        element.bind('drop', function (evt) {
          evt.preventDefault();
          evt.stopPropagation();
          Notification.display('Processing Image...', false);
          parent.removeClass('drag-drop-active');
          //Get original evt within jquery evt
          var e = evt.originalEvent;
          //Get the files
          var file = e.dataTransfer.files[0];
          fileReader.readAsDataURL(file);
        });
        function mouseDown(e) {
          e.preventDefault();
          mousedown = true;
          mouseX = e.offsetX;
          mouseY = e.offsetY;
          corner = scene.inCorner(e.offsetX, e.offsetY);
          scene.canvas.style.cursor = 'move';
        }
        function mouseMove(e) {
          if (mousedown) {
            if (corner) {
              switch (corner) {
              case 'topLeft':
                scene.w = scene.w + (mouseX - e.offsetX) / scene.xProportion;
                scene.h = scene.h + (mouseY - e.offsetY) / scene.yProportion;
                scene.y = scene.y - (mouseY - e.offsetY) / scene.yProportion;
                scene.x = scene.x - (mouseX - e.offsetX) / scene.xProportion;
                break;
              case 'topRight':
                scene.w = scene.w - (mouseX - e.offsetX) / scene.xProportion;
                scene.h = scene.h + (mouseY - e.offsetY) / scene.yProportion;
                scene.y = scene.y - (mouseY - e.offsetY) / scene.yProportion;
                break;
              case 'bottomRight':
                scene.w = scene.w - (mouseX - e.offsetX) / scene.xProportion;
                scene.h = scene.h - (mouseY - e.offsetY) / scene.yProportion;
                break;
              case 'bottomLeft':
                scene.x = scene.x - (mouseX - e.offsetX) / scene.xProportion;
                scene.h = scene.h - (mouseY - e.offsetY) / scene.yProportion;
                scene.w = scene.w + (mouseX - e.offsetX) / scene.xProportion;
                break;
              }
            } else {
              var topLeft = scene.corners.topLeft, bottomRight = scene.corners.bottomRight;
              if (topLeft.y - (mouseY - e.offsetY) > 0 && bottomRight.y - (mouseY - e.offsetY) < scene.img.height * scene.yProportion) {
                scene.y = scene.y - (mouseY - e.offsetY) / scene.yProportion;
              } else {
                scene.y = topLeft.y - (mouseY - e.offsetY) <= 0 ? 0 : (scene.canvas.height - (bottomRight.y - topLeft.y)) / scene.yProportion;
              }
              if (topLeft.x - (mouseX - e.offsetX) > 0 && bottomRight.x - (mouseX - e.offsetX) < scene.img.width * scene.xProportion) {
                scene.x = scene.x - (mouseX - e.offsetX) / scene.xProportion;
              } else {
                scene.x = topLeft.x - (mouseX - e.offsetX) <= 0 ? 0 : (scene.canvas.width - (bottomRight.x - topLeft.x)) / scene.xProportion;
              }
            }
            mouseX = e.offsetX;
            mouseY = e.offsetY;
            scene.draw();
            scope.$apply();
          }
        }
        function mouseUp(e) {
          mousedown = false;
          corner = false;
        }
        function mouseLeave(e) {
          mousedown = false;
          corner = false;
        }
        /*
             * API Section
             * 
             * Properties:
             * -scale
             * 
             * Methods:
             * -crop
             * -save
             * -getImage
             */
        scope.cropper = {
          cropping: false,
          image: {}
        };
        Object.defineProperties(scope.cropper, {
          scale: {
            get: function () {
              return scene ? scene.scale * 100 : 100;
            },
            set: function (scale) {
              if (scene) {
                scene.scale = scale;
              }
            }
          }
        });
        Object.defineProperties(scope.cropper.image, {
          width: {
            get: function () {
              return scene ? scene.w ? scene.w : 0 : 0;
            }
          },
          height: {
            get: function () {
              return scene ? scene.h ? scene.h : 0 : 0;
            }
          },
          scaled_height: {
            get: function () {
              return scene ? scene.h ? scene.h * scene.scale : 0 : 0;
            }
          },
          scaled_width: {
            get: function () {
              return scene ? scene.w ? scene.w * scene.scale : 0 : 0;
            }
          },
          loaded: {
            get: function () {
              return scene ? true : false;
            }
          }
        });
        scope.cropper.crop = function () {
          scope.cropper.cropping = true;
          scene.x = 10;
          scene.y = 10;
          scene.w = scene.w - 20;
          scene.h = scene.h - 20;
          scene.canvas.style.cursor = 'move';
          scene.draw();
          canvasElement.bind('mousedown', mouseDown);
          canvasElement.bind('mousemove', mouseMove);
          canvasElement.bind('mouseup', mouseUp);
          canvasElement.bind('mouseleave', mouseLeave);
        };
        scope.cropper.save = function () {
          scope.cropper.cropping = false;
          scene.canvas.style.cursor = 'move';
          scene.crop(canvasContainer.innerWidth(), canvasContainer.innerHeight());
          canvasElement.unbind('mousedown', mouseDown);
          canvasElement.unbind('mousemove', mouseMove);
          canvasElement.unbind('mouseup', mouseUp);
          canvasElement.unbind('mouseleave', mouseLeave);
        };
        scope.cropper.upload = function () {
        };
        scope.cropper.getImage = function () {
          return scene ? scene.getImageAsBlob() : null;
        };
        scope.cropper.getImageAsURL = function () {
          return scope.cropper.getImageURL();
        };
        scope.cropper.getImageURL = function () {
          return scene ? scene.getImageAsURL() : null;
        };
        scope.preview = function (url) {
          if (url) {
            window.open(url);
          }
        };
        scope.cropper.reset = function () {
          scene = undefined;
        };
        scope.save = function () {
          scope.onSave({ $image: scope.cropper.getImage() });
          scope.cropper.reset();
        };
      }
    };
  }
]);
angular.module('employeeApp.services').factory('indexOfId', [
  '$q',
  function ($q) {
    function filter() {
      this.worker = new Worker('scripts/workers/index-of-id.js');
    }
    filter.prototype._prepare_id = function (arg1) {
      if (typeof arg1 == 'object') {
      } else if (typeof arg1 == 'number') {
      }
    };
    filter.prototype.filter = function (arg1, haystack, callback) {
      var needle = this._prepare_id(arg1);
      this.worker.onmessage = function (e) {
        (callback || angular.noop)(e.data);
      };
    };  //return new filter();
  }
]);
angular.module('employeeApp').controller('SupplyLumberViewCtrl', [
  '$scope',
  function ($scope) {
  }
]);
angular.module('employeeApp.services').factory('Contact', [
  'eaResource',
  function (eaResource) {
    return eaResource('contact/:id', { id: '@id' });
  }
]);
/*
 * indexedDB Storage
 * 
 * This file implements a indexedDB backend to store objects
 * from the server and the provide them as a cache and other 
 * potential uses. 
 * 
 * Private Methods:
 * - _save()
 * - _get()
 * - _query()
 * - _remove()
 * 
 * Public Methods:
 * -save()
 * -get()
 * -query()
 * -remove()
 * -clear()
 */
angular.module('employeeApp.services').factory('eaIndexedDB', [
  '$q',
  '$timeout',
  '$rootScope',
  function ($q, $timeout, $rootScope) {
    /*
     * Helper Functions
     */
    function getNamespaces() {
      //return JSON.parse(window.localStorage.getItem('namespaces')) || [];
      return [
        'customer',
        'supplier',
        'supplier-contact',
        'permission',
        'acknowledgement',
        'acknowledgement-item',
        'contact',
        'shipping',
        'transaction',
        'fabric',
        'supply',
        'model',
        'product',
        'configuration',
        'upholstery',
        'group',
        'user',
        'delivery',
        'table',
        'project',
        'project-room',
        'project-item',
        'purchase-order',
        'test'
      ];
    }
    function saveNamespaces(namespaces) {
      window.localStorage.setItem('namespaces', JSON.stringify(namespaces));
    }
    function formatNamespace(str) {
      try {
        var strArray = str.split(/\//);
        var re = new RegExp(/^\:/);
        str = '';
        for (var key in strArray) {
          if (!re.test(strArray[key])) {
            if (str.length > 0) {
              str += '-';
            }
            str += strArray[key];
          }
        }
        return str;
      } catch (e) {
        throw new TypeError('Must be a string');
      }
    }
    /*
     * Initialize the IndexedDB
     * 
     * We open the database so that child objectstores can be retrieved from
     * this database instead of making repeated calls to open a new database
     */
    var database = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    var version = getNamespaces().length;
    var request = database.open('app', version);
    var DBVehicle = { _readyFns: [] };
    Object.defineProperties(DBVehicle, {
      onready: {
        set: function (fn) {
          this._readyFns.push(fn);
        },
        get: function () {
          return function () {
            for (var key in this._readyFns) {
              this._readyFns[key]();
            }
          };
        }
      }
    });
    /*
     * The version number is based on the number of namespaces
     * When the number of namespaces increases, then the version
     * number increases, initiating an upgrade needed call. 
     * 
     * Namespaces that do not have a corresponding object store 
     * are then associated with a new object store
     */
    request.onupgradeneeded = function (event) {
      var namespaces = getNamespaces();
      //angular.extend(db, request.result);
      DBVehicle.db = request.result;
      var db = DBVehicle.db;
      for (var key in namespaces) {
        if (!db.objectStoreNames.contains(namespaces[key])) {
          var objectStore = db.createObjectStore(namespaces[key], { keyPath: 'id' });  //objectStore.createIndex("idIndex", "id", { unique: true });
        }
      }
    };
    /*
     * If the database is successfully opened or upgraded
     * then the db is assigned to the parent, the ready status
     * is set to true, and the onready callback is called if 
     * it is defined. 
     */
    request.onsuccess = function (e) {
      DBVehicle.db = request.result;
      DBVehicle.onready();
    };
    /*
     * If the database is unable to open then the error is printed
     * to the console. 
     */
    request.onerror = function (e) {
      console.error(e);
    };
    function factory(namespace) {
      namespace = formatNamespace(namespace);
      /*
         * Create a store of namespaces in the localStorage
         */
      var namespaces = JSON.parse(window.localStorage.getItem('namespaces')) || [];
      if (namespaces.indexOf(namespace) == -1) {
        namespaces.push(namespace);
      }
      window.localStorage.setItem('namespaces', JSON.stringify(namespaces));
      /*
         * Create the class to be prototyped
         * 
         * We initialize the indexedDB with the appropriate
         * object store by using the class name
         * 
         * We open the database and use a version number
         * that is determined by the total number of namespaces, 
         * so as to automatically update the database to contain
         * the new object store
         */
      function Database(namespace) {
        this.namespace = namespace;
        this.indexedDB = database;
        this.DBVehicle = DBVehicle;
        Object.defineProperties(this, {
          db: {
            get: function () {
              return this.DBVehicle.db;
            }
          },
          ready: {
            get: function () {
              return this.DBVehicle.db ? true : false;
            }
          },
          onready: {
            set: function (fn) {
              this.DBVehicle.onready = fn;
            }
          }
        });
      }
      /*
         * Private functions
         */
      Database.prototype._cleanObj = function (obj) {
        var re = new RegExp(/^\$/);
        for (var key in obj) {
          if (re.test(key) || angular.isFunction(obj[key])) {
            delete obj[key];
          }
        }
        return obj;
      };
      Database.prototype._save = function (obj, success, error) {
        try {
          var cleanObj = this._cleanObj(obj);
          var request = this.db.transaction([this.namespace], 'readwrite').objectStore(this.namespace).put(cleanObj);
          request.onsuccess = function (evt) {
            (success || angular.noop)();
          };
          request.onerror = function (evt) {
            console.error(evt);
            (error || angular.noop)(evt);
          };
        } catch (e) {
          console.error(e);
          (error || angular.noop)(e);
        }
      };
      Database.prototype._get = function (param, success, error) {
        try {
          param = parseFloat(param);
          var store = this.db.transaction(this.namespace).objectStore(this.namespace).get(param).onsuccess = function (evt) {
              var response = evt.target.result || null;
              (success || angular.noop)(response);
            };
        } catch (e) {
          console.error(e.stack);
          (error || angular.noop)();
        }  /*
                .get(param);
            
            request.onsuccess = function(evt){
                console.log(evt);
                console.log(request.results);
                (success || angular.noop)(request.result);
            };
                
            request.onerror = function(evt){
                console.log(evt);
                console.log('error');
                (error || angular.noop)();
            };*/
      };
      Database.prototype._query = function (param, success, error) {
        var data = [];
        var objectStore = this.db.transaction([this.namespace], 'readonly').objectStore(this.namespace);
        var request = objectStore.openCursor();
        request.onsuccess = function (evt) {
          var cursor = evt.target.result;
          if (cursor) {
            data.push(cursor.value);
            cursor.continue();
          } else {
            (success || angular.noop)(data);
          }
        };
        request.onerror = function (evt) {
          console.error(evt);
          (error || angular.noop)();
        };
      };
      Database.prototype._remove = function (arg, success, error) {
        var request = this.db.transaction([this.namespace], 'readwrite').objectStore(this.namespace).delete(arg);
        request.onsuccess = function (evt) {
          (success || angular.noop)();
        };
        request.onerror = function (evt) {
          (error || angular.noop)();
        };
      };
      /*
         * Private Clear method
         */
      Database.prototype._clear = function (success, error) {
        try {
          var store = this.db.transaction(this.namespace, 'readwrite').objectStore(this.namespace);
          store.clear().onsuccess = function () {
            (success || angular.noop)();
          };
        } catch (e) {
          console.error(e.stack);
          (error || angular.noop)(e);
        }
      };
      /*
         * This section will implements the public facing APIs that
         * are available to retrieve data
         */
      Database.prototype.query = function (arg1, arg2, arg3) {
        var success, error, param;
        switch (arguments.length) {
        case 1:
          /* jshint ignore: start */
          angular.isFunction(arg1) ? success = arg1 : param = arg1;
          /* jshint ignore: end */
          break;
        case 2:
          if (angular.isFunction(arg1)) {
            success = arg1;
            error = arg2;
          } else {
            param = arg1;
            success = arg2;
          }
          break;
        case 3:
          if (angular.isFunction(arg1)) {
            success = arg1;
            error = arg2;
          } else {
            param = arg1;
            success = arg2;
            error = arg3;
          }
          break;
        default:
          throw new RangeError('Expects between 1-3 arguments');
        }
        try {
          this._query(param, success, error);
        } catch (e) {
        }
      };
      Database.prototype.get = function (param, success, error) {
        if (arguments.length < 1 && arguments.length > 3) {
          throw new RangeError('Expects between 1-3 argumeents');
        }
        try {
          this._get(param, success, error);
        } catch (e) {
          console.error(e);
        }
      };
      Database.prototype.save = function (obj, success, error) {
        try {
          if (angular.isArray(obj)) {
            for (var key in obj) {
              this._save(obj[key]);
            }
            (success || angular.noop)();
          } else {
            this._save(obj, success, error);
          }
        } catch (e) {
          console.error(e.stack);
        }
      };
      Database.prototype.remove = function (arg, success, error) {
        try {
          this._remove(arg, success, error);
        } catch (e) {
          console.error(e);
        }
      };
      Database.prototype.clear = function (success, error) {
        this._clear(success, error);
      };
      Database.prototype.destroy = function (success) {
        this.indexedDB.deleteDatabase('app').onsuccess = function () {
          (success || angular.noop)();
        };
      };
      return new Database(namespace);
    }
    return factory;
  }
]);
angular.module('employeeApp').controller('ProductInventoryCtrl', [
  '$scope',
  'AcknowledgementItem',
  function ($scope, AcknowledgementItem) {
    $scope.itemList = AcknowledgementItem.poll().query({ status: 'inventory' });
    $scope.showAddInventory = false;
    $scope.addInventory = function (product) {
      $scope.item = new AcknowledgementItem();
      angular.extend($scope.item, JSON.parse(JSON.stringify(product)));
      if (product.hasOwnProperty('id')) {
        $scope.item.product = { id: product.id };
      }
      delete $scope.item.id;
      $scope.item.status = 'INVENTORY';
      $scope.item.$save(function () {
        $scope.itemList.push(angular.copy($scope.item));
      });
    };
    $scope.$on('$destroy', function () {
      $scope.AcknowledgementItem.stopPolling();
    });
  }
]);
angular.module('employeeApp.services').factory('Geocoder', [
  '$q',
  '$rootScope',
  function ($q, $rootScope) {
    /*Helper functions*/
    function prepareAddress(obj) {
      var addrStr = '';
      if (obj.hasOwnProperty('address') || obj.hasOwnProperty('address1')) {
        addrStr += obj.address || obj.address1;
      } else {
        throw new TypeError('Missing \'address\' or \'address1\' argument');
      }
      if (obj.hasOwnProperty('city')) {
        addrStr += ', ' + obj.city;
      } else {
        throw new TypeError('Missing \'city\' argument');
      }
      if (obj.hasOwnProperty('territory')) {
        addrStr += ', ' + obj.territory;
      } else {
        throw new TypeError('Missing \'territory\' argument');
      }
      if (obj.hasOwnProperty('country')) {
        addrStr += ', ' + obj.country;
      } else {
        throw new TypeError('Missing \'country\' argument');
      }
      if (obj.hasOwnProperty('zipcode')) {
        addrStr += ', ' + obj.zipcode;
      } else {
        throw new TypeError('Missing \'zipcode\' argument');
      }
      return addrStr;
    }
    function Geocoder() {
      this.google = 'google' in window ? window.google : {
        maps: {
          Geocoder: angular.noop,
          LatLng: angular.noop
        }
      };
      this.geocoder = new this.google.maps.Geocoder();
    }
    /*
    Object.defineProperties(Geocoder.prototype, {
        address:{
            get:function(){return this._address;},
            set:function(addr){this._address = addr;}
        },
        city:{
            get:function(){return this._city;},
            set:function(city){this._city = city;},
        },
        territory:{
            get:function(){return this._territory;},
            set:function(territory){this._territory = territory;}
        },
        country:{
            get:function(){return this._country;},
            set:function(country){
                this._country = country;
                this._region = this._getRegion(this._country);
            }
        }
    });*/
    Geocoder.prototype._getRegion = function (country) {
      switch (country.toLocaleLowerCase()) {
      case 'thailand':
        return 'TH';
      case 'usa':
        return 'US';
      case 'us':
        return 'US';
      case 'italy':
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
    };
    Geocoder.prototype._lookup = function (addr, callback, errback) {
      var addrStr = prepareAddress(addr);
      this.geocoder.geocode({
        'address': addrStr,
        'region': this._getRegion(addr.country)
      }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          (callback || angular.noop)(results);
        } else {
          console.error(status);
          (errback || angular.noop)(status);
        }
      });
    };
    Geocoder.prototype.geocode = function (arg) {
      if (angular.isObject(arg)) {
        var deferred = $q.defer();
        this._lookup(arg, function (results) {
          $rootScope.safeApply(function () {
            deferred.resolve(results);
          });
        }, function (status) {
          $rootScope.safeApply(function () {
            deferred.reject(status);
          });
        });
        return deferred.promise;
      } else {
        throw new TypeError('Arguments must be in the form of an object.');
      }
    };
    Geocoder.prototype.reverseGeocode = function (lat, lng) {
      var deferred = $q.defer();
      var latLng = new this.google.maps.LatLng(lat, lng);
      this.geocoder.geocode({ 'latLng': latLng }, function (results, status) {
        deferred.resolve(results);
      });
      return deferred.promise;
    };
    return new Geocoder();
  }
]);
angular.module('employeeApp.services').factory('mapMarker', [function () {
    function MarkerFactory(configs) {
      function Marker(configs) {
        if (angular.isObject(configs)) {
          if (configs.map instanceof google.maps.Map) {
            this._map = configs.map;
          } else {
            throw new TypeError('Is not an instance of google.maps.Map');
          }
          if (!configs.position instanceof google.maps.LatLng) {
            throw new TypeError('Is not an instance of google.maps.LatLng');
          }
          this.prototype = new google.maps.Marker({
            position: configs.position,
            map: this._map,
            draggable: true,
            animation: google.maps.Animation.DROP
          });
          google.maps.event.addListener(this, 'dragend', function (e) {
            (this.onchange || angular.noop)({
              lat: this.lat,
              lng: this.lng
            });
          }.bind(this));
        }
      }
      Object.defineProperties(Marker.prototype, {
        lat: {
          get: function () {
            return this.getPosition().lat() || null;
          }
        },
        lng: {
          get: function () {
            return this.getPosition().lng() || null;
          }
        }
      });
      Marker.prototype.setPosition = function (latLng) {
        if (latLng instanceof google.maps.LatLng) {
          this.setPosition(latLng);
        }
      };
      Marker.prototype.hide = function () {
        this.setMap(null);
      };
      Marker.prototype.show = function () {
        this.setMap(this._map);
      };
      Marker.prototype.focus = function () {
        this.setCenter(this._marker.getPosition());
      };
      return new Marker(configs);
    }
    return MarkerFactory;
  }]);
angular.module('employeeApp').controller('OrderShippingDeliveryCtrl', [
  '$scope',
  'Delivery',
  function ($scope, Delivery) {
    $scope.deliveryList = Delivery.query();
  }
]);
angular.module('employeeApp').factory('Delivery', [
  'eaResource',
  function (eaResource) {
    return eaResource('delivery/:id', { id: '@id' });
  }
]);
angular.module('employeeApp').controller('ProductTableViewCtrl', [
  '$scope',
  'Table',
  'Notification',
  function ($scope, Table, Notification) {
    var fetching = true;
    Notification.display('Loading Tables...');
    $scope.tableList = Table.query(function () {
      fetching = false;
      Notification.hide();
    });
    $scope.$watch('query', function (q) {
      if (q) {
        Table.query({
          q: q,
          limit: 5
        }, function (resources) {
          for (var i = 0; i < resources.length; i++) {
            if ($scope.tableList.indexOfById(resources[i]) == -1) {
              $scope.tableList.push(resources[i]);
            }
          }
        });
      }
    });
    $scope.loadNext = function () {
      if (!fetching) {
        Table.query({
          offset: $scope.tableList.length,
          limit: 50
        }, function (resources) {
          for (var i = 0; i < resources.length; i++) {
            $scope.tableList.push(resources[i]);
          }
        });
      }
    };
  }
]);
angular.module('employeeApp.services').factory('Table', [
  '$resource',
  function ($resource) {
    return $resource('api/v1/table/:id', { id: '@id' }, {
      update: { method: 'PUT' },
      create: { method: 'POST' }
    });
  }
]);
angular.module('employeeApp').controller('ProductRugViewCtrl', [
  '$scope',
  function ($scope) {
  }
]);
angular.module('employeeApp').controller('ProductRugAddCtrl', [
  '$scope',
  function ($scope) {
  }
]);
angular.module('employeeApp').directive('background', [function () {
    return {
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        if (attrs.backgroundImages) {
        } else {
          throw new TypeError('Missing Images for Background Directive.');
        }
      }
    };
  }]);
angular.module('employeeApp').controller('ProductTableDetailsCtrl', [
  '$scope',
  'Table',
  '$routeParams',
  'Notification',
  '$location',
  function ($scope, Table, $routeParams, Notification, $location) {
    $scope.table = Table.get({ 'id': $routeParams.id });
    //Upload Image
    $scope.upload = function () {
      //Notify of uploading image
      Notification.display('Uploading Image...', false);
      var fd = new FormData();
      fd.append('image', $scope.images[0]);
      jQuery.ajax('/api/v1/upholstery/image', {
        type: 'POST',
        data: fd,
        cache: false,
        processData: false,
        contentType: false,
        success: function (responseData) {
          Notification.display('Image Updated');
          $scope.table.image = {};
          angular.copy(responseData, $scope.table.image);
          $scope.table.$update();
          $scope.imagePreviews = null;
          $scope.images = null;
          $scope.$apply();
        }
      });
    };
    $scope.update = function () {
      Notification.display('Saving Table...', false);
      $scope.table.$update(function () {
        Notification.display('Table Saved');
      });
    };
    $scope.remove = function () {
      Notification.display('Deleteing Table Product');
      $scope.table.$delete(function () {
        Notification.display('Table Product Deleted');
        $location.path('/product/table');
      });
    };
    $scope.$on('$destroy', function () {
      $scope.update();
    });
  }
]);
angular.module('employeeApp').controller('ProductTableAddCtrl', [
  '$scope',
  'Table',
  'Configuration',
  'Model',
  'Notification',
  '$location',
  function ($scope, Table, Configuration, Model, Notification, $location) {
    $scope.configurationList = Configuration.query({ limit: 0 });
    $scope.modelList = Model.query({ limit: 0 });
    $scope.table = new Table();
    //Text for tooltips
    $scope.modelText = 'Choose a Model';
    $scope.configurationText = 'Choose a Configuration';
    $scope.widthText = 'Enter a Width in millimeters';
    $scope.depthText = 'Enter a Depth in millimeters';
    $scope.upload = function () {
      //Notify of uploading image
      Notification.display('Uploading Image...', false);
      var fd = new FormData();
      fd.append('image', $scope.images[0]);
      //clear the form
      $scope.addLength = null;
      $scope.addRemark = null;
      jQuery.ajax('/api/v1/upholstery/image', {
        type: 'POST',
        data: fd,
        processData: false,
        contentType: false,
        success: function (responseData) {
          Notification.display('Image Uploaded');
          $scope.table.image = $scope.table.image || {};
          angular.copy(responseData, $scope.table.image);
          $scope.$apply();
          $scope.table.$update();
        }
      });
    };
    $scope.save = function () {
      Notification.display('Saving Table Product...');
      $scope.table.$create(function () {
        Notification.display('Table Product Saved');
        $location.path('/product/table');
      });
    };
  }
]);
angular.module('employeeApp').controller('ProjectViewCtrl', [
  '$scope',
  'Project',
  'Notification',
  'Customer',
  '$location',
  function ($scope, Project, Notification, Customer, $location) {
    //Controlling attributes
    $scope.showAddProject = false;
    //Query the server for projects continouosly
    $scope.projectList = Project.query();
    $scope.customerList = Customer.query();
    //Grid options
    $scope.gridOptions = {
      data: 'projectList',
      columnDefs: [
        {
          field: 'description',
          displayName: 'Description'
        },
        {
          field: 'customer.name',
          displayName: 'customer'
        },
        {
          field: 'type',
          displayName: 'Type'
        },
        {
          field: 'status',
          displayName: 'Status'
        },
        {
          field: 'delivery_date',
          displayName: 'Delivery Date',
          filter: 'date:"MMMM d, yyyy"'
        }
      ]
    };
    //Create new project
    $scope.create = function () {
      Notification.display('Creating new project...', false);
      var project = new Project();
      angular.extend(project, $scope.project);
      project.$save(function (response) {
        Notification.display('New project created.');
        $scope.projectList.push(response);
        $scope.project = {};
        $scope.showAddProject = false;
      });
    };
  }
]);
angular.module('employeeApp').controller('ProjectDetailsCtrl', [
  '$scope',
  'Project',
  '$routeParams',
  'Room',
  'Notification',
  'FileUploader',
  function ($scope, Project, $routeParams, Room, Notification, FileUploader) {
    $scope.showAddRoom = false;
    $scope.flag = false;
    $scope.project = Project.get({ id: $routeParams.id });
    $scope.room = {};
    $scope.addImage = function (image) {
      var promise = FileUploader.upload(image, 'project/room/image');
      promise.then(function (response) {
        $scope.room.image = response;
        $scope.cropper.reset();
      });
    };
    $scope.addSchematic = function (files) {
      var file = angular.isArray(files) ? files[0] : files;
      var promise = FileUploader.upload(file, 'project/room/schematic');
      promise.then(function (response) {
        $scope.room.schematic = response;
      });
    };
    $scope.addRoom = function () {
      Notification.display('Adding ' + $scope.room.type, false);
      var room = new Room();
      angular.extend(room, $scope.room);
      room.project = { id: $scope.project.id };
      room.$save(function (response) {
        Notification.display($scope.room.description + ' added.');
        $scope.showAddRoom = false;
        $scope.project.rooms.push(room);
      }, function (e) {
        $scope.flag = true;
      });
    };
  }
]);
angular.module('employeeApp.services').factory('Project', [
  'eaResource',
  function (eaResource) {
    return eaResource('project/:id', { id: '@id' });
  }
]);
angular.module('employeeApp.services').factory('Room', [
  'eaResource',
  function (eaResource) {
    return eaResource('project/room/:id', { id: '@id' });
  }
]);
angular.module('employeeApp.directives').directive('checkmark', [function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        if (!attrs.checkmark) {
          throw new TypeError('Missing expression to evaluate.');
        }
        var check = angular.element('<span class="checkmark">\u2713</span>');
        scope.$watch(attrs.checkmark, function (val) {
          if (val) {
            element.append(check);
          } else {
            check.remove();
          }
        });
      }
    };
  }]);
angular.module('employeeApp.directives').directive('x', [function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        if (!attrs.x) {
          throw new TypeError('Missing expression to evaluate.');
        }
        var x = angular.element('<span class="x-mark">\ud800\udd02</span>');
        scope.$watch(attrs.x, function (val) {
          if (val) {
            element.append(x);
          } else {
            x.remove();
          }
        });
      }
    };
  }]);
angular.module('employeeApp').controller('HrEmployeeViewCtrl', [
  '$scope',
  'User',
  function ($scope, User) {
    $scope.employeeList = User.query();
  }
]);
angular.module('employeeApp').factory('ProjectItem', [
  'eaResource',
  function (eaResource) {
    return eaResource('project/item/:id', { id: '@id' });
  }
]);
angular.module('employeeApp').directive('productSelector', [
  'Upholstery',
  'Fabric',
  'Table',
  '$rootScope',
  'Notification',
  'FileUploader',
  function (Upholstery, Fabric, Table, $rootScope, Notification, FileUploader) {
    return {
      templateUrl: 'views/templates/product-selector.html',
      replace: true,
      restrict: 'A',
      scope: {
        visible: '=productSelector',
        url: '@productSelectorUploadUrl',
        add: '&productSelectorAdd'
      },
      link: function postLink(scope, element, attrs) {
        scope.fabricList = Fabric.query();
        scope.tableList = Table.query();
        scope.product = {};
        function uploadImage(image, callback) {
          //Display Notification
          Notification.display('Uploading image...', false);
          //Set the upload Target
          //Get new image and add to form data
          //var fd = new FormData();
          //fd.append('image', image);
          var promise = FileUploader.upload(image, scope.url || 'upload/images');
          promise.then(function (response) {
            Notification.display('Image Uploaded');
            (callback || angular.noop)(response.data);
          }, function () {
            Notification.display('Failed to upload image.');
          });  /*//Upload the image
                    jQuery.ajax(scope.url || "upload/images", {
						type:'POST',
						data:fd,
						processData:false,
						contentType:false,
						success: function(response){
							Notification.display('Image Uploaded');
							(callback || angular.noop)(response);
						}
					});
					*/
        }
        function add() {
          var newProduct = angular.copy(scope.product);
          scope.add({ product: newProduct });
        }
        scope.addImage = function (data) {
          var image = data.hasOwnProperty('data') ? data.data : data;
          scope.product.image = image;
        };
        scope.addUpholstery = function (upholstery) {
          if (upholstery) {
            scope.product = upholstery;
            scope.selection = 'quantity';
          } else {
            throw new TypeError('Expecting an Upholstery.');
          }
        };
        scope.addTable = function (table) {
          if (table) {
            scope.product = table;
            scope.selection = 'quantity';
          } else {
            throw new TypeError('Expecting a Table.');
          }
        };
        scope.addCustomItem = function (item, image) {
          if (item) {
            /*
                        var promise = FileUploader.upload(image, scope.url);
                        promise.then(function(response){
                            
                            angular.copy(response, scope.product.image);
                                            
                            
                        });*/
            angular.extend(scope.product, item);
            scope.product.is_custom = true;
            scope.product.type = 'custom';
            scope.selection = 'quantity';
          } else {
            throw new TypeError('Expecting a Custom Item and Image.');
          }
        };
        scope.setQuantity = function (quantity) {
          scope.product.quantity = quantity;
          if (scope.product.type.toLowerCase() == 'upholstery') {
            scope.selection = 'fabric';
          } else {
            scope.visible = false;
            var newProduct = angular.copy(scope.product);
            scope.reset();
            scope.add({ product: newProduct });
          }
        };
        scope.setFabric = function () {
          scope.visible = false;
          var newProduct = angular.copy(scope.product);
          scope.reset();
          scope.add({ product: newProduct });
        };
        scope.reset = function () {
          scope.product = {};
          scope.selection = 'upholstery';
        };
      }
    };
  }
]);
angular.module('employeeApp').directive('fileHandler', [
  '$rootScope',
  function ($rootScope) {
    return {
      template: '<div class="file-handler">                        <div class="file-handler-message" ng-hide="files.length>0">                            <h3>Drop File Here</h3>                        </div>                        <div class="file-handler-list">                            <ul>                                <li ng-repeat="file in files">{{file.name}}</li>                            </ul>                        </div>                   </div>',
      restrict: 'A',
      scope: { files: '=fileHandler' },
      replace: true,
      link: function postLink(scope, element, attrs) {
        var reader = new FileReader();
        //Drag Enter
        element.bind('dragenter', function (evt) {
          evt.preventDefault();
          element.addClass('drag-drop-active');
          element.addClass('drag-over');
        });
        //Drag Leave
        element.bind('dragleave', function (evt) {
          evt.preventDefault();
          element.removeClass('drag-drop-active');
          element.removeClass('drag-over');
        });
        //Drag over
        element.bind('dragover', function (evt) {
          evt.preventDefault();
          element.addClass('drag-drop-active');
          element.addClass('drag-over');
        });
        element.bind('drop', function (evt) {
          evt.preventDefault();
          evt.stopPropagation();
          element.removeClass('drag-drop-active');
          element.removeClass('drag-over');
          //Get original evt within jquery evt
          var e = evt.originalEvent;
          //Get the files
          var files = e.dataTransfer.files;
          scope.files = files;
        });
      }
    };
  }
]);
angular.module('employeeApp').controller('ProjectRoomDetailsCtrl', [
  '$scope',
  'Room',
  '$routeParams',
  'ProjectItem',
  'Notification',
  function ($scope, Room, $routeParams, ProjectItem, Notification) {
    $scope.room = Room.get({ id: $routeParams.id });
    $scope.gridOptions = {
      data: 'room.items',
      columnDefs: [
        {
          field: 'description',
          displayName: 'Description'
        },
        {
          field: 'status',
          displayName: 'Status'
        },
        {
          field: 'delivery_date',
          displayName: 'Delivery Date',
          filter: 'date:"MMMM d, yyyy"'
        },
        {
          field: 'schematic',
          displayName: 'Schematic',
          cellTemplate: '<div file-handler><div>'
        }
      ]
    };
    $scope.addProduct = function (product) {
      //Notification of product add to which room
      Notification.display('Adding ' + product.description + ' to ' + $scope.room.description, false);
      //Create item and set details
      var item = new ProjectItem();
      item.product = product;
      item.type = 'product';
      item.room = { id: $scope.room.id };
      item.reference = $scope.room.reference + ($scope.room.items.length + 1);
      //Save the Item to the server
      item.$save(function () {
        Notification.display(item.description + ' added to ' + $scope.room.description);
        //Add item to current room on display
        $scope.room.items.push(item);
      });
    };
  }
]);
angular.module('employeeApp').factory('s3', [function () {
    // Service logic
    // ...
    var meaningOfLife = 42;
    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  }]);
angular.module('employeeApp').factory('FileUploader', [
  '$q',
  '$http',
  'Notification',
  function ($q, $http, Notification) {
    var uploader = {}, type, fd;
    uploader.upload = function (file, url, data) {
      //if(!file.isPrototypeOf){
      //throw new TypeError("Expectina a file");
      //}
      //Determine file type and data
      try {
        type = file.type.split('/')[0];
      } catch (e) {
      }
      type = file.isPrototypeOf(Image) || type === 'image' ? 'Image' : 'File';
      var fd = new FormData();
      //fd = data.isPrototypeOf(FormData) ? data : new FormData();
      Notification.display('Uploading ' + type + '...', false);
      //Attch the file to be sent
      fd.append(type.toLowerCase(), file);
      //Add additional data to the form data
      try {
        for (var i in data) {
          fd.append(i, data[i]);
        }
      } catch (e) {
      }
      /*
         * We use the angular $http module to send the image
         * 
         * We have to set the content type to undefined so that 
         * it is not automatically 'application/json'
         * 
         * We set the transformRequest to angular.identity so that
         * the data is not serialized
         */
      var promise = $http({
          method: 'POST',
          url: url || 'upload/images',
          data: fd,
          headers: { 'Content-Type': undefined },
          transformRequest: angular.identity
        });
      /*
		promise.success(function(data, status, headers, config) {

		}).error(function (response) {
			Notification.display("There was an error in uploading the "+type.toLowerCase(), false);
		});
		*/
      return promise;
    };
    return uploader;
  }
]);
angular.module('employeeApp').filter('available', [function () {
    return function (input) {
      return 'available filter: ' + input;
    };
  }]);
angular.module('employeeApp').controller('SupplyViewCtrl', [
  '$scope',
  'Supply',
  'Notification',
  '$filter',
  'KeyboardNavigation',
  '$rootScope',
  '$location',
  '$http',
  function ($scope, Supply, Notification, $filter, KeyboardNavigation, $rootScope, $location, $http) {
    /*
	* Vars and flags
	*/
    var fetching = true, index = 0, currentSelection;
    //system message
    Notification.display('Loading supplies...', false);
    $http.get('/api/v1/supply/type').success(function (response) {
      $scope.types = response;
      $scope.types.splice($scope.types.indexOf(null), 1);
    });
    $scope.scannerMode = false;
    $scope.supplies = Supply.query({ 'country': $scope.country }, function () {
      fetching = false;
      Notification.hide();
      changeSelection(index);
    });
    /*
	* Search mechanism
	* 
	* This function will send a GET request to the server
	* whenever the query string changes and that string will 
	* be sent along as a parameter. 
	*/
    $scope.$watch('query', function (q) {
      if (q) {
        Supply.query({
          limit: 10,
          q: q,
          'country': $scope.country
        }, function (resources) {
          for (var i = 0; i < resources.length; i++) {
            if ($scope.supplies.indexOfById(resources[i].id) == -1) {
              $scope.supplies.push(resources[i]);
            }
          }
          index = 0;
          changeSelection(index);
        });
      }
    });
    /*
	* Load more supplies
	* 
	* This function will load more supplies from the server
	* be using the current number of supplies as the offset
	*/
    $scope.loadNext = function () {
      if (!fetching) {
        Notification.display('Loading more supplies...', false);
        Supply.query({
          offset: $scope.supplies.length,
          limit: 50,
          country: $scope.country
        }, function (resources) {
          Notification.hide();
          for (var i = 0; i < resources.length; i++) {
            if ($scope.supplies.indexOfById(resources[i].id) == -1) {
              $scope.supplies.push(resources[i]);
            }
          }
        });
      }
    };
    function filter(array) {
      array = $filter('filter')(array, $scope.search);
      array = $filter('filter')(array, $scope.query);
      array = $filter('orderBy')(array, 'description');
      return array;
    }
    function changeSelection(i) {
      $rootScope.safeApply(function () {
        if (currentSelection) {
          currentSelection.$selected = false;
        }
        currentSelection = filter($scope.supplies)[i];
        if (currentSelection) {
          currentSelection.$selected = true;
        }
      });
      var selection = $('.item.selected');
      var container = selection.parents('.outer-container');
      var scrollTop = container.scrollTop();
      var cHeight = container.innerHeight();
      if (scrollTop > selection.outerHeight() * i) {
        container.scrollTop(selection.outerHeight() * i);
      } else if (scrollTop + cHeight < selection.outerHeight() * i) {
        container.scrollTop(selection.outerHeight() * i);
      }
    }
    var keyboardNav = new KeyboardNavigation();
    keyboardNav.ondown = function () {
      if (index < filter($scope.supplies).length - 1) {
        index += 1;
        changeSelection(index);
      }
    };
    keyboardNav.onup = function () {
      if (index !== 0) {
        index -= 1;
        changeSelection(index);
      }
    };
    keyboardNav.onenter = function () {
      $rootScope.safeApply(function () {
        $location.path('/supply/' + currentSelection.id);
      });
    };
    keyboardNav.enable();
    /*
	 * When adding suppliers or supply
	 * disable the keyboard navigation
	 */
    $scope.$watch('showAddSupply', function (val, oldVal) {
      if (val && !oldVal) {
        keyboardNav.disable();
      } else if (!val && oldVal) {
        keyboardNav.enable();
      }
    });
    $scope.$watch('showAddSupplier', function (val, oldVal) {
      if (val && !oldVal) {
        keyboardNav.disable();
      } else if (!val && oldVal) {
        keyboardNav.enable();
      }
    });
    $scope.$watch('scannerMode', function (val, oldVal) {
      if (val && !oldVal) {
        globalScanner.disable();
        keyboardNav.disable();
      } else if (!val && oldVal) {
        globalScanner.enable();
        keyboardNav.enable();
      }
    });
    $scope.$on('$destroy', function () {
      keyboardNav.disable();
    });
  }
]);
angular.module('employeeApp').controller('OrderPurchaseOrderViewCtrl', [
  '$scope',
  'PurchaseOrder',
  '$filter',
  'Notification',
  'KeyboardNavigation',
  '$location',
  function ($scope, PurchaseOrder, $filter, Notification, KeyboardNavigation, $location) {
    //Flags and variables
    var fetching = true, index = 0, currentSelection;
    //System wide message
    Notification.display('Loading purchase orders...', false);
    //Poll Server for pos
    $scope.poList = PurchaseOrder.query(function () {
      fetching = false;
      Notification.hide();
      changeSelection(index);
    }, function () {
      fetching = false;
    });
    /*
	 * Search Mechanism
	 * 
	 * a wartch is put on the query model. 
	 * whenever it changes a request is made to the server 
	 * with the query
	 * 
	 * The resources are then integrated with the list of 
	 * PO's so that there are no duplicates
	 */
    $scope.$watch('query', function (q) {
      if (q) {
        PurchaseOrder.query({
          limit: 5,
          q: q
        }, function (resources) {
          for (var i = 0; i < resources.length; i++) {
            if ($scope.poList.indexOfById(resources[i].id) == -1) {
              $scope.poList.push(resources[i]);
            }
          }
          index = 0;
          changeSelection(index);
        });
      }
    });
    $scope.loadNext = function () {
      if (!fetching) {
        fetching = true;
        PurchaseOrder.query({
          limit: 20,
          offset: $scope.poList.length
        }, function (resources) {
          fetching = false;
          for (var i = 0; i < resources.length; i++) {
            $scope.poList.push(resources[i]);
          }
        });
      }
    };
    function filter(array) {
      return $filter('filter')(array, $scope.query);
    }
    function changeSelection(i) {
      $scope.safeApply(function () {
        if (currentSelection) {
          currentSelection.$selected = false;
        }
        currentSelection = filter($scope.poList)[i];
        if (currentSelection) {
          currentSelection.$selected = true;
        }
      });
      var selection = $('.item.selected');
      var container = selection.parents('.outer-container');
      var scrollTop = container.scrollTop();
      var cHeight = container.innerHeight();
      if (scrollTop > selection.outerHeight() * i) {
        container.scrollTop(selection.outerHeight() * i);
      } else if (scrollTop + cHeight < selection.outerHeight() * i) {
        container.scrollTop(selection.outerHeight() * i);
      }
    }
    var keyboardNav = new KeyboardNavigation();
    keyboardNav.ondown = function () {
      if (index < filter($scope.poList).length - 1) {
        index += 1;
        changeSelection(index);
      }
    };
    keyboardNav.onup = function () {
      if (index !== 0) {
        index -= 1;
        changeSelection(index);
      }
    };
    keyboardNav.onenter = function () {
      $scope.safeApply(function () {
        $location.path('/order/purchase_order/' + currentSelection.id);
      });
    };
    keyboardNav.enable();
    $scope.$on('$destroy', function () {
      keyboardNav.disable();
    });
  }
]);
angular.module('employeeApp').factory('PurchaseOrder', [
  '$resource',
  function ($resource) {
    return $resource('/api/v1/purchase-order/:id', { id: '@id' }, {
      create: { method: 'POST' },
      update: { method: 'PUT' }
    });
  }
]);
angular.module('employeeApp').controller('OrderPurchaseOrderCreateCtrl', [
  '$scope',
  'PurchaseOrder',
  'Supplier',
  'Supply',
  'Notification',
  '$filter',
  '$timeout',
  function ($scope, PurchaseOrder, Supplier, Supply, Notification, $filter, $timeout) {
    /*
	 * Setup vars
	 */
    $scope.showSuppliers = false;
    $scope.showSupplies = false;
    $scope.suppliers = Supplier.query({ limit: 0 });
    $scope.po = new PurchaseOrder();
    $scope.po.items = [];
    /*
	 * Add a supplier to the purchase order
	 */
    $scope.addSupplier = function (supplier) {
      //Hide Modal
      $scope.showSuppliers = false;
      $scope.po.supplier = supplier;
      $scope.supplies = $filter('filter')(Supply.query({ supplier_id: supplier.id }, function (response) {
        $scope.supplies = $filter('filter')(response, supplier.name);
      }), supplier.name);
    };
    /*
	 * Add an item to the purchase order
	 */
    $scope.addItem = function (item) {
      //Hide Modal
      $scope.showSupplies = false;
      var purchasedItem = angular.copy(item);
      delete purchasedItem.quantity;
      $scope.po.items.push(purchasedItem);
    };
    /*
	 * Remove an item fro the purchase order
	 */
    $scope.removeItem = function (index) {
      $scope.po.items.splice(index, 1);
    };
    /*
	 * Watch Items for change
	 * 
	 * We initially tests that the lengths are the same, 
	 * in order to eliminate add and subtracting items.
	 * 
	 * We then loop through all the items and find the item
	 * that has changed, and then we compare the costs and the id
	 * to ensure the the same item has change. The costs is saved, 
	 * and a reference object is made.
	 * 
	 * After a delay of 5 seconds, we compare the saved costs with the
	 * current item cost, by using a reference. 
	 */
    $scope.$watch('po.items', function (newVal, oldVal) {
      //Filter out changes in length
      if (newVal.length == oldVal.length && newVal.length > 1) {
        //Loop through all the items;
        for (var i = 0; i < newVal.length; i++) {
          //Tests if the costs are different but the id is the same
          if (newVal[i].cost != oldVal[i].cost && newVal[i].id == oldVal[i].id) {
            var cost = newVal[i].cost;
            /*We make a reference to the original object, 
					 *So that we can make sure the price has settled
					 *in x milliseconds.*/
            var obj = newVal[i];
            /* jshint ignore:start */
            $timeout(function () {
              //Tests to make sure the cost has settled
              if (obj.cost == cost) {
                var supply = obj.isPrototypeOf(Supply) ? obj : new Supply(obj);
                supply.$update();
              }
            }, 5000);  /* jshint ignore:end */
          }  //if (po.items[i].cost == newVal[i].cost)
        }
      }
    }, true);
    /*
	 * Calculate the subtotal
	 */
    $scope.subtotal = function () {
      var subtotal = 0;
      for (var i = 0; i < $scope.po.items.length; i++) {
        subtotal += Number($scope.po.items[i].override_cost ? $scope.po.items[i].override_cost_amount : $scope.po.items[i].cost) * Number($scope.po.items[i].quantity || 1);
      }
      return Number(subtotal.toFixed(2));
    };
    $scope.supplierDiscount = function () {
      var subtotal = Number($scope.subtotal());
      //Calcuate the subtotal with the supplies's discount
      return ($scope.po.supplier && $scope.po.supplier.discount || 0) / 100 * subtotal;
    };
    $scope.discount = function () {
      var subtotal = Number($scope.subtotal()) - Number($scope.supplierDiscount());
      return ($scope.po.discount || 0) / 100 * subtotal;
    };
    /*
	 * Calculate the total
	 */
    $scope.total = function () {
      var subtotal = Number($scope.subtotal());
      //Calcuate the subtotal with the supplies's discount
      subtotal = subtotal - ($scope.po.supplier && $scope.po.supplier.discount || 0) / 100 * subtotal;
      //Calculate the subtotal with the order's discount
      subtotal = subtotal - ($scope.po.discount || 0) / 100 * subtotal;
      //Calculate vat
      var vat = subtotal * (Number($scope.po.vat || 0) / 100);
      //Return subtotal + vat
      return vat + subtotal;
    };
    /*
	 * Verfication of order
	 */
    $scope.verifyOrder = function () {
      if (!$scope.po.hasOwnProperty('supplier')) {
        throw new Error('Please select a supplier');
      }
      if ($scope.po.items.length <= 0) {
        throw new Error('Please add items to the purchase order');
      }
      for (var i = 0; i < $scope.po.items.length; i++) {
        if (!$scope.po.items[i].quantity || $scope.po.items[i].quantity <= 0) {
          throw new Error($scope.po.items[i].description + ' is missing a quantity');
        }
      }
      return true;
    };
    /*
	 * Save the purchase order to the server
	 */
    $scope.save = function () {
      try {
        if ($scope.verifyOrder()) {
          Notification.display('Creating purchase order...', false);
          $scope.po.$save(function (response) {
            try {
              window.open(response.pdf.url);
            } catch (e) {
              console.warn(e);
            }
            Notification.display('Purchase order created.');
          }, function (e) {
            Notification.display('There was an error in creating the purchase order.');
          });
        }
      } catch (e) {
        Notification.display(e.message);
      }
    };
    /*
	 * Reset the order
	 */
    $scope.reset = function () {
      $scope.po = new PurchaseOrder();
      $scope.po.items = [];
    };
  }
]);
angular.module('employeeApp.directives').directive('addSupply', [
  '$rootScope',
  'Supplier',
  'Supply',
  'Notification',
  '$http',
  function ($rootScope, Supplier, Supply, Notification, $http) {
    return {
      templateUrl: 'views/templates/add-supply.html',
      replace: true,
      restrict: 'EA',
      scope: { 'visible': '=addSupply' },
      link: function postLink(scope, element, attrs) {
        scope.showWidth = function () {
          var units = scope.supply.units;
          var type = scope.supply.type;
          return scope.supply.new_supply ? units === 'm' || units === 'pc' || units === 'pack' || units === 'yd' || units === 'kg' && type === 'packaging' ? true : false : false;
        };
        scope.showDepth = function () {
          var units = scope.supply.units;
          return scope.supply.new_supply ? units === 'pc' || units === 'pack' ? true : false : false;
        };
        scope.showHeight = function () {
          var units = scope.supply.units;
          var type = scope.supply.type;
          return scope.supply.new_supply ? units === 'pc' || units === 'pack' || units === 'kg' && type === 'packaging' ? true : false : false;
        };
        scope.supply = new Supply();
        scope.supply.units = 'pc';
        scope.suppliers = Supplier.query({ limit: 0 });
        scope.supplies = Supply.query({ limit: 0 });
        scope.changeSupply = function (supply) {
          angular.extend(scope.supply, supply);
        };
        scope.add = function () {
          if (scope.form.$valid) {
            Notification.display('Creating supply...', false);
            //Moves the supply and adds the the supplier array
            scope.supply.suppliers = scope.supply.suppliers || [];
            if (scope.supply.suppliers.indexOfById(scope.supply.supplier)) {
              scope.supply.suppliers.push(scope.supply.supplier);
            }
            delete scope.supply.supplier;
            //Decides whether to update or create based on presence of id
            if (scope.supply.hasOwnProperty('id')) {
              scope.supply.$update(function (response) {
                scope.visible = false;
                scope.supply = new Supply();
              }, function (reason) {
                console.error(reason);
              });
            } else {
              scope.supply.$create(function (response) {
                Notification.display('Supply created');
                scope.visible = false;
                scope.supply = new Supply();
              }, function (reason) {
                console.error(reason);
                Notification.display('There was an error in creating the supply', false);
              });
            }
          } else {
            Notification.display('Please fill out the form properly');
          }
        };
        scope.addImage = function (data) {
          console.log(data);
          scope.supply.image = data;
        };
      }
    };
  }
]);
angular.module('employeeApp.directives').directive('addSupplier', [
  '$rootScope',
  'Supplier',
  'Notification',
  function ($rootScope, Supplier, Notification) {
    return {
      templateUrl: 'views/templates/add-supplier.html',
      replace: true,
      restrict: 'EA',
      scope: { 'visible': '=addSupplier' },
      link: function postLink(scope, element, attrs) {
        scope.supplier = new Supplier();
        scope.contact = {};
        /*
			 * Tips for the form
			 * 
			 * A list of tooltip texts for help the user navigate the form
			 */
        scope.nameTip = 'What is the supplier\'s name (required)';
        scope.thaiNameTip = 'Enter the supplier\'s name in Thai';
        scope.emailTip = 'Enter a valid email address (required)';
        scope.telTip = 'Enter a valid phone number (required)';
        scope.currencyTip = 'What currency does this supplier deal in? (required)';
        scope.discountTip = 'What discount do we get? (required)';
        scope.termsTip = 'How many days of credit do we get? (required)';
        scope.addrTip = 'What is the supplier\'s address (required)';
        scope.cityTip = 'What city is the supplier in? (required)';
        scope.territoryTip = 'What chaengwat/territory/state is the supplier in? (required)';
        scope.countryTip = 'What country is the supplier in? (requied)';
        scope.zipcodeTip = 'What zipcode is the supplier in? (required)';
        scope.addContact = function (contact) {
          scope.supplier.contacts = scope.supplier.contacts || [];
          if (scope.supplier.contacts.length === 0) {
            contact = contact || scope.contact;
            contact.primary = true;
          }
          scope.supplier.contacts.push(contact);
          scope.contact = {};
        };
        scope.validation = function () {
          var primary = [];
          for (var i = 0; i < (scope.supplier.contacts && scope.supplier.contacts.length); i++) {
            if (scope.supplier.contacts[i].primary) {
              primary.append(scope.supplier.contacts[i]);
            }
          }
          if (primary.length != 1) {
            throw ValueError('There can only be 1 primary contact');
          }
        };
        scope.add = function () {
          try {
            if (scope.form.$valid) {
              Notification.display('Creating supplier...', false);
              scope.supplier.$save(function (response) {
                Notification.display('Supplier created');
                scope.visible = false;
                scope.supplier = new Supplier();
              }, function (reason) {
                console.error(reason);
                Notification.display('There was an error in creating the supplier', false);
              });
            } else {
              Notification.display('Please fill out the form properly');
            }
          } catch (e) {
            Notification.display(e);
          }
        };
      }
    };
  }
]);
angular.module('employeeApp').factory('inventory', [function () {
    // Service logic
    // ...
    var meaningOfLife = 42;
    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  }]);
angular.module('employeeApp').directive('onScrollEnd', [function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        element.bind('scroll', function (e) {
          var childHeight = $(element.children()[0]).height();
          var elHeight = element.height();
          if (childHeight >= elHeight) {
            if (element.scrollTop() + elHeight >= childHeight - 10) {
              try {
                scope.$eval(attrs.onScrollEnd);
              } catch (err) {
                console.error('Missing a function for \'on-scroll-end\'');
              }
            }
          }
        });
      }
    };
  }]);
angular.module('employeeApp').directive('customerList', [
  'Customer',
  'Notification',
  'KeyboardNavigation',
  '$rootScope',
  '$filter',
  function (Customer, Notification, KeyboardNavigation, $rootScope, $filter) {
    return {
      templateUrl: 'views/templates/customer-list.html',
      replace: true,
      restrict: 'A',
      scope: {
        visible: '=customerList',
        onSelect: '&'
      },
      link: function postLink(scope, element, attrs) {
        var fetching = true, currentSelection, index = 0;
        /*
			* Initial fetching of the customers.
			* 
			* We will turn the fetching flag to false
			* once we received the results
			*/
        scope.customers = Customer.query({ limit: 20 }, function (response) {
          fetching = false;
          changeSelection(index);
        });
        /*
			 * Search
			 */
        scope.$watch('query', function (q) {
          if (q) {
            Customer.query({
              q: q,
              limit: 5
            }, function (resources) {
              for (var i = 0; i < resources.length; i++) {
                if (scope.customers.indexOfById(resources[i].id) == -1) {
                  scope.customers.push(resources[i]);
                }
              }
              index = 0;
              changeSelection(index);
            });
          }
        });
        /*
			 * Loads the next set of customers if there is no fetching
			 * currently running
			 */
        scope.loadNext = function () {
          if (!fetching) {
            Notification.display('Loading more customers...', false);
            fetching = true;
            Customer.query({
              offset: scope.customers.length,
              limit: 50
            }, function (resources) {
              fetching = false;
              Notification.hide();
              for (var i = 0; i < resources.length; i++) {
                scope.customers.push(resources[i]);
              }
            });
          }
        };
        /*
			 * The function to run when a customer is selected
			 */
        scope.select = function (customer) {
          scope.onSelect({ 'customer': customer });
        };
        function filter(array) {
          return $filter('orderBy')($filter('filter')(scope.customers, scope.query), 'name');
        }
        function changeSelection(i) {
          $rootScope.safeApply(function () {
            if (currentSelection) {
              currentSelection.$selected = false;
            }
            currentSelection = filter(scope.customers)[i];
            if (currentSelection) {
              currentSelection.$selected = true;
            }
          });
          var selection = $('.customer.selected');
          var container = selection.parents('.inner-container');
          var scrollTop = container.scrollTop();
          var cHeight = container.innerHeight();
          if (scrollTop > selection.outerHeight() * i) {
            container.scrollTop(selection.outerHeight() * i);
          } else if (scrollTop + cHeight < selection.outerHeight() * i) {
            container.scrollTop(selection.outerHeight() * i);
          }
        }
        var keyboardNav = new KeyboardNavigation();
        keyboardNav.ondown = function () {
          if (index < filter(scope.customers).length - 1) {
            index += 1;
            changeSelection(index);
          }
        };
        keyboardNav.onup = function () {
          if (index !== 0) {
            index -= 1;
            changeSelection(index);
          }
        };
        keyboardNav.onenter = function () {
          $rootScope.safeApply(function () {
            scope.select(currentSelection);
          });
        };
        scope.$watch('visible', function (val) {
          if (val) {
            keyboardNav.enable();
          } else {
            keyboardNav.disable();
          }
        });
        scope.$on('$destroy', function () {
          keyboardNav.disable();
        });
      }
    };
  }
]);
angular.module('employeeApp').directive('upholsteryList', [
  'Upholstery',
  'Notification',
  '$filter',
  'KeyboardNavigation',
  '$rootScope',
  function (Upholstery, Notification, $filter, KeyboardNavigation, $rootScope) {
    return {
      templateUrl: 'views/templates/upholstery-list.html',
      replace: true,
      restrict: 'A',
      scope: {
        onSelect: '&',
        safeApply: '&',
        visible: '='
      },
      link: function postLink(scope, element, attrs) {
        var fetching = true, currentSelection, index = 0;
        /*
             * Initial fetching of the customers.
             * 
             * We will turn the fetching flag to false
             * once we received the results
             */
        scope.upholsteries = Upholstery.query({ limit: 20 }, function (response) {
          fetching = false;
          changeSelection(index);
        });
        /*
			* Search
			*/
        scope.$watch('query', function (q) {
          if (q) {
            scope.currentIndex = 0;
            Upholstery.query({
              q: q,
              limit: 10 + scope.query.length * 2
            }, function (resources) {
              for (var i = 0; i < resources.length; i++) {
                if (scope.upholsteries.indexOfById(resources[i].id) == -1) {
                  scope.upholsteries.push(resources[i]);
                }
              }
              index = 0;
              changeSelection(index);
            });
          }
        });
        /*
			* Loads the next set of customers if there is no fetching
			* currently running
			*/
        scope.loadNext = function () {
          if (!fetching) {
            Notification.display('Loading more upholsteries...', false);
            fetching = true;
            Upholstery.query({
              offset: scope.upholsteries.length,
              limit: 50
            }, function (resources) {
              fetching = false;
              Notification.hide();
              for (var i = 0; i < resources.length; i++) {
                scope.upholsteries.push(resources[i]);
              }
            });
          }
        };
        function changeSelection(i) {
          $rootScope.safeApply(function () {
            if (currentSelection) {
              currentSelection.$selected = false;
            }
            currentSelection = $filter('filter')(scope.upholsteries, scope.query)[i];
            if (currentSelection) {
              currentSelection.$selected = true;
            }
          });
          var selection = $('.upholstery.selected');
          var container = selection.parents('.inner-container');
          var scrollTop = container.scrollTop();
          var cHeight = container.innerHeight();
          if (scrollTop > selection.outerHeight() * i) {
            container.scrollTop(selection.outerHeight() * i);
          } else if (scrollTop + cHeight < selection.outerHeight() * i) {
            container.scrollTop(selection.outerHeight() * i);
          }
        }
        scope.select = function (upholstery) {
          scope.onSelect({ $upholstery: upholstery });
        };
        var keyboardNav = new KeyboardNavigation();
        keyboardNav.ondown = function () {
          if (index < $filter('filter')(scope.upholsteries, scope.query).length - 1) {
            index += 1;
            changeSelection(index);
          }
        };
        keyboardNav.onup = function () {
          if (index !== 0) {
            index -= 1;
            changeSelection(index);
          }
        };
        keyboardNav.onenter = function () {
          $rootScope.safeApply(function () {
            scope.select(currentSelection);
          });
        };
        scope.$watch('visible', function (val) {
          if (val) {
            keyboardNav.enable();
          } else {
            keyboardNav.disable();
          }
        });
        scope.$on('$destroy', function () {
          keyboardNav.disable();
        });
      }
    };
  }
]);
angular.module('employeeApp').directive('tableList', [
  'Table',
  'Notification',
  'KeyboardNavigation',
  '$rootScope',
  '$filter',
  function (Table, Notification, KeyboardNavigation, $rootScope, $filter) {
    return {
      templateUrl: 'views/templates/table-list.html',
      replace: true,
      restrict: 'A',
      scope: {
        onSelect: '&',
        visible: '='
      },
      link: function postLink(scope, element, attrs) {
        var fetching = true, currentSelection, index = 0;
        /*
             * Initial fetching of the customers.
             * 
             * We will turn the fetching flag to false
             * once we received the results
             */
        scope.tables = Table.query({ limit: 20 }, function (response) {
          fetching = false;
          changeSelection(index);
        });
        /*
			 * Search
			 */
        scope.$watch('query', function (q) {
          if (q) {
            Table.query({
              q: q,
              limit: 10
            }, function (resources) {
              for (var i = 0; i < resources.length; i++) {
                if (scope.tables.indexOfById(resources[i].id) == -1) {
                  scope.tables.push(resources[i]);
                }
              }
              index = 0;
              changeSelection(index);
            });
          }
        });
        /*
			* Loads the next set of customers if there is no fetching
			* currently running
			*/
        scope.loadNext = function () {
          if (!fetching) {
            Notification.display('Loading more tables...', false);
            fetching = true;
            Table.query({
              offset: scope.tables.length,
              limit: 50
            }, function (resources) {
              fetching = false;
              Notification.hide();
              for (var i = 0; i < resources.length; i++) {
                scope.tables.push(resources[i]);
              }
              if (resources.length === 0) {
                fetching = true;
              }
            });
          }
        };
        scope.select = function (table) {
          scope.onSelect({ $table: table });
        };
        function changeSelection(i) {
          $rootScope.safeApply(function () {
            if (currentSelection) {
              currentSelection.$selected = false;
            }
            currentSelection = $filter('filter')(scope.tables, scope.query)[i];
            if (currentSelection) {
              currentSelection.$selected = true;
            }
          });
          var selection = $('.table.selected');
          var container = selection.parents('.inner-container');
          var scrollTop = container.scrollTop();
          var cHeight = container.innerHeight();
          if (scrollTop > selection.outerHeight() * i) {
            container.scrollTop(selection.outerHeight() * i);
          } else if (scrollTop + cHeight < selection.outerHeight() * i) {
            container.scrollTop(selection.outerHeight() * i);
          }
        }
        scope.select = function (table) {
          scope.onSelect({ $table: table });
        };
        var keyboardNav = new KeyboardNavigation();
        keyboardNav.ondown = function () {
          if (index < $filter('filter')(scope.tables, scope.query).length - 1) {
            index += 1;
            changeSelection(index);
          }
        };
        keyboardNav.onup = function () {
          if (index !== 0) {
            index -= 1;
            changeSelection(index);
          }
        };
        keyboardNav.onenter = function () {
          $rootScope.safeApply(function () {
            scope.select(currentSelection);
          });
        };
        keyboardNav.enable();
        scope.$watch('visible', function (val) {
          console.log(val);
          if (val) {
            keyboardNav.enable();
          } else {
            keyboardNav.disable();
          }
        });
        scope.$on('$destroy', function () {
          keyboardNav.disable();
        });
      }
    };
  }
]);
angular.module('employeeApp').directive('fabricSelector', [
  'Fabric',
  'Notification',
  '$parse',
  function (Fabric, Notification, $parse) {
    return {
      templateUrl: 'views/templates/fabric-selector.html',
      replace: true,
      restrict: 'A',
      scope: {
        product: '=',
        onComplete: '&'
      },
      link: function postLink(scope, element, attrs) {
        var fetching = true;
        /*
			 * Initial fetching of the customers.
			 * 
			 * We will turn the fetching flag to false
			 * once we received the results
			 */
        scope.fabrics = Fabric.query(function (response) {
          fetching = false;
        });
        /*
			 * Search
			 */
        scope.$watch('query', function (q) {
          if (q) {
            Fabric.query({
              q: q,
              limit: 5
            }, function (resources) {
              for (var i = 0; i < resources.length; i++) {
                if (scope.fabrics.indexOfById(resources[i].id) == -1) {
                  scope.fabrics.push(resources[i]);
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
            Notification.display('Loading more fabrics...', false);
            fetching = true;
            Fabric.query({
              offset: scope.fabrics.length,
              limit: 50
            }, function (resources) {
              fetching = false;
              Notification.hide();
              for (var i = 0; i < resources.length; i++) {
                scope.fabrics.push(resources[i]);
              }
            });
          }
        };
        /*
			 * The function to run when a customer is selected
			 */
        scope.done = function () {
          scope.onComplete();
        };
        function parseKeydown(evt) {
          if (evt.which === 13) {
            scope.$apply(function () {
              scope.done();
            });
          }
        }
        $(window).on('keydown', parseKeydown);
        scope.$on('$destroy', function () {
          $(window).off('keydown', parseKeydown);
        });
      }
    };
  }
]);
angular.module('employeeApp').controller('OrderPurchaseOrderDetailsCtrl', [
  '$scope',
  '$routeParams',
  'PurchaseOrder',
  'Notification',
  '$location',
  function ($scope, $routeParams, PurchaseOrder, Notification, $location) {
    Notification.display('Loading purchase order ' + $routeParams.id + '...', false);
    $scope.po = PurchaseOrder.get({
      id: $routeParams.id,
      pdf: true
    }, function () {
      Notification.hide();
    });
    $scope.update = function () {
      Notification.display('Saving changes to Purchase Order for ' + $scope.po.id, false);
      $scope.po.$update(function () {
        Notification.display('Changes to Purchase Order ' + $scope.po.id + ' saved.');
        window.open($scope.po.pdf.url);
      }, function (e) {
        console.error(e);
      });
    };
    /*
	 * Adds a new Item to the Purchase Order. However
	 * this does not save it to the database on the server
	 * side. The update function must be called in addition
	 * to adding the item
	 */
    $scope.addItem = function (item) {
      if ($scope.po.items.indexOfById(item) != -1) {
        $scope.showAddItem = false;
        $scope.po.items.push(item);
      } else {
        Notification.display('This item is already present in the purchase order');
      }
    };
    $scope.viewPDF = function () {
      window.open($scope.po.pdf.url);
    };
    $scope.order = function () {
      Notification.display('Updating purchase order...', false);
      $scope.showCal = false;
      //Modify the order
      $scope.po.status = 'Ordered';
      //Receive items
      for (var i = 0; i < $scope.po.items.length; i++) {
        $scope.po.items[i].status = 'Ordered';
      }
      $scope.po.$update(function () {
        Notification.display('Purchase order updated.');
      });
    };
    $scope.receive = function () {
      if ($scope.po.receive_date) {
        Notification.display('Updating purchase order...', false);
        $scope.showCal = false;
        //Modify the order
        $scope.po.status = 'Received';
        //Receive items
        for (var i = 0; i < $scope.po.items.length; i++) {
          $scope.po.items[i].status = 'Received';
        }
        $scope.po.$update(function () {
          Notification.display('Purchase order updated.');
        });
      } else {
        $scope.showCal = true;
      }
    };
    $scope.pay = function () {
      Notification.display('Updating purchase order...', false);
      //Modify the order
      $scope.po.status = 'Paid';
      //Pay for the items
      for (var i = 0; i < $scope.po.items.length; i++) {
        $scope.po.items[i].status = 'Paid';
      }
      $scope.po.$update(function () {
        Notification.display('Purchase order updated.');
      });
    };
    $scope.cancel = function () {
      Notification.display('Cancelling purchase order...', false);
      $scope.po.status = 'Cancelled';
      //Pay for the items
      for (var i = 0; i < $scope.po.items.length; i++) {
        $scope.po.items[i].status = 'Cancelled';
      }
      $scope.po.$update(function () {
        Notification.display('Purchase order ' + $scope.po.id + ' cancelled.');
        $location.path('order/purchase_order');
      });
    };
  }
]);
angular.module('employeeApp').controller('SupplyDetailsCtrl', [
  '$scope',
  '$routeParams',
  'Notification',
  'Supply',
  '$timeout',
  '$location',
  'scanner',
  function ($scope, $routeParams, Notification, Supply, $timeout, $location, scanner) {
    Notification.display('Retrieving supply...', false);
    /*
	 * Vars
	 */
    $scope.action = 'subtract';
    $scope.showQuantity = false;
    $scope.supply = Supply.get({
      'id': $routeParams.id,
      'country': $scope.country
    }, function () {
      Notification.hide();
      $scope.suppliers = $scope.supply.suppliers;
    });
    globalScanner.disable();
    var updateLoopActive = false, timeoutPromise;
    var validWidth = [
        'm',
        'yd',
        'pc',
        'pack',
        'container',
        'fabric'
      ];
    var validDepth = [
        'pc',
        'pack',
        'container'
      ];
    var validHeight = [
        'pack',
        'pc'
      ];
    /*
	 * Seletively show dimensions
	 */
    $scope.showWidth = function () {
      return validWidth.indexOf($scope.supply.units) > -1 || validWidth.indexOf($scope.supply.type) > -1 || $scope.supply.units == 'kg' && $scope.supply.type == 'packaging' ? true : false;
    };
    $scope.showDepth = function () {
      return validDepth.indexOf($scope.supply.units) > -1 ? true : false;
    };
    $scope.showHeight = function () {
      return validHeight.indexOf($scope.supply.units) > -1 || $scope.supply.units == 'kg' && $scope.supply.type == 'packaging' ? true : false;
    };
    $scope.addImage = function (image) {
      $scope.supply.image = image;
    };
    $scope.viewStickers = function () {
      try {
        window.open($scope.supply.sticker.url);
      } catch (e) {
        Notification.display('This supply is missing a sticker');
      }
    };
    scanner = new scanner('supply/details');
    //scanner.enable();
    scanner.disableStandard();
    scanner.register(/^\d+(\-\d+)*$/, function (code) {
      $scope.safeApply(function () {
        $scope.selectedSupplier.upc = code;
        $scope.showAddUPC = false;
      });
    });
    /*
	 * Update the supply
	 * 
	 * Sends a PUT request to the server with all the values
	 * of the entire resource. We implement this by watching the supply
	 * object. 
	 * 
	 * We utilize a custom listener function because we must delete, 
	 * all dynamically generated content from the server, such as 
	 * last_modifed, and unique url, as this will cause a loop
	 * when the updating begins
	 */
    $scope.$watch(function () {
      var supply = angular.copy($scope.supply);
      delete supply.last_modified;
      delete supply.image;
      delete supply.supplier;
      delete supply.quantity;
      return supply;
    }, function (newVal, oldVal) {
      if (!updateLoopActive && oldVal.hasOwnProperty('id')) {
        updateLoopActive = true;
        timeoutPromise = $timeout(function () {
          Notification.display('Updating ' + $scope.supply.description + '...', false);
          var supply = angular.copy($scope.supply);
          supply.$update({ 'country': $scope.country }, function () {
            updateLoopActive = false;
            Notification.display($scope.supply.description + ' updated');
          }, function () {
            Notification.display('There was an error in updating ' + $scope.supply.description);
          });
        }, 5000);
      }
    }, true);
    /*
	 * Adding a upc
	 * 
	 * Set Keyboard Navigation
	 * Detects the switch and opens the modal accordingly
	 * 
	 */
    $scope.$watch('showAddUPC', function (newVal, oldVal) {
      if (newVal) {
        scanner.enable();
      } else {
        scanner.disable();
      }
    });
    /*
	 * Add a quantity
	 * 
	 * Sends a POST request to the server via the add url with 
	 * the quanttity as a parameter
	 */
    $scope.add = function (quantity) {
      $scope.showQuantity = false;
      if (!quantity) {
        quantity = $scope.quantity;
      }
      $scope.supply.$add({
        quantity: quantity,
        'country': $scope.country
      }, function () {
        if (!$scope.supply.hasOwnProperty('suppliers')) {
          $scope.supply.suppliers = $scope.suppliers;
        }
      });
    };
    /*
	 * Subtract a quantity
	 * 
	 * Sends a POST reques to the server via the subtract url with the 
	 * quantity as a parameter
	 */
    $scope.subtract = function (quantity) {
      $scope.showQuantity = false;
      if (!quantity) {
        quantity = $scope.quantity;
      }
      $scope.supply.$subtract({
        quantity: quantity,
        'country': $scope.country
      }, function () {
        if (!$scope.supply.hasOwnProperty('suppliers')) {
          $scope.supply.suppliers = $scope.suppliers;
        }
      });
    };
    /*
	 * Change quantity
	 */
    $scope.changeQuantity = function (action, quantity) {
      if (!quantity) {
        throw ValueError('Expecting a quantity');
      }
      $scope[action]();
    };
    $scope.$on('$destroy', function () {
      //Turn off scanner and keyboard Navigation
      scanner.disable();
      $timeout.cancel(timeoutPromise);
      Notification.display('Updating ' + $scope.supply.description + '...', false);
      $scope.supply.$update({ 'country': 'TH' }, function () {
        Notification.display($scope.supply.description + ' updated.');
      });
      globalscanner.enable();
    });
    /*
	 * Remove
	 */
    $scope.remove = function () {
      if ($scope.currentUser.hasPermission('delete_supply')) {
        Notification.display('Deleting supply...', false);
        $scope.supply.$delete(function () {
          Notification.display('Supply deleted');
          $location.path('/supply');
        });
      }
    };
  }
]);
angular.module('employeeApp').directive('imageUploader', [
  'Notification',
  'FileUploader',
  function (Notification, FileUploader) {
    return {
      templateUrl: 'views/templates/image-uploader.html',
      restrict: 'EA',
      replace: true,
      scope: {
        url: '@url',
        onUpload: '&'
      },
      link: function postLink(scope, element, attrs) {
        scope.selection = 'addImage';
        scope.showUploadButton = false;
        scope.buttonOn = function () {
          scope.showUploadButton = true;
        };
        scope.buttonOff = function () {
          scope.showUploadButton = false;
        };
        /*
			* Upload Image
			* 
			* Uploads image to the designated url. It then calls
			* the on-upload function that is 
			*/
        scope.upload = function ($image, callback) {
          var promise = FileUploader.upload($image, scope.url);
          promise.then(function (dataObj) {
            Notification.display('File was uploaded');
            scope.onUpload({
              data: dataObj.data,
              $image: dataObj.data
            });
            (callback || angular.noop)(dataObj.data);
          }, function () {
            Notification.display('There was an error uploading the file');
          });
        };
      }
    };
  }
]);
angular.module('employeeApp.directives').directive('addCustomer', [
  'Customer',
  'Notification',
  'Geocoder',
  function (Customer, Notification, Geocoder) {
    return {
      templateUrl: 'views/templates/add-customer.html',
      replace: true,
      restrict: 'A',
      scope: { visible: '=addCustomer' },
      link: function postLink(scope, element, attrs) {
        scope.customer = new Customer();
        /*
             * List of tips
             * 
             * The tips are to be used with the tooltips
             */
        scope.firstNameTip = 'Enter the customer\'s first name or name (required)';
        scope.lastNameTip = 'Enter the customer\'s last name if applicable';
        scope.emailTip = 'Enter a valid email address (required)';
        scope.telTip = 'Enter a valid phone number (required)';
        scope.typeTip = 'What type of customer is this? (required)';
        scope.currencyTip = 'What currency does this customer deal in? (required)';
        //Get the longitude and latitude of the customer's address
        scope.getLocation = function () {
          if (scope.customer.address.address1 && scope.customer.address.city && scope.customer.address.territory && scope.customer.address.country && scope.customer.address.zipcode && !scope.customer.address.user_defined_latlng) {
            //Get promise and bind to call backs
            var promise = Geocoder.geocode(scope.customer.address);
            promise.then(function (results) {
              if (scope.marker) {
                scope.marker.setPosition(results[0].geometry.location);
              } else {
                scope.marker = scope.map.createMarker(results[0].geometry.location);
                scope.marker.onchange = function (latLng) {
                  //Set address lat and lng
                  scope.customer.address.lat = scope.marker.lat;
                  scope.customer.address.lng = scope.marker.lng;
                  scope.customer.address.user_defined_latlng = true;
                };
              }
              //Reposition the map to the marker
              scope.map.setPosition(results[0].geometry.location);
              //Set the Address lat and lng
              scope.customer.address.lat = scope.marker.lat;
              scope.customer.address.lng = scope.marker.lng;
            }, function (status) {
              console.error(status);
            });
          }
        };
        scope.add = function () {
          if (scope.form.$valid) {
            Notification.display('Creating customer...', false);
            scope.customer.$save(function (response) {
              Notification.display('Customer created');
              scope.visible = false;
              scope.customer = new Customer();
            }, function (reason) {
              console.error(reason);
              Notification.display('There was an error in creating the customer');
            });
          } else {
            Notification.display('Please fill out the form properly');
          }
        };
      }
    };
  }
]);
angular.module('employeeApp').controller('MainCtrl', [
  '$scope',
  '$location',
  function ($scope, $location) {
    var user = $scope.currentUser;
    var changePage = function () {
      if (user.hasModule('supplies') && !user.hasModule('acknowledgements') && !user.hasModule('shipping')) {
        $location.path('/supply');
      }
    };
    if (!$scope.currentUser.ready) {
      user.onready = changePage;
    } else {
      changePage();
    }
  }
]);
angular.module('employeeApp').directive('img', [function () {
    function position(spec) {
      if (spec.height && spec.parentHeight && spec.elementHeight) {
        var heightDiff = spec.parentHeight - spec.elementHeight;
        spec.element.css('top', heightDiff / 2);
      } else if (spec.width && spec.parentWidth && spec.elementWidth) {
        var widthDiff = spec.parentWidth - spec.elementWidth;
        spec.element.css('left', widthDiff / 2);
      }
    }
    return {
      restrict: 'E',
      compile: function prelink(tElement, tAttrs) {
        if (!tElement.hasClass('logo')) {
          tElement.addClass('preloaded');
        }
        return {
          post: function postLink(scope, element, iAttrs) {
            //Add the preclass as soon as possible
            var parent = element.parent();
            var pWidth = parent.innerWidth();
            var pHeight = parent.innerWidth();
            element.on('load', function () {
              if (iAttrs.center) {
                position({
                  element: element,
                  width: true,
                  parentWidth: pWidth,
                  elementWidth: element.outerWidth()
                });
              }
              element.removeClass('preloaded');
            });
          }
        };
      }
    };
  }]);
angular.module('employeeApp.services').factory('KeyboardNavigation', [
  '$rootScope',
  '$log',
  function KeyboardNavigation($rootScope, $log) {
    function KeyboardNavigationFactory(configs) {
      var currentIndex = 0, enabled = false, scope = configs ? configs.scope ? configs.scope : $rootScope.$new() : $rootScope.$new(), onleft, onright, onup, ondown, onenter;
      configs = configs || {};
      function changeIndex(valInc) {
        if (configs.array) {
          scope.$apply(function () {
            currentIndex += valInc;
          });
        }
      }
      function parseKeydown(evt) {
        switch (evt.which) {
        case 37:
          if (onleft) {
            onleft();
          }
          break;
        case 38:
          changeIndex(-1);
          if (onup) {
            onup();
          }
          break;
        case 39:
          if (onright) {
            onright();
          }
          break;
        case 40:
          changeIndex(1);
          if (ondown) {
            ondown();
          }
          break;
        case 13:
          if (onenter) {
            onenter();
          }
          break;
        }
      }
      function disable() {
        if (enabled) {
          $(window).off('keydown', parseKeydown);
          enabled = false;
        }
      }
      function enable() {
        if (!enabled) {
          $(window).on('keydown', parseKeydown);
          enabled = true;
        }
      }
      function KeyboardNav() {
        enable();
        if (configs.scope) {
          configs.scope.$on('$destroy', function () {
            disable();
          });
        }
      }
      KeyboardNav.prototype.disable = function () {
        disable();
      };
      KeyboardNav.prototype.enable = function () {
        enable();
      };
      Object.defineProperties(KeyboardNav.prototype, {
        onup: {
          set: function (fn) {
            onup = fn;
          }
        },
        ondown: {
          set: function (fn) {
            ondown = fn;
          }
        },
        onleft: {
          set: function (fn) {
            onleft = fn;
          }
        },
        onright: {
          set: function (fn) {
            onright = fn;
          }
        },
        onenter: {
          set: function (fn) {
            onenter = fn;
          }
        }
      });
      return new KeyboardNav();
    }
    return KeyboardNavigationFactory;
  }
]);
angular.module('employeeApp').directive('supplierList', [
  'Supplier',
  'Notification',
  'KeyboardNavigation',
  '$rootScope',
  '$filter',
  function (Supplier, Notification, KeyboardNavigation, $rootScope, $filter) {
    return {
      templateUrl: 'views/templates/supplier-list.html',
      replace: true,
      restrict: 'A',
      scope: {
        visible: '=supplierList',
        onSelect: '&'
      },
      link: function postLink(scope, element, attrs) {
        var fetching = true, currentSelection, index = 0;
        /*
			* Initial fetching of the suppliers.
			* 
			* We will turn the fetching flag to false
			* once we received the results
			*/
        scope.suppliers = Supplier.query({ limit: 20 }, function (response) {
          fetching = false;
          changeSelection(index);
        });
        /*
			 * Search
			 */
        scope.$watch('query', function (q) {
          if (q) {
            Supplier.query({
              q: q,
              limit: 5
            }, function (resources) {
              for (var i = 0; i < resources.length; i++) {
                if (scope.suppliers.indexOfById(resources[i].id) == -1) {
                  scope.suppliers.push(resources[i]);
                }
              }
              index = 0;
              changeSelection(index);
            });
          }
        });
        /*
			 * Loads the next set of suppliers if there is no fetching
			 * currently running
			 */
        scope.loadNext = function () {
          if (!fetching) {
            Notification.display('Loading more suppliers...', false);
            fetching = true;
            Supplier.query({
              offset: scope.suppliers.length,
              limit: 50
            }, function (resources) {
              fetching = false;
              Notification.hide();
              for (var i = 0; i < resources.length; i++) {
                scope.suppliers.push(resources[i]);
              }
            });
          }
        };
        /*
			 * The function to run when a customer is selected
			 */
        scope.select = function (supplier) {
          scope.onSelect({ '$supplier': supplier });
        };
        function filter(array) {
          return $filter('orderBy')($filter('filter')(scope.suppliers, scope.query), 'name');
        }
        function changeSelection(i) {
          $rootScope.safeApply(function () {
            if (currentSelection) {
              currentSelection.$selected = false;
            }
            currentSelection = filter(scope.suppliers)[i];
            if (currentSelection) {
              currentSelection.$selected = true;
            }
          });
          var selection = $('.supplier.selected');
          var container = selection.parents('.inner-container');
          var scrollTop = container.scrollTop();
          var cHeight = container.innerHeight();
          if (scrollTop > selection.outerHeight() * i) {
            container.scrollTop(selection.outerHeight() * i);
          } else if (scrollTop + cHeight < selection.outerHeight() * i) {
            container.scrollTop(selection.outerHeight() * i);
          }
        }
        var keyboardNav = new KeyboardNavigation();
        keyboardNav.ondown = function () {
          if (index < filter(scope.suppliers).length - 1) {
            index += 1;
            changeSelection(index);
          }
        };
        keyboardNav.onup = function () {
          if (index !== 0) {
            index -= 1;
            changeSelection(index);
          }
        };
        keyboardNav.onenter = function () {
          $rootScope.safeApply(function () {
            scope.select(currentSelection);
          });
        };
        scope.$watch('visible', function (val) {
          if (val) {
            keyboardNav.enable();
          } else {
            keyboardNav.disable();
          }
        });
        scope.$on('$destroy', function () {
          keyboardNav.disable();
        });
      }
    };
  }
]);
angular.module('employeeApp').directive('supplyList', [
  'Supply',
  '$filter',
  'KeyboardNavigation',
  'Notification',
  '$rootScope',
  '$http',
  function (Supply, $filter, KeyboardNavigation, Notification, $rootScope, $http) {
    return {
      templateUrl: 'views/templates/supply-list.html',
      replace: true,
      restrict: 'A',
      scope: {
        visible: '=supplyList',
        onSelect: '&',
        supplier: '='
      },
      link: function postLink(scope, element, attrs) {
        var fetching = true, currentSelection, index = 0;
        var promise = $http.get('/api/v1/supply/type');
        promise.success(function (d) {
          scope.types = d;
          scope.types.splice(scope.types.indexOf(null), 1);
        });
        /*
			* Initial fetching of the supplies.
			* 
			* We will turn the fetching flag to false
			* once we received the results
			*/
        if (attrs.supplier) {
          scope.$watch('supplier', function (val) {
            if (val) {
              scope.supplies = Supply.query({
                supplier_id: val.id,
                limit: 20
              }, function (response) {
                fetching = false;
                changeSelection(index);
              });
            }
          });
        } else {
          scope.supplies = Supply.query({ limit: 20 }, function (response) {
            fetching = false;
            changeSelection(index);
          });
        }
        /*
			 * Search
			 */
        scope.$watch('query', function (q) {
          if (q) {
            Supply.query({
              q: q,
              limit: 10 + q.length * 2
            }, function (resources) {
              for (var i = 0; i < resources.length; i++) {
                if (scope.supplies.indexOfById(resources[i].id) == -1) {
                  scope.supplies.push(resources[i]);
                }
              }
              index = 0;
              changeSelection(index);
            });
          }
        });
        /*
			 * Loads the next set of supplies if there is no fetching
			 * currently running
			 */
        scope.loadNext = function () {
          if (!fetching) {
            Notification.display('Loading more supplies...', false);
            fetching = true;
            Supply.query({
              offset: scope.supplies.length,
              limit: 50
            }, function (resources) {
              fetching = false;
              Notification.hide();
              for (var i = 0; i < resources.length; i++) {
                scope.supplies.push(resources[i]);
              }
            });
          }
        };
        /*
			 * The function to run when a customer is selected
			 */
        scope.select = function (supply) {
          scope.onSelect({ '$supply': supply });
        };
        function filter(array) {
          return $filter('filter')(array, scope.query);
        }
        function changeSelection(i) {
          $rootScope.safeApply(function () {
            if (currentSelection) {
              currentSelection.$selected = false;
            }
            currentSelection = filter(scope.supplies)[i];
            if (currentSelection) {
              currentSelection.$selected = true;
            }
          });
          var selection = $('.supply.selected');
          var container = selection.parents('.inner-container');
          var scrollTop = container.scrollTop();
          var cHeight = container.innerHeight();
          if (scrollTop > selection.outerHeight() * i) {
            container.scrollTop(selection.outerHeight() * i);
          } else if (scrollTop + cHeight < selection.outerHeight() * i) {
            container.scrollTop(selection.outerHeight() * i);
          }
        }
        var keyboardNav = new KeyboardNavigation();
        keyboardNav.ondown = function () {
          if (index < filter(scope.supplies).length - 1) {
            index += 1;
            changeSelection(index);
          }
        };
        keyboardNav.onup = function () {
          if (index !== 0) {
            index -= 1;
            changeSelection(index);
          }
        };
        keyboardNav.onenter = function () {
          $rootScope.safeApply(function () {
            scope.select(currentSelection);
          });
        };
        scope.$watch('visible', function (val) {
          if (val) {
            keyboardNav.enable();
          } else {
            keyboardNav.disable();
          }
        });
        scope.$on('$destroy', function () {
          keyboardNav.disable();
        });
      }
    };
  }
]);
angular.module('employeeApp.services').service('CameraService', function CameraService() {
  function getUserMedia() {
    navigator.getUserMedia = window.navigator.getUserMedia || window.navigator.webkitGetUserMedia || window.navigator.mozGetUserMedia || window.navigator.msGetUserMedia;
    return navigator.getUserMedia;
  }
  return {
    hasUserMedia: function () {
      return !!getUserMedia();
    },
    getUserMedia: getUserMedia
  };
});
angular.module('employeeApp.directives').directive('camera', [
  'CameraService',
  function (CameraService) {
    return {
      template: '<div class="camera">' + '<canvas></canvas>' + '<video class="camera-video"></video>' + '<div class="snapshot-btn" ng-click="takeSnapshot()"></div>' + '<div class="btn-menu">' + '<div  class="save-btn" ng-click="save()">Save</div>' + '<div class="retake-btn" ng-click="retake()">Retake</div>' + '</div>' + '</div>',
      restrict: 'EA',
      replace: true,
      scope: { onSnapshot: '&' },
      link: function postLink(scope, element, attrs) {
        //console.log('test');
        //console.log(CameraService.hasUserMedia());
        if (!CameraService.hasUserMedia()) {
          return;
        }
        var userMedia = CameraService.getUserMedia, canvas = element.find('canvas')[0], ctx = canvas.getContext('2d'), video = element.find('video')[0], width = attrs.width || 1280, height = attrs.height || 720;
        var onSuccess = function (stream) {
          video.src = window.URL.createObjectURL(stream);
          video.play();
        };
        navigator.getUserMedia({
          video: {
            mandatory: {
              minWidth: width,
              minHeight: height
            }
          },
          audio: false
        }, onSuccess, function (e) {
          console.log(e);
        });
        function getImageAsBlob(url) {
          var bytes = atob(url.split(',')[1]);
          var stream = new Uint8Array(bytes.length);
          for (var key in bytes) {
            stream[key] = bytes.charCodeAt(key);
          }
          return new Blob([stream], { type: 'image/jpeg' });
        }
        scope.retake = function () {
          $(canvas).removeClass('active');
        };
        scope.save = function () {
          var img = getImageAsBlob(canvas.toDataURL('image/jpeg'));
          scope.onSnapshot({ $image: img });
          scope.retake();
        };
        scope.takeSnapshot = function () {
          width = video.videoWidth;
          height = video.videoHeight;
          canvas.width = width;
          canvas.height = height;
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(video, 0, 0, width, height);
          $(canvas).addClass('active');
        };
      }
    };
  }
]);
angular.module('employeeApp.services').factory('requestError', [
  '$q',
  'Notification',
  function ($q, Notification) {
    return {
      'response': function (response) {
        return response || $q.when(response);
      },
      'responseError': function (rejection) {
        Notification.display(rejection.data || 'An Error Occurred.');
        console.error(rejection);
        return $q.reject(rejection);
      }
    };
  }
]).config(function ($httpProvider) {
  $httpProvider.interceptors.push('requestError');
});
angular.module('employeeApp.directives').directive('supplyScannerModal', [
  'scanner',
  'Supply',
  'Notification',
  'KeyboardNavigation',
  '$timeout',
  '$rootScope',
  function (scanner, Supply, Notification, KeyboardNavigation, $timeout, $rootScope) {
    return {
      templateUrl: 'views/templates/supply-scanner-modal.html',
      restrict: 'A',
      replace: true,
      scope: { 'visible': '=supplyScannerModal' },
      link: function postLink(scope, element, attrs) {
        console.log(scope.country);
        /*
			 * Vars
			 */
        var keyboardNav = new KeyboardNavigation();
        scope.action = 'subtract';
        scope.scanner = new scanner('supply-scanner-modal');
        var focusOnQuantity = function () {
          element.find('input').focus();
        };
        /*
			 * Watchers
			 */
        /*
			 * This is a hack to rememdy that I cannot
			 * add an ng-class to the main tag of this
			 * directive
			 */
        scope.$watch('showAddImage', function (val) {
          if (val) {
            element.addClass('add-image');
          } else {
            element.removeClass('add-image');
          }
        });
        /*
			 * Add Image
			 * 
			 * Updates the image of the currently selected supply
			 */
        scope.addImage = function (data) {
          Notification.display('Updating the supply\'s image', false);
          var image = data.hasOwnProperty('data') ? data.data : data;
          scope.supply.image = image;
          scope.supply.$update(function () {
            Notification.display('Supply\'s image updated.');
          });
        };
        scope.changeQuantity = function (quantity) {
          quantity = quantity || scope.quantity;
          if (scope.supply.hasOwnProperty('id') && quantity > 0) {
            scope.supply['$' + scope.action]({
              quantity: quantity,
              'country': $rootScope.country
            }, function () {
              Notification.display('Quantity of ' + scope.supply.description + ' changed to ' + scope.supply.quantity);
              scope.quantity = 0;
              $timeout(function () {
                scope.supply = undefined;
              }, 5000);
            });
          }
        };
        /*
			 * Register the supply code regex
			 */
        scope.scanner.register(/^DRS-\d+$/, function (code) {
          Notification.display('Looking up supply...', false);
          scope.supply = Supply.get({
            id: code.split('-')[1],
            'country': $rootScope.country
          }, function (response) {
            Notification.hide();
            focusOnQuantity();
          }, function () {
            Notification.display('Unable to find supply.', false);  /*
					scope.supply = Supply.get({id:code}, function () {
						Notification.display('Unable to find supply', false);
					});
					*/
          });
        });
        /*
			 * Register the upc regex
			 */
        scope.scanner.register(/^\d+(\-\d+)*$/, function (code) {
          Supply.query({
            upc: code,
            'country': $rootScope.country
          }, function (response) {
            focusOnQuantity();
            try {
              scope.supply = response[0];
            } catch (e) {
              console.log(e);
            }
          }, function (reason) {
            console.log(reason);
          });
        });
        /*
			 * Sets navigation
			 */
        function changeAction(action) {
          if (scope.$$phase === '$digest' || scope.$$phase === '$apply') {
            scope.action = action;
          } else {
            scope.$apply(function () {
              scope.action = action;
            });
          }
        }
        keyboardNav.onright = function () {
          changeAction('subtract');
        };
        keyboardNav.onleft = function () {
          changeAction('add');
        };
        keyboardNav.onenter = function () {
          scope.changeQuantity(scope.quantity);
        };
        scope.$watch('visible', function (val) {
          if (val) {
            //Disable the global scanner
            try {
              window.globalScanner.disable();
            } catch (e) {
            }
            //Enable the scanner and disable the standard codes
            scope.scanner.enable();
            keyboardNav.enable();
            scope.scanner.disableStandard();
          } else {
            scope.scanner.disable();
            keyboardNav.disable();
            scope.scanner.enableStandard();
            scope.showAddImage = false;
          }
        });
        scope.$on('$destroy', function () {
          keyboardNav.disable();
          scope.scanner.disable();
          scope.showAddImage = false;
        });
      }
    };
  }
]);