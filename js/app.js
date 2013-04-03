'use strict';


// Declare app level module which depends on filters, and services
var EmployeeCenter = angular.module('EmployeeCenter', ['ui','EmployeeCenter.filters','EmployeeCenter.services', 'EmployeeCenter.directives', 'UserAuth']).
  config(function($httpProvider){
      $httpProvider.defaults.headers.post  = {"Cache-Control":"no-cache", "expires":"-1", "pragma":"no-cache"};
      $httpProvider.defaults.headers.get  = {"Cache-Control":"no-cache", "expires":"-1", "pragma":"no-cache"};
  });


EmployeeCenter.run(function($rootScope, CurrentUser){
    $rootScope.currentUser = CurrentUser;
});
