require('should');

const transpile = require('../../build/transpile');
const Identifier = require('../../build/classes/Identifier');
const Product = require('../../build/classes/Product');

const ops = require('../../build/constants/operators');

describe('transpilers/product', () => {
  it('should use the mul function for TIMES', () => {
    transpile(Product(ops.TIMES, Identifier('x'), Identifier('y'))).should.be.exactly(
      '$mul(x, y)'
    );
  });

  it('should tanspile products with DIVIDED_BY operator', () => {
    transpile(Product(ops.DIVIDED_BY, Identifier('x'), Identifier('y'))).should.be.exactly(
      '(x / y)'
    );
  });

  it('should transpile products with MODULO operator', () => {
    transpile(Product(ops.MODULO, Identifier('x'), Identifier('y'))).should.be.exactly(
      '(x % y)'
    );
  });

  it('should transpile products with INTEGER_DIVISION operator', () => {
    transpile(Product(ops.INTEGER_DIVISION, Identifier('x'), Identifier('y'))).should.be.exactly(
      'Math.floor(x / y)'
    );
  });
});
