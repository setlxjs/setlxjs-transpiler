require('should');
const Block = require('../../build/classes/Block');
const Statement = require('../../build/classes/Statement');
const Identifier = require('../../build/classes/Identifier');
const AssignableList = require('../../build/classes/AssignableList');
const Assignment = require('../../build/classes/Assignment');
const Primitive = require('../../build/classes/Primitive');
const Sum = require('../../build/classes/Sum');
const Product = require('../../build/classes/Product');

const types = require('../../build/constants/types');
const ops = require('../../build/constants/operators');

const parser = require('../../build/parse');

function makeStmt(expr) {
  return Block([Statement(expr)]);
}

describe('Assignments', () => {
  it('should parse a normal assignment', () => {
    parser('x := 2;').should.eql(makeStmt(
      Assignment(Identifier('x'), Primitive(types.INTEGER, 2))
    ));

    parser('x := "some string";').should.eql(makeStmt(
      Assignment(Identifier('x'), Primitive(types.STRING, '"some string"'))
    ));

    parser('x := true;').should.eql(makeStmt(
      Assignment(Identifier('x'), Primitive(types.BOOLEAN, true))
    ));
  });

  it('should parse a normal assignment with righthandside expressions', () => {
    parser('x := 2 + 4;').should.eql(makeStmt(
      Assignment(
        Identifier('x'),
        Sum(ops.PLUS, Primitive(types.INTEGER, 2), Primitive(types.INTEGER, 4))
      )
    ));
  });

  it('should parse expression assignments', () => {
    parser('x += 2;').should.eql(makeStmt(
      Assignment(
        Identifier('x'),
        Sum(ops.PLUS, Identifier('x'), Primitive(types.INTEGER, 2))
      )
    ));

    parser('x -= 2;').should.eql(makeStmt(
      Assignment(
        Identifier('x'),
        Sum(ops.MINUS, Identifier('x'), Primitive(types.INTEGER, 2))
      )
    ));

    parser('x *= 2;').should.eql(makeStmt(
      Assignment(
        Identifier('x'),
        Product(ops.TIMES, Identifier('x'), Primitive(types.INTEGER, 2))
      )
    ));

    parser('x /= 2;').should.eql(makeStmt(
      Assignment(
        Identifier('x'),
        Product(ops.DIVIDED_BY, Identifier('x'), Primitive(types.INTEGER, 2))
      )
    ));

    parser('x %= 2;').should.eql(makeStmt(
      Assignment(
        Identifier('x'),
        Product(ops.MODULO, Identifier('x'), Primitive(types.INTEGER, 2))
      )
    ));

    parser('x \\= 2;').should.eql(makeStmt(
      Assignment(
        Identifier('x'),
        Product(ops.INTEGER_DIVISION, Identifier('x'), Primitive(types.INTEGER, 2))
      )
    ));
  });

  it('should parse expression assignments with righthandside expressions', () => {
    parser('x += 2 + 6;').should.eql(makeStmt(
      Assignment(
        Identifier('x'),
        Sum(
          ops.PLUS,
          Identifier('x'),
          Sum(ops.PLUS, Primitive(types.INTEGER, 2), Primitive(types.INTEGER, 6))
        )
      )
    ));

    parser('x += 2 * 6;').should.eql(makeStmt(
      Assignment(
        Identifier('x'),
        Sum(
          ops.PLUS,
          Identifier('x'),
          Product(ops.TIMES, Primitive(types.INTEGER, 2), Primitive(types.INTEGER, 6))
        )
      )
    ));
  });

  it('should parse destructuring assignments', () => {
    parser('[x, y] := pair;').should.eql(makeStmt(
      Assignment(
        AssignableList([Identifier('x'), Identifier('y')]),
        Identifier('pair')
      )
    ));
  });
});
