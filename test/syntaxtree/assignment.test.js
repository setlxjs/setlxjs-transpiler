require('should');
const Block = require('../../build/classes/Block');
const Statement = require('../../build/classes/Statement');
const Identifer = require('../../build/classes/Identifer');
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
      Assignment(Identifer('x'), Primitive(types.INTEGER, 2))
    ));

    parser('x := "some string";').should.eql(makeStmt(
      Assignment(Identifer('x'), Primitive(types.STRING, '"some string"'))
    ));

    parser('x := true;').should.eql(makeStmt(
      Assignment(Identifer('x'), Primitive(types.BOOLEAN, true))
    ));
  });

  it('should parse a normal assignment with righthandside expressions', () => {
    parser('x := 2 + 4;').should.eql(makeStmt(
      Assignment(
        Identifer('x'),
        Sum(ops.PLUS, Primitive(types.INTEGER, 2), Primitive(types.INTEGER, 4))
      )
    ));
  });

  it('should parse expression assignments', () => {
    parser('x += 2;').should.eql(makeStmt(
      Assignment(
        Identifer('x'),
        Sum(ops.PLUS, Identifer('x'), Primitive(types.INTEGER, 2))
      )
    ));

    parser('x -= 2;').should.eql(makeStmt(
      Assignment(
        Identifer('x'),
        Sum(ops.MINUS, Identifer('x'), Primitive(types.INTEGER, 2))
      )
    ));

    parser('x *= 2;').should.eql(makeStmt(
      Assignment(
        Identifer('x'),
        Product(ops.TIMES, Identifer('x'), Primitive(types.INTEGER, 2))
      )
    ));

    parser('x /= 2;').should.eql(makeStmt(
      Assignment(
        Identifer('x'),
        Product(ops.DIVIDED_BY, Identifer('x'), Primitive(types.INTEGER, 2))
      )
    ));

    parser('x %= 2;').should.eql(makeStmt(
      Assignment(
        Identifer('x'),
        Product(ops.MODULO, Identifer('x'), Primitive(types.INTEGER, 2))
      )
    ));

    parser('x \\= 2;').should.eql(makeStmt(
      Assignment(
        Identifer('x'),
        Product(ops.INTEGER_DIVISION, Identifer('x'), Primitive(types.INTEGER, 2))
      )
    ));
  });

  it('should parse expression assignments with righthandside expressions', () => {
    parser('x += 2 + 6;').should.eql(makeStmt(
      Assignment(
        Identifer('x'),
        Sum(
          ops.PLUS,
          Identifer('x'),
          Sum(ops.PLUS, Primitive(types.INTEGER, 2), Primitive(types.INTEGER, 6))
        )
      )
    ));

    parser('x += 2 * 6;').should.eql(makeStmt(
      Assignment(
        Identifer('x'),
        Sum(
          ops.PLUS,
          Identifer('x'),
          Product(ops.TIMES, Primitive(types.INTEGER, 2), Primitive(types.INTEGER, 6))
        )
      )
    ));
  });
});
