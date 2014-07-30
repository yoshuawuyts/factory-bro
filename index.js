/**
 * Module dependencies
 */

var assert = require('assert');

/**
 * Expose 'Factory'.
 */

module.exports = Factory;

/**
 * 'Factory' prototype
 */

var factory = Factory.prototype;

/**
 * Create a new 'Factory'.
 *
 * @return {Factory}
 * @api public
 */

function Factory() {
  if (!(this instanceof Factory)) return new Factory();
  this.persistMethod = function(){};
  return this;
};

/**
 * Add a fixture.
 *
 * @param {String} name
 * @param {Object} data
 * @api public
 */

factory.add = function(name, data) {
  assert('string' == typeof name, 'Name should be a string');
  assert('object' == typeof data, 'Data should be an object');
  assert(!this[name], 'An entry already exists for name: \'' + name + '\'');
  this[name] = fixture(data);
}

/**
 * Persist test data.
 *
 * @param {Function} func
 * @api public
 */

factory.persist = function(func) {
  assert('function' == typeof func, 'Func should be a function');
  this.persistMethod = func;
}

/**
 * Returns a fixture function to be placed at this[name] by .add().
 *
 * @return {Function}
 * @api private
 */

function fixture(data) {
  return function(overwrites) {
    assert('object' == typeof overwrites || 'undefined' == typeof overwrites, 
      'Overwrites should be an object'
    );

    // merge data + overwrites
    for(key in overwrites) {
      data[key] = overwrites[key];
    }

    this.persistMethod(data);
    return data;
  }
}