const fs = require('fs');
const path = require('path');
require('should');

const parser = require('../../build/parse');

const BASE = './test/grammar';

describe('The parser', () => {
  const programs = fs.readdirSync(path.join(BASE, 'programs'));

  programs.forEach(file => {
    it(`should parse ${file}`, done => {
      fs.readFile(path.join(BASE, 'programs', file), (err, data) => {
        if ( err ) throw err;

        parser(data.toString());

        done();
      });
    });
  });
});
