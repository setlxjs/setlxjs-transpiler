require('should');
const Block = require('../../build/classes/Block');
const Statement = require('../../build/classes/Statement');
const Identifer = require('../../build/classes/Identifer');
const Primitive = require('../../build/classes/Primitive');
const Assignment = require('../../build/classes/Assignment');
const Return = require('../../build/classes/Return');
const Procedure = require('../../build/classes/Procedure');

const types = require('../../build/constants/types');

const parser = require('../../build/parse');

function makeStmt(expr) {
  return Block([Statement(expr)]);
}

describe('Procedure', () => {
  it('should parse procedures as expressions', () => {
    parser('procedure() { return true; };').should.eql(makeStmt(
      Procedure(
        [],
        Block([Return(Primitive(types.BOOLEAN, true))])
      )
    ));
  });

  it('should parse closures as expressions', () => {
    parser('closure() { return true; };').should.eql(makeStmt(
      Procedure(
        [],
        Block([Return(Primitive(types.BOOLEAN, true))]),
        true
      )
    ));
  });

  it('should parse procedures in assignments', () => {
    parser('alwaystrue := procedure() { return true; };').should.eql(makeStmt(
      Assignment(
        Identifer('alwaystrue'),
        Procedure(
          [],
          Block([Return(Primitive(types.BOOLEAN, true))])
        )
      )
    ));
  });
});
