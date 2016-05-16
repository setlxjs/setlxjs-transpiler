require('should');

const transpile = require('../../build/createTranspiler')();
const Identifier = require('../../build/classes/Identifier');
const Statement = require('../../build/classes/Statement');
const Block = require('../../build/classes/Block');
const Primitive = require('../../build/classes/Primitive');
const WhileLoop = require('../../build/classes/WhileLoop');
const Assignment = require('../../build/classes/Assignment');

const types = require('../../build/constants/types');

describe('transpilers/whileLoop', () => {
  it('should transpile a while loop', () => {
    transpile(WhileLoop(
      Primitive(types.BOOLEAN, true),
      Block([Statement(Assignment(Identifier('x'), Primitive(types.INTEGER, 1)))])
    )).should.be.exactly('while (true) {\n  x = 1;\n}');
  });
});
