require('should');
const InitBlock = require('../../build/classes/InitBlock');
const Statement = require('../../build/classes/Statement');
const Identifier = require('../../build/classes/Identifier');
const PrefixOperation = require('../../build/classes/PrefixOperation');

const ops = require('../../build/constants/operators');

const parser = require('../../build/parse');

function makeStmt(expr) {
  return InitBlock([Statement(expr)]);
}

describe('syntaxtree/PrefixOperation', () => {
  it('should parse prefix operations with PREFIX_MINUS', () => {
    parser('-x;').should.eql(makeStmt(
      PrefixOperation(ops.PREFIX_MINUS, Identifier('x'))
    ));
  });

  it('should parse prefix operations with reducing PREFIX_PLUS', () => {
    parser('+/x;').should.eql(makeStmt(
      PrefixOperation(ops.PREFIX_PLUS, Identifier('x'))
    ));
  });

  it('should parse prefix operations with reducing PREFIX_TIMES', () => {
    parser('*/x;').should.eql(makeStmt(
      PrefixOperation(ops.PREFIX_TIMES, Identifier('x'))
    ));
  });

  it('should parse prefix operations with PREFIX_LENGTH', () => {
    parser('#x;').should.eql(makeStmt(
      PrefixOperation(ops.PREFIX_LENGTH, Identifier('x'))
    ));
  });

  it('should parse prefix operations with PREFIX_NOT', () => {
    parser('!x;').should.eql(makeStmt(
      PrefixOperation(ops.PREFIX_NOT, Identifier('x'))
    ));
  });
});
