'use strict';

const fs = require('fs');
const path = require('path');
const async = require('async');

// Enable should on Object prototype
const should = require('should');

const parser = require('../../build/grammar.js');

const BASE = './test/grammar/';

describe('The parser', function() {

  let files = [];

  // We want to compare compiled setlX files with matching js files
  const rfiles = fs.readdirSync(path.join(BASE, 'files')).map(path.parse);


  // Split setlX and JS files
  let setlx = rfiles
    .filter(e => e.ext === '.stlx')
    .map(e => e.name);
  let js = rfiles
    .filter(e => e.ext === '.js')
    .map(e => e.name);

  // add files to list, when both - setlX and JS - are present
  setlx.forEach(e => {
    if(js.indexOf(e) >= 0) {
      files.push( e );
    }
  });

  files.forEach(( file ) => {
    it('should transpile ' + file + ' correctly', done => {
      async.map([
          path.join(BASE, 'files', file + '.stlx'),
          path.join(BASE, 'files', file + '.js')
        ],
        fs.readFile,
        (err, arr) => {
          if ( err ) throw err;

          let setlxCode = arr[0].toString();
          let jsCode = arr[1].toString().replace(/\r\n/g, '\n');

          let parsed = parser.parse(setlxCode);

          parsed.should.be.ok().and.a.String();
          parsed.should.equal(jsCode);

          done();
        }
      );
    });
  });
});