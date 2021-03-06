require('should');
const InitBlock = require('../../build/classes/InitBlock');
const Statement = require('../../build/classes/Statement');
const Primitive = require('../../build/classes/Primitive');
const Identifier = require('../../build/classes/Identifier');
const SetlSet = require('../../build/classes/SetlSet');
const Generator = require('../../build/classes/Generator');
const Iterator = require('../../build/classes/Iterator');
const Range = require('../../build/classes/Range');
const Sum = require('../../build/classes/Sum');
const Comparison = require('../../build/classes/Comparison');
const Product = require('../../build/classes/Product');

const types = require('../../build/constants/types');
const ops = require('../../build/constants/operators');

const parser = require('../../build/parse');

function makeStmt(expr) {
  return InitBlock([Statement(expr)]);
}

function int(number) {
  return Primitive(types.INTEGER, number);
}

function string(value) {
  return Primitive(types.STRING, value);
}

describe('syntaxtree/SetlSet', () => {
  it('should parse lists from value lists', () => {
    parser('{1, 2, 3};').should.eql(makeStmt(
      SetlSet([int(1), int(2), int(3)])
    ));

    parser('{147};').should.eql(makeStmt(
      SetlSet([int(147)])
    ));

    parser('{ident, 1, "some string"};').should.eql(makeStmt(
      SetlSet([Identifier('ident'), int(1), string('"some string"')])
    ));
  });

  it('should parse lists from ranges', () => {
    parser('{12..20};').should.eql(makeStmt(
      SetlSet(Range(int(12), int(20)))
    ));

    parser('{0..13};').should.eql(makeStmt(
      SetlSet(Range(int(0), int(13)))
    ));

    parser('{x..29000};').should.eql(makeStmt(
      SetlSet(Range(Identifier('x'), int(29000)))
    ));

    parser('{x..y};').should.eql(makeStmt(
      SetlSet(Range(Identifier('x'), Identifier('y')))
    ));
  });

  it('should parse lists from iterators', () => {
    parser('{x: x in y};').should.eql(makeStmt(
      SetlSet(
        Generator(
          Identifier('x'),
          [Iterator(Identifier('x'), Identifier('y'))]
        )
      )
    ));

    parser('{x + y: x in a, y in a};').should.eql(makeStmt(
      SetlSet(
        Generator(
          Sum(ops.PLUS, Identifier('x'), Identifier('y')),
          [
            Iterator(Identifier('x'), Identifier('a')),
            Iterator(Identifier('y'), Identifier('a')),
          ]
        )
      )
    ));

    parser('{x: x in y | x % 2 == 0};').should.eql(makeStmt(
      SetlSet(
        Generator(
          Identifier('x'),
          [Iterator(Identifier('x'), Identifier('y'))],
          Comparison(
            ops.EQUAL,
            Product(ops.MODULO, Identifier('x'), int(2)),
            int(0)
          )
        )
      )
    ));
  });
});
