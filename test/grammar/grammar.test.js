'use strict';

const fs = require('fs');
const path = require('path');
const async = require('async');

// Enable should on Object prototype
require('should');

const transpile = require('../../build/index.js');

const BASE = './test/grammar/';

describe('The parser', function() {
  const files = [];

  // We want to compare compiled setlX files with matching js files
  const rfiles = fs.readdirSync(path.join(BASE, 'files')).map(path.parse);

  // Split setlX and JS files
  const setlx = rfiles
    .filter( file => file.ext === '.stlx' )
    .map( file => file.name );
  const js = rfiles
    .filter( file => file.ext === '.js' )
    .map( file => file.name );

  // add files to list, when both - setlX and JS - are present
  setlx.forEach(fileName => {
    if ( js.indexOf(fileName) >= 0 ) {
      files.push( fileName );
    }
  });

  files.forEach(file => {
    it('should transpile ' + file + ' correctly', done => {
      async.map([
        path.join(BASE, 'files', file + '.stlx'),
        path.join(BASE, 'files', file + '.js'),
      ],
        fs.readFile,
        (err, arr) => {
          if ( err ) throw err;

          const setlxCode = arr[0].toString();
          const jsCode = arr[1].toString().replace(/\r\n/g, '\n');

          const parsed = transpile(setlxCode);

          parsed.should.be.ok().and.a.String();
          parsed.should.equal(jsCode);

          done();
        }
      );
    });
  });
});
