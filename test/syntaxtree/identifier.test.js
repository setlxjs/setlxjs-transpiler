require('should');
const Block = require('../../build/classes/Block');
const Statement = require('../../build/classes/Statement');
const Identifier = require('../../build/classes/Identifier');

const parser = require('../../build/parse');

function makeStmt(expr) {
  return Block([Statement(expr)]);
}

describe('syntaxtree/Identifier', () => {
  it('should parse an identifer', () => {
    parser('test;').should.eql(makeStmt(
      Identifier('test')
    ));

    parser('test_2;').should.eql(makeStmt(
      Identifier('test_2')
    ));

    parser('test_xy;').should.eql(makeStmt(
      Identifier('test_xy')
    ));
  });

  it('should parse only identifers starting with a lower case letter', () => {
    const parseF = string => () => parser(string);

    parseF('Term').should.throw();
    parseF('_underscore').should.throw();
  });
});
