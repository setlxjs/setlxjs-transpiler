const fs = require('fs');
const path = require('path');
require('should');

const parser = require('../../build/parse');

const BASE = './test/grammar/programs';
const valid = ['primes-while.stlx', 'prime-sieve.stlx', 'wolf-goat-cabbage.stlx'];

describe('The parser', () => {
  const programs = fs.readdirSync(BASE);

  programs.filter(file => valid.indexOf(file) >= 0).forEach(file => {
    it(`should parse ${file}`, done => {
      fs.readFile(path.join(BASE, file), (err, data) => {
        if (err) throw err;

        parser(data.toString());

        done();
      });
    });
  });
});
