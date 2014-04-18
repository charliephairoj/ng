'use strict';

describe('Directive: supplyDetails', function () {
  beforeEach(module('appApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<supply-details></supply-details>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the supplyDetails directive');
  }));
});
