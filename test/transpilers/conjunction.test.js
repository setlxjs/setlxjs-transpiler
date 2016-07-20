require('should');

const transpile = require('../../build/createTranspiler')();
const Identifier = require('../../build/classes/Identifier');
const Primitive = require('../../build/classes/Primitive');
const Conjunction = require('../../build/classes/Conjunction');

const types = require('../../build/constants/types');

describe('transpilers/conjunction', () => {
  it('should transpile conjunctions correctly', () => {
    transpile(
      Conjunction(Identifier('myid'), Primitive(types.BOOLEAN, true))
    ).should.be.exactly('(myid && true)');

    transpile(
      Conjunction(Identifier('x'), Identifier('y'))
    ).should.be.exactly('(x && y)');
  });
});
