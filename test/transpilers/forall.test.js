require('should');

const transpile = require('../../build/transpile')();
const Identifier = require('../../build/classes/Identifier');
const Statement = require('../../build/classes/Statement');
const Block = require('../../build/classes/Block');
const Primitive = require('../../build/classes/Primitive');
const Forall = require('../../build/classes/Forall');
const Iterator = require('../../build/classes/Iterator');

const types = require('../../build/constants/types');

function makeStmt(expr) {
  return Block([Statement(expr)]);
}

describe('transpilers/forLoop', () => {
  it('should transpile a foralls with one iterator', () => {
    transpile(
      Forall(
        [Iterator(Identifier('i'), Identifier('x'))],
        Primitive(types.BOOLEAN, true)
      )
    ).should.be.exactly('$gen(x).every(i => true)');
  });

  it('should transpile a foralls with multiple iterators', () => {
    transpile(
      Forall(
        [
          Iterator(Identifier('i'), Identifier('x')),
          Iterator(Identifier('t'), Identifier('y')),
          Iterator(Identifier('k'), Identifier('x')),
        ],
        Primitive(types.BOOLEAN, true)
      )
    ).should.be.exactly('$gen(x, y, x).every((i, t, k) => true)');
  });
});
