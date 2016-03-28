require('should');
const Block = require('../../build/classes/Block');
const Statement = require('../../build/classes/Statement');
const Primitive = require('../../build/classes/Primitive');

const types = require('../../build/constants/types');

const parser = require('../../build/parse');

function makeStmt(expr) {
  return Block([Statement(expr)]);
}

describe('Primitive', () => {
  it('should parse an integer', () => {
    parser('1283;').should.eql(makeStmt(
      Primitive(types.INTEGER, 1283)
    ));
  });

  it('should parse a string', () => {
    parser('"some string";').should.eql(makeStmt(
      Primitive(types.STRING, '"some string"')
    ));
  });

  it('should parse a boolean', () => {
    parser('true;').should.eql(makeStmt(
      Primitive(types.BOOLEAN, true)
    ));

    parser('false;').should.eql(makeStmt(
      Primitive(types.BOOLEAN, false)
    ));
  });

  it('should parse a double', () => {
    parser('1234.567e12;').should.eql(makeStmt(
      Primitive(types.DOUBLE, '1234.567e12')
    ));
  });
});
