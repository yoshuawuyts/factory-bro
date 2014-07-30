/*eslint no-unused-expressions: 0*/

/**
 * Module dependencies
 */

var should = require('should');
var factoryBro = require('./index');
var factory = factoryBro();

/**
 * Before each.
 */

beforeEach(function() {
  factory = factoryBro();
});

/**
 * Test
 */

describe('factory()', function() {
  it('should initialize with empty properties', function() {
    Object.keys(factory).should.eql(['persistMethod']);
  });
});

describe('.add()', function() {
  it('should catch errors', function() {
    factory.add.bind(factory, 123)
      .should.throw('Name should be a string');
    factory.add.bind(factory, 'hi', 123)
      .should.throw('Data should be an object');
    factory.add.bind(factory, 'hi', {})
      .should.not.throw;
  });
  it('should catch duplicate fixture entries', function() {
    factory.add('user', {});
    factory.add.bind(factory, 'user', {})
      .should.throw('An entry already exists for name: \'user\'')
  });
  it('should save the object in a function', function() {
    factory.add('user', {
      name: 'Tobi'
    });

    factory['user'].should.be.type('function');
  });
});

describe('.persist()', function() {
  it('should catch errors', function() {
    factory.persist.bind(factory, 123)
      .should.throw('Func should be a function');
    factory.persist.bind(factory, function(){})
      .should.not.throw('Func should be a function');
  });
  it('should save a persist method', function(done) {
    factory.persist(function() {done()});
    factory.persistMethod();
  });
});

describe('.[fixtureName]()', function() {
  it('should catch errors', function() {
    factory.add('user', {
      name: 'Tobi'
    });

    factory.user.bind(factory, 123)
      .should.throw('Overwrites should be an object');

    factory.user.bind()
      .should.not.throw('Overwrites should be an object');
  });
  it('should call .persist()', function(done) {
    factory.add('user', {
      name: 'Tobi'
    });

    factory.persist(function(data) {
      data.should.eql({name: 'Tobi'});
      done();
    });

    factory.user();
  });
  it('should return overwritten data', function() {
    factory.add('user', {
      name: 'Tobi',
      species: 'ferret'
    });
    factory.add('animals', {
      id: 'giraffe'
    });

    factory.user({name: 'Jane'})
      .should.eql({
        name: 'Jane',
        species: 'ferret'
      });

    factory.animals().should.eql({id: 'giraffe'});
    factory.animals({id: 'elephant'}).should.eql({id: 'elephant'});
  });
});