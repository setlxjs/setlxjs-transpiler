
require('should');
const InitBlock = require('../../build/classes/InitBlock');
const Block = require('../../build/classes/Block');
const Statement = require('../../build/classes/Statement');
const Identifier = require('../../build/classes/Identifier');
const Call = require('../../build/classes/Call');
const FunctionCall = require('../../build/classes/FunctionCall');
const CollectionAccess = require('../../build/classes/CollectionAccess');
const Primitive = require('../../build/classes/Primitive');
const Range = require('../../build/classes/Range');
const Product = require('../../build/classes/Product');
const Return = require('../../build/classes/Return');
const Procedure = require('../../build/classes/Procedure');

const types = require('../../build/constants/types');
const ops = require('../../build/constants/operators');

const parser = require('../../build/parse');

function int(number) {
  return Primitive(types.INTEGER, number);
}

function makeStmt(expr) {
  return InitBlock([Statement(expr)]);
}

describe('syntaxtree/Call', () => {
  it('should parse collection access calls', () => {
    parser('mycollection[1];').should.eql(makeStmt(
      Call(Identifier('mycollection'), CollectionAccess(int(1)))
    ));

    parser('mycollection[2..5];').should.eql(makeStmt(
      Call(Identifier('mycollection'), CollectionAccess(Range(int(2), int(5))))
    ));

    parser('mycollection[..6];').should.eql(makeStmt(
      Call(Identifier('mycollection'), CollectionAccess(Range(int(1), int(6))))
    ));
  });

  it('should parse function calls', () => {
    parser('myfunction();').should.eql(makeStmt(
      Call(Identifier('myfunction'), FunctionCall([]))
    ));

    parser('myfunction(1);').should.eql(makeStmt(
      Call(Identifier('myfunction'), FunctionCall([int(1)]))
    ));

    parser('myfunction(1, 2, 3);').should.eql(makeStmt(
      Call(Identifier('myfunction'), FunctionCall([int(1), int(2), int(3)]))
    ));

    parser('myfunction(2 * 3);').should.eql(makeStmt(
      Call(
        Identifier('myfunction'),
        FunctionCall([Product(ops.TIMES, int(2), int(3))])
      )
    ));
  });

  it('should parse direct procedure calls', () => {
    parser('procedure(a, b) { return a * b; }(2, 5);').should.eql(makeStmt(
      Call(
        Procedure(
          [Identifier('a'), Identifier('b')],
          Block([
            Return(Product(ops.TIMES, Identifier('a'), Identifier('b'))),
          ])
        ),
        FunctionCall([int(2), int(5)])
      )
    ));
  });
});
