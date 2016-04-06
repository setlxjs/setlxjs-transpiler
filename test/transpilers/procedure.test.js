require('should');

const transpile = require('../../build/transpile');
const Identifier = require('../../build/classes/Identifier');
const Procedure = require('../../build/classes/Procedure');
const Assignment = require('../../build/classes/Assignment');
const Block = require('../../build/classes/Block');

const assign = (name, value) => Assignment(Identifier(name), value);

describe('transpilers/procedure', () => {
  it('should transpile procedures with a single argument correctly', () => {
    transpile(
      assign('myfunc', Procedure([Identifier('a')], Block([])))
    ).should.be.exactly('myfunc = function(a) {\n}');
  });

  it('should transpile procedures with multiple arguments correctly', () => {
    transpile(
      assign('myfunc', Procedure([Identifier('a'), Identifier('b'), Identifier('c')], Block([])))
    ).should.be.exactly('myfunc = function(a, b, c) {\n}');
  });
});
