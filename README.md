# factory-bro
[![NPM version][npm-image]][npm-url] [![build status][travis-image]][travis-url] 
[![Test coverage][coveralls-image]][coveralls-url]

A library for setting up JavaScript objects as test data.

Defining fixtures is repetitive and prone to errors. Factory-bro helps you by
allowing fixtures to be defined in a central hub. This allows you to spend more
time coding, and less time updating tests.

## Installation
```bash
$ npm i --save factory-bro
```
## Overview
```js
/**
 * Initialize factory-bro.
 */

var factoryBro = require('factory-bro');
var factory = factoryBro();
var db = [];

/**
 * Add a fixture.
 */

factory.add('user', {
  name: 'Tobi',
  age: 7,
  species: 'Ferret'
});

/**
 * Define the persistance method.
 */

factory.persist(function(data) {
  db.push(data);
});

/**
 * Access our newly created 'user' fixture, edit it and then save it to the db.
 */

factory.user({name: 'Jane'});
console.log(db);
// => [{name: 'Jane', age: 7, species: 'ferret'}];
```

## API
#### factory()
```js
// Initialize a test factory.

var factoryBro = require('factory-bro');
var factory = factoryBro();
```

#### .add()
```js
// Add a new fixture. Takes an argument of {String} name and {Object} data.

factory.add('user', {
  name: 'Tobi',
  age: 7,
  species: 'ferret'
});
```

#### .persist()
```js
// Define the function to be called when an object gets persisted. Takes a 
// {Function} func as an argument. The func is provided with an argument of
// {Object} data when called.

var db = [];

factory.persist(function(data) {
  db.push(data);
});
```

#### .\[fixtureName\]()
```js
// Access a fixture and edit its values. Takes an optional argument of 
// {Object} data. If applicable calls the function defined by .persist() after.

factory.user();
// persist -> {name: 'Tobi', age: 7, species: 'ferret'};

factory.user({
  name: 'Jane',
  age: 3
});
// persist -> {name: 'Jane', age: 3, species: 'ferret'}

```

## License
[MIT](https://tldrlegal.com/license/mit-license) © [Yoshua Wuyts](yoshuawuyts.com)

[npm-image]: https://img.shields.io/npm/v/factory-bro.svg?style=flat
[npm-url]: https://npmjs.org/package/factory-bro
[travis-image]: https://img.shields.io/travis/yoshuawuyts/factory-bro.svg?style=flat
[travis-url]: https://travis-ci.org/yoshuawuyts/factory-bro
[coveralls-image]: https://img.shields.io/coveralls/yoshuawuyts/factory-bro.svg?style=flat
[coveralls-url]: https://coveralls.io/r/yoshuawuyts/factory-bro?branch=master