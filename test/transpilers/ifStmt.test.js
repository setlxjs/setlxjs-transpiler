require('should');

const IfStmt = require('../../build/classes/IfStmt');
const Primitive = require('../../build/classes/Primitive');
const Block = require('../../build/classes/Block');
const Statement = require('../../build/classes/Statement');
const types = require('../../build/constants/types');

const transpile = require('../../build/createTranspiler')();

function bool(val) {
  return Primitive(types.BOOLEAN, val);
}

describe('transpilers/ifStmt', () => {
  it('should transpile statements without else', () => {
    const tree = IfStmt(bool(true), Block([Statement(bool(true))]));

    transpile(tree).should.be.exactly('if (true) {\n  true;\n}');
  });

  it('should transpile statements with else', () => {
    const tree = IfStmt(
      bool(true),
      Block([Statement(bool(true))]),
      Block([Statement(bool(false))])
    );

    transpile(tree).should.be.exactly('if (true) {\n  true;\n} else {\n  false;\n}');
  });

  it('should transile statements with if else', () => {
    const tree = IfStmt(
      bool(true),
      Block([Statement(bool(true))]),
      IfStmt(bool(true), Block([Statement(bool(true))]), Block([Statement(bool(false))]))
    );

    transpile(tree).should.be.exactly(`if (true) {
  true;
} else if (true) {
  true;
} else {
  false;
}`);
  });
});
