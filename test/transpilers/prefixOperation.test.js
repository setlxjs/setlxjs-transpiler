require('should');

const transpile = require('../../build/createTranspiler')();
const Identifier = require('../../build/classes/Identifier');
const PrefixOperation = require('../../build/classes/PrefixOperation');

const ops = require('../../build/constants/operators');

describe('transpilers/PREFIX_OPERATION', () => {
  it('should transpile prefix minus operations', () => {
    transpile(PrefixOperation(ops.PREFIX_MINUS, Identifier('x'))).should.be.exactly('-x');
  });

  it('should transpile prefix add operations', () => {
    transpile(PrefixOperation(ops.PREFIX_PLUS, Identifier('x'))).should.be.exactly(
      'x.reduce($add)'
    );
  });

  it('should transpile prefix multiply operations', () => {
    transpile(PrefixOperation(ops.PREFIX_TIMES, Identifier('x'))).should.be.exactly(
      'x.reduce($mul)'
    );
  });

  it('should transpile prefix length operations', () => {
    transpile(PrefixOperation(ops.PREFIX_LENGTH, Identifier('x'))).should.be.exactly(
      'x.length'
    );
  });
});
