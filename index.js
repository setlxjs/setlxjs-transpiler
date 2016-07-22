/* eslint no-var: 0, func-names: 0, no-console: 0, prefer-arrow-callback: 0 */
var parser = require('./build/parse');
var transpiler = require('./build/index');

function exp(input, options, cb) {
  var callback;
  var opts;
  var promise;
  var out;
  if (typeof options === 'function') {
    callback = options;
  } else if (typeof options === 'undefined') {
    opts = {};
  } else {
    opts = options;
    callback = cb;
  }

  if (opts.tree) {
    try {
      out = parser(input);
      promise = Promise.resolve(out);
    } catch (error) {
      promise = Promise.reject(error);
    }
  } else {
    try {
      out = transpiler(input);
      promise = Promise.resolve(out);
    } catch (error) {
      promise = Promise.reject(error);
    }
  }

  if (typeof callback === 'function') {
    promise
      .then(function (output) { callback(null, output); })
      .catch(callback);
    return null;
  }
  return promise;
}

module.exports = exp;
