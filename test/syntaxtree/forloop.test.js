require('should');
const InitBlock = require('../../build/classes/InitBlock');
const Block = require('../../build/classes/Block');
const Statement = require('../../build/classes/Statement');
const Identifier = require('../../build/classes/Identifier');
const Primitive = require('../../build/classes/Primitive');
const Comparison = require('../../build/classes/Comparison');
const Sum = require('../../build/classes/Sum');
const Iterator = require('../../build/classes/Iterator');
const ForLoop = require('../../build/classes/ForLoop');

const types = require('../../build/constants/types');
const ops = require('../../build/constants/operators');

const parser = require('../../build/parse');

function makeStmt(expr) {
  return Block([Statement(expr)]);
}

describe('syntaxtree/ForLoop', () => {
  it('should parse for statements with single iterator', () => {
    parser('for(i in x) { true; }').should.eql(InitBlock([
      ForLoop(
        [Iterator(Identifier('i'), Identifier('x'))],
        null,
        makeStmt(Primitive(types.BOOLEAN, true))
      ),
    ]));
  });

  it('should parse for statements with multiple iterators', () => {
    parser('for(i in x, t in y, k in x) { true; }').should.eql(InitBlock([
      ForLoop(
        [
          Iterator(Identifier('i'), Identifier('x')),
          Iterator(Identifier('t'), Identifier('y')),
          Iterator(Identifier('k'), Identifier('x')),
        ],
        null,
        makeStmt(Primitive(types.BOOLEAN, true))
      ),
    ]));
  });

  it('should parse for statements with multiple iterators and condition', () => {
    parser('for(i in x, k in y | x + y == 10) { true; }').should.eql(InitBlock([
      ForLoop(
        [
          Iterator(Identifier('i'), Identifier('x')),
          Iterator(Identifier('k'), Identifier('y')),
        ],
        Comparison(
          ops.EQUAL,
          Sum(ops.PLUS, Identifier('x'), Identifier('y')),
          Primitive(types.INTEGER, 10)
        ),
        makeStmt(Primitive(types.BOOLEAN, true))
      ),
    ]));
  });
});
