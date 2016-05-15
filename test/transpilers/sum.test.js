require('should');

const transpile = require('../../build/transpile')();
const Identifier = require('../../build/classes/Identifier');
const Sum = require('../../build/classes/Sum');

const ops = require('../../build/constants/operators');

describe('transpilers/sum', () => {
  it('should use the add function for PLUS', () => {
    transpile(Sum(ops.PLUS, Identifier('x'), Identifier('y'))).should.be.exactly(
      '$add(x, y)'
    );
  });

  it('should use the sub function for MINUS', () => {
    transpile(Sum(ops.MINUS, Identifier('x'), Identifier('y'))).should.be.exactly(
      '$sub(x, y)'
    );
  });
});
