require('should');

const Primitive = require('../../build/classes/Primitive');
const List = require('../../build/classes/List');
const Range = require('../../build/classes/Range');

const types = require('../../build/constants/types');

const transpile = require('../../build/transpile');

function int(number) {
  return Primitive(types.INTEGER, number);
}

describe('transpilers/list', () => {
  it('should transpile listings', () => {
    transpile(List([int(1), int(23), int(12)])).should.be.exactly('[1, 23, 12]');
  });

  it('should transpile ranges', () => {
    transpile(List(Range(int(1), int(3000)))).should.be.exactly('$range(1, 3000)');
  });
});
