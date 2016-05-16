require('should');
const InitBlock = require('../../build/classes/InitBlock');
const Return = require('../../build/classes/Return');
const Identifier = require('../../build/classes/Identifier');

const parser = require('../../build/parse');

describe('syntaxtree/returnStmt', () => {
  it('should parse a return statement with an expression', () => {
    parser('return test;').should.eql(InitBlock([Return(Identifier('test'))]));
  });
  it('should parse a return statement with an expression', () => {
    parser('return;').should.eql(InitBlock([Return()]));
  });
});
