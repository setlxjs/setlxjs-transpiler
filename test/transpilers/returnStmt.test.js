require('should');

const transpile = require('../../build/createTranspiler')();
const Identifier = require('../../build/classes/Identifier');
const Return = require('../../build/classes/Return');

describe('transpilers/returnStmt', () => {
  it('should transpile the return of an expression', () => {
    transpile(Return(Identifier('myid'))).should.be.exactly('return myid;');
  });

  it('should transpile empty return statements', () => {
    transpile(Return()).should.be.exactly('return;');
  });
});
