require('should');
const InitBlock = require('../../build/classes/InitBlock');
const Block = require('../../build/classes/Block');
const Statement = require('../../build/classes/Statement');
const Identifier = require('../../build/classes/Identifier');
const Primitive = require('../../build/classes/Primitive');
const Iterator = require('../../build/classes/Iterator');
const Forall = require('../../build/classes/Forall');

const types = require('../../build/constants/types');

const parser = require('../../build/parse');

function makeStmt(expr) {
  return InitBlock([Statement(expr)]);
}

describe('syntaxtree/Forall', () => {
  it('should parse forall statements with single iterator', () => {
    parser('forall (i in x | true);').should.eql(makeStmt(
      Forall(
        [Iterator(Identifier('i'), Identifier('x'))],
        Primitive(types.BOOLEAN, true)
      )
    ));
  });

  it('should parse forall statements with multiple iterators', () => {
    parser('forall (i in x, t in y, k in x | true);').should.eql(makeStmt(
      Forall(
        [
          Iterator(Identifier('i'), Identifier('x')),
          Iterator(Identifier('t'), Identifier('y')),
          Iterator(Identifier('k'), Identifier('x')),
        ],
        Primitive(types.BOOLEAN, true)
      )
    ));
  });
});
