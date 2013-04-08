/*
 * Declare the standard headers
 */
angular.module('employeeApp').config(function($httpProvider){
      $httpProvider.defaults.headers.post  = {"Cache-Control":"no-cache", "expires":"-1", "pragma":"no-cache"};
      $httpProvider.defaults.headers.get  = {"Cache-Control":"no-cache", "expires":"-1", "pragma":"no-cache"};
  });

 
/*
 * Run top level application code
 */
angular.module('employeeApp').run(function($rootScope, CurrentUser){
    $rootScope.currentUser = CurrentUser;
});
