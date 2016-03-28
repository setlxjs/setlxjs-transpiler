var parser = require('./build/parse');
var transpiler = require('./build/index');

module.exports = function transpiler(input, options, cb) {
  var callback, opts, promise, out;
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
      promise = new Promise.resolve(out);
    } catch (error) {
      promise = Promise.reject(error);
    }
  }

  if (typeof callback === 'function') {
    promise
      .then(function(output) { callback(null, output); })
      .catch(callback);
    return null;
  }
  return promise;
};
