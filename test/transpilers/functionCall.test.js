require('should');

const transpile = require('../../build/transpile')();
const Identifier = require('../../build/classes/Identifier');
const Primitive = require('../../build/classes/Primitive');
const FunctionCall = require('../../build/classes/FunctionCall');

const types = require('../../build/constants/types');

describe('transpilers/functionCall', () => {
  it('should transpile function calls with integers', () => {
    transpile(FunctionCall([Primitive(types.INTEGER, 4)])).should.be.exactly('(4)');
  });

  it('should transpile function calls with identifiers', () => {
    transpile(FunctionCall([Identifier('x')])).should.be.exactly('(x)');
  });

  it('should transpile function calls with multiple parameters', () => {
    const tree = FunctionCall([Identifier('x'), Identifier('y'), Identifier('z')]);
    transpile(tree).should.be.exactly('(x, y, z)');
  });
});
