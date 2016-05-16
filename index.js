/* eslint no-var: 0, func-names: 0, no-console: 0, prefer-arrow-callback: 0 */
var fs = require('fs');
var parser = require('./build/parse');
var transpiler = require('./build/index');
var content;

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

if (process.argv[2]) {
  content = fs.readFileSync(process.argv[2]).toString();
  exp(content, { tree: false })
    .then(function (err, result) {
      console.log(result);
    }).catch(function (error) {
      console.log(error.stack);
    });
}
