require('should');

const transpile = require('../../build/createTranspiler')();
const Identifier = require('../../build/classes/Identifier');
const Primitive = require('../../build/classes/Primitive');
const Disjunction = require('../../build/classes/Disjunction');

const types = require('../../build/constants/types');

describe('transpilers/disjunction', () => {
  it('should transpile disjunctions correctly', () => {
    transpile(
      Disjunction(Identifier('myid'), Primitive(types.BOOLEAN, true))
    ).should.be.exactly('myid || true');

    transpile(
      Disjunction(Identifier('x'), Identifier('y'))
    ).should.be.exactly('x || y');
  });
});
