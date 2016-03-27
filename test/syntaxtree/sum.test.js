require('should');
const Block = require('../../build/classes/Block');
const Statement = require('../../build/classes/Statement');
const Sum = require('../../build/classes/Sum');
const Primitive = require('../../build/classes/Primitive');

const ops = require('../../build/constants/operators');
const types = require('../../build/constants/types');

const parser = require('../../build/parse');

function makeStmt(expr) {
  return Block([Statement(expr)]);
}

function int(number) {
  return Primitive(types.INTEGER, number);
}

describe('Sum', () => {
  it('should parse a sum with PLUS', () => {
    parser('1 + 2;').should.eql(makeStmt(
      Sum(ops.PLUS, int(1), int(2))
    ));
  });

  it('should parse a sum with MINUS', () => {
    parser('6 - 7;').should.eql(makeStmt(
      Sum(ops.MINUS, int(6), int(7))
    ));
  });

  it('should parse nested sums', () => {
    parser('6 - 7 + 8;').should.eql(makeStmt(
      Sum(ops.PLUS, Sum(ops.MINUS, int(6), int(7)), int(8))
    ));
  });
});
