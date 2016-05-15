require('should');
const InitBlock = require('../../build/classes/InitBlock');
const Block = require('../../build/classes/Block');
const Statement = require('../../build/classes/Statement');
const Identifier = require('../../build/classes/Identifier');
const Primitive = require('../../build/classes/Primitive');
const Assignment = require('../../build/classes/Assignment');
const WhileLoop = require('../../build/classes/WhileLoop');

const types = require('../../build/constants/types');

const parser = require('../../build/parse');

function makeStmt(expr) {
  return Block([Statement(expr)]);
}

describe('syntaxtree/WhileLoop', () => {
  it('should parse while loops', () => {
    parser('while(true) { x := 1; }').should.eql(InitBlock([
      WhileLoop(
        Primitive(types.BOOLEAN, true),
        makeStmt(Assignment(Identifier('x'), Primitive(types.INTEGER, 1)))
      ),
    ]));
  });
});
