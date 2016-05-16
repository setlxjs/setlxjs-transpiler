require('should');

const transpile = require('../../build/createTranspiler')();
const Identifier = require('../../build/classes/Identifier');
const Comparison = require('../../build/classes/Comparison');

const ops = require('../../build/constants/operators');

describe('transpilers/comparison', () => {
  it('should use the equal function for EQUAL', () => {
    transpile(Comparison(ops.EQUAL, Identifier('x'), Identifier('y'))).should.be.exactly(
      '$equal(x, y)'
    );
  });

  it('should use revert the result of the equal function for NOT_EQUAL', () => {
    transpile(Comparison(ops.NOT_EQUAL, Identifier('x'), Identifier('y'))).should.be.exactly(
      '!$equal(x, y)'
    );
  });

  it('should tanspile comparisons with GREATER_THAN operator', () => {
    transpile(Comparison(ops.GREATER_THAN, Identifier('x'), Identifier('y'))).should.be.exactly(
      '(x > y)'
    );
  });

  it('should tanspile comparisons with LESS_THAN operator', () => {
    transpile(Comparison(ops.LESS_THAN, Identifier('x'), Identifier('y'))).should.be.exactly(
      '(x < y)'
    );
  });

  it('should tanspile comparisons with GREATER_EQUAL_THAN operator', () => {
    transpile(
      Comparison(ops.GREATER_EQUAL_THAN, Identifier('x'), Identifier('y'))
    ).should.be.exactly(
      '(x >= y)'
    );
  });

  it('should tanspile comparisons with LESS_EQUAL_THAN operator', () => {
    transpile(Comparison(ops.LESS_EQUAL_THAN, Identifier('x'), Identifier('y'))).should.be.exactly(
      '(x <= y)'
    );
  });

  it('should tanspile comparisons with IS_IN operator', () => {
    transpile(Comparison(ops.IS_IN, Identifier('x'), Identifier('y'))).should.be.exactly(
      'x.contains(y)'
    );
  });

  it('should tanspile comparisons with IS_NOT_IN operator', () => {
    transpile(Comparison(ops.IS_NOT_IN, Identifier('x'), Identifier('y'))).should.be.exactly(
      '!x.contains(y)'
    );
  });
});
