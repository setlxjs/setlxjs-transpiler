require('should');

const transpile = require('../../build/createTranspiler')();
const Identifier = require('../../build/classes/Identifier');
const Primitive = require('../../build/classes/Primitive');
const Forall = require('../../build/classes/Forall');
const Iterator = require('../../build/classes/Iterator');

const types = require('../../build/constants/types');

describe('transpilers/forall', () => {
  it('should transpile a forall with one iterator', () => {
    transpile(
      Forall(
        [Iterator(Identifier('i'), Identifier('x'))],
        Primitive(types.BOOLEAN, true)
      )
    ).should.be.exactly('$gen(x).every(i => true)');
  });

  it('should transpile a forall with multiple iterators', () => {
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
