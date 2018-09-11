'use strict';

if (typeof Promise === 'undefined') {
  // Rejection tracking prevents a common issue where React gets into an
  // inconsistent state due to an error, but it gets swallowed by a Promise,
  // and the user has no idea what causes React's erratic future behavior.
  require('promise/lib/rejection-tracking').enable();
  window.Promise = require('promise/lib/es6-extensions.js');
}

// fetch() polyfill for making API calls.
require('whatwg-fetch');

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = require('object-assign');

// IE
if (!!window.ActiveXObject || 'ActiveXObject' in window) {
  /** IE9, IE10 and IE11 requires all of the following polyfills. */
  require('core-js/es6/array');
  require('core-js/es6/date');
  require('core-js/es6/function');
  require('core-js/es6/map');
  require('core-js/es6/math');
  require('core-js/es6/number');
  require('core-js/es6/object');
  require('core-js/es6/parse-float');
  require('core-js/es6/parse-int');
  require('core-js/es6/regexp');
  require('core-js/es6/set');
  require('core-js/es6/string');
  require('core-js/es6/symbol');
  require('core-js/es6/weak-map');
  /** IE10 and IE11 requires the following for the Reflect API. */
  require('core-js/es6/reflect');
}

// In tests, polyfill requestAnimationFrame since jsdom doesn't provide it yet.
// We don't polyfill it in the browser--this is user's responsibility.
if (process.env.NODE_ENV === 'test') {
  require('raf').polyfill(global);
}
