require('should');
const InitBlock = require('../../build/classes/InitBlock');
const Statement = require('../../build/classes/Statement');
const Identifier = require('../../build/classes/Identifier');
const Primitive = require('../../build/classes/Primitive');
const Iterator = require('../../build/classes/Iterator');
const Exists = require('../../build/classes/Exists');

const types = require('../../build/constants/types');

const parser = require('../../build/parse');

function makeStmt(expr) {
  return InitBlock([Statement(expr)]);
}

describe('syntaxtree/Exists', () => {
  it('should parse exists statements with single iterator', () => {
    parser('exists (i in x | true);').should.eql(makeStmt(
      Exists(
        [Iterator(Identifier('i'), Identifier('x'))],
        Primitive(types.BOOLEAN, true)
      )
    ));
  });

  it('should parse exists statements with multiple iterators', () => {
    parser('exists (i in x, t in y, k in x | true);').should.eql(makeStmt(
      Exists(
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
