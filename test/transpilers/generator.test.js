require('should');

const transpile = require('../../build/createTranspiler')();

const Generator = require('../../build/classes/Generator');
const Primitive = require('../../build/classes/Primitive');
const Identifier = require('../../build/classes/Identifier');
const Iterator = require('../../build/classes/Iterator');
const Conjunction = require('../../build/classes/Conjunction');
const List = require('../../build/classes/List');

const types = require('../../build/constants/types');

function int(number) {
  return Primitive(types.INTEGER, number);
}

function bool(val) {
  return Primitive(types.BOOLEAN, val);
}

const list = List([int(1), int(2), int(3)]);

describe('transpilers/generator', () => {
  it('should transpile simple generators', () => {
    // x: x in [1, 2, 3]
    const tree = Generator(Identifier('x'), [Iterator(Identifier('x'), list)]);
    transpile(tree).should.eql('$gen([1, 2, 3]).map(x => x)');
  });

  it('should transpile generators with a filter', () => {
    // x: x in [1, 2, 3] | true
    const tree = Generator(Identifier('x'), [Iterator(Identifier('x'), list)], bool(true));
    transpile(tree).should.eql('$gen([1, 2, 3]).filter(x => true).map(x => x)');
  });

  it('should transpile generators with multiple iterators', () => {
    // x && y: x in [1, 2, 3], y in [1, 2, 3]
    const tree = Generator(
      Conjunction(Identifier('x'), Identifier('y')),
      [Iterator(Identifier('x'), list), Iterator(Identifier('y'), list)]
    );

    transpile(tree).should.eql('$gen([1, 2, 3], [1, 2, 3]).map((x, y) => x && y)');
  });
});
