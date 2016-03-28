require('should');
const Block = require('../../build/classes/Block');
const Statement = require('../../build/classes/Statement');
const Identifer = require('../../build/classes/Identifer');

const parser = require('../../build/parse');

function makeStmt(expr) {
  return Block([Statement(expr)]);
}

describe('Identifer', () => {
  it('should parse an identifer', () => {
    parser('test;').should.eql(makeStmt(
      Identifer('test')
    ));

    parser('test_2;').should.eql(makeStmt(
      Identifer('test_2')
    ));

    parser('test_xy;').should.eql(makeStmt(
      Identifer('test_xy')
    ));
  });

  it('should parse only identifers starting with a lower case letter', () => {
    const parseF = string => () => parser(string);

    parseF('Term').should.throw();
    parseF('_underscore').should.throw();
  });
});
