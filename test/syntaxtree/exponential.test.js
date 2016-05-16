require('should');
const InitBlock = require('../../build/classes/InitBlock');
const Statement = require('../../build/classes/Statement');
const Identifier = require('../../build/classes/Identifier');
const Exponential = require('../../build/classes/Exponential');

const parser = require('../../build/parse');

function makeStmt(expr) {
  return InitBlock([Statement(expr)]);
}

describe('syntaxtree/Exponential', () => {
  it('should parse the exponential operator', () => {
    parser('x**y;').should.eql(makeStmt(
      Exponential(Identifier('x'), Identifier('y'))
    ));
  });
});
