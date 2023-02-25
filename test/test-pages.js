let expect  = require('chai').expect;
let request = require('request');


describe('vampire test', function() {
    
  it('should return a user with valid email', function() {
    const parentVampire = new Vampire("Parent", 500);
    const childVampire = new Vampire("Child", 100);

    parentVampire.addOffspring(childVampire);

    assert.equal(parentVampire.addOffspring(childVampire), true);
    
  });
});