/*
 * Here We will define all the various properties
 * of the appilation. The first sectino is to declare
 * the various modules in the componenet and then to 
 * declare the application. 
 * 
 * The following section is meant to configure the 
 * standard headers that occur with all $http 
 * requests
 * 
 * The last section will run all app level functions
 * such as getting the current User
 */


/*
 * Declare the modules
 */
angular.module('EmployeeCenter.filters', []);
angular.module('EmployeeCenter.services', ['ngResource']);
angular.module('EmployeeCenter.directives', []);
angular.module('EmployeeCenter.resources', ['ngResource']);
angular.module('UserAuth', []);


/*
 *Declare the Appliction 
 */
angular.module('EmployeeCenter', ['ui','EmployeeCenter.filters',
                                                       'EmployeeCenter.services',
                                                       'EmployeeCenter.directives',
                                                       'UserAuth',
                                                       'EmployeeCenter.resources']).


/*
 * Declare the standard headers
 */
angular.module('EmployeeCenter').config(function($httpProvider){
      $httpProvider.defaults.headers.post  = {"Cache-Control":"no-cache", "expires":"-1", "pragma":"no-cache"};
      $httpProvider.defaults.headers.get  = {"Cache-Control":"no-cache", "expires":"-1", "pragma":"no-cache"};
  });


/*
 * Run top level application code
 */
EmployeeCenter.run(function($rootScope, CurrentUser){
    $rootScope.currentUser = CurrentUser;
});
