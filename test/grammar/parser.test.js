const fs = require('fs');
const path = require('path');
require('should');

const parser = require('../../build');

const BASE = './test/grammar';

describe.only('The parser', () => {
  const programs = fs.readdirSync(path.join(BASE, 'programs/'));

  programs.foreach(file => {
    it(`should parse ${file.name}`, done => {
      fs.readFile(file, (err, data) => {
        if ( err ) throw err;

        parser(data.toString()).should.not.throw();

        done();
      });
    });
  });
});
