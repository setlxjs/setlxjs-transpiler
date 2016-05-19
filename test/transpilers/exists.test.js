require('should');

const transpile = require('../../build/transpile')();
const Identifier = require('../../build/classes/Identifier');
const Primitive = require('../../build/classes/Primitive');
const Exists = require('../../build/classes/Exists');
const Iterator = require('../../build/classes/Iterator');

const types = require('../../build/constants/types');

describe('transpilers/exists', () => {
  it('should transpile a exists with one iterator', () => {
    transpile(
      Exists(
        [Iterator(Identifier('i'), Identifier('x'))],
        Primitive(types.BOOLEAN, true)
      )
    ).should.be.exactly('$gen(x).some(i => true)');
  });

  it('should transpile a exists with multiple iterators', () => {
    transpile(
      Exists(
        [
          Iterator(Identifier('i'), Identifier('x')),
          Iterator(Identifier('t'), Identifier('y')),
          Iterator(Identifier('k'), Identifier('x')),
        ],
        Primitive(types.BOOLEAN, true)
      )
    ).should.be.exactly('$gen(x, y, x).some((i, t, k) => true)');
  });
});
