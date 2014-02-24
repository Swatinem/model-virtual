# Model-virtual

virtuals for Swatinem/model

[![Build Status](https://travis-ci.org/Swatinem/model-virtual.png?branch=master)](https://travis-ci.org/Swatinem/model-virtual)
[![Coverage Status](https://coveralls.io/repos/Swatinem/model-virtual/badge.png?branch=master)](https://coveralls.io/r/Swatinem/model-virtual)
[![Dependency Status](https://gemnasium.com/Swatinem/model-virtual.png)](https://gemnasium.com/Swatinem/model-virtual)

## Installation

    $ component install Swatinem/model-virtual

## .virtual(name, getter, [dependencies])

Defines a new virtual with `name` and `getter`.
Will emit a `change` event whenever one of the `dependencies` changes.

**note:** The change event does not support `(current, previous)` values yet.

**note:** Virtuals are included in the JSON-ification. If needed support will
be added to avoid that.

## Usage

```js
var Model = require('model');
var Virtual = require('model-virtual');

var User = new Model(['first', 'last', 'email'])
	.use(Virtual)
	.virtual('name',
		function () { return [this.first, this.last].join(' '); },
		['first', 'last']);

var instance = new User({first: 'Arpad', last: 'Borsos'});

instance.name; // => 'Arpad Borsos'

instance.on('change name', function () {});
instance.first = 'Adam'; // triggers change event
```

## License

  LGPLv3

