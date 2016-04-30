require('should');
const InitBlock = require('../../build/classes/InitBlock');
const Block = require('../../build/classes/Block');
const Statement = require('../../build/classes/Statement');
const Identifier = require('../../build/classes/Identifier');
const Primitive = require('../../build/classes/Primitive');
const Assignment = require('../../build/classes/Assignment');
const Comparison = require('../../build/classes/Comparison');
const IfStmt = require('../../build/classes/IfStmt');

const types = require('../../build/constants/types');
const ops = require('../../build/constants/operators');

const parser = require('../../build/parse');

function makeStmt(expr) {
  return Block([Statement(expr)]);
}

describe('syntaxtree/IfStmt', () => {
  it('should parse if statements without else', () => {
    parser('if(true) { x := 1; }').should.eql(InitBlock([
      IfStmt(
        Primitive(types.BOOLEAN, true),
        makeStmt(Assignment(Identifier('x'), Primitive(types.INTEGER, 1)))
      ),
    ]));
  });

  it('should parse if statements with else', () => {
    parser('if(x == 1) { x := 4; } else { x := 5; }').should.eql(InitBlock([
      IfStmt(
        Comparison(ops.EQUAL, Identifier('x'), Primitive(types.INTEGER, 1)),
        makeStmt(Assignment(Identifier('x'), Primitive(types.INTEGER, 4))),
        makeStmt(Assignment(Identifier('x'), Primitive(types.INTEGER, 5)))
      ),
    ]));
  });

  it('should parse if statements with else if and else', () => {
    parser(`
      if(x == 2) {
        x := 6;
      } else if (x == 1) {
        x := 4;
      } else {
        x := 5;
      }
    `).should.eql(InitBlock([
      IfStmt(
        Comparison(ops.EQUAL, Identifier('x'), Primitive(types.INTEGER, 2)),
        makeStmt(Assignment(Identifier('x'), Primitive(types.INTEGER, 6))),
        IfStmt(
          Comparison(ops.EQUAL, Identifier('x'), Primitive(types.INTEGER, 1)),
          makeStmt(Assignment(Identifier('x'), Primitive(types.INTEGER, 4))),
          makeStmt(Assignment(Identifier('x'), Primitive(types.INTEGER, 5)))
        )
      ),
    ]));
  });
});
