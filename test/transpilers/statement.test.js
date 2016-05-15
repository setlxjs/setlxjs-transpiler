require('should');

const transpile = require('../../build/transpile')();
const Identifier = require('../../build/classes/Identifier');
const Statement = require('../../build/classes/Statement');

describe('transpilers/statement', () => {
  it('should add a semicolon to an expression', () => {
    transpile(Statement(Identifier('myid'))).should.be.exactly('myid;');
  });
});
