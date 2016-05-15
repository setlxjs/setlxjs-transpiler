require('should');

const transpile = require('../../build/transpile')();
const Identifier = require('../../build/classes/Identifier');
const AssignableList = require('../../build/classes/AssignableList');

describe('transpilers/assignableList', () => {
  it('should transpile lists of a single identifier correctly', () => {
    transpile(AssignableList([Identifier('x')])).should.be.exactly('[x]');
  });

  it('should transpile lists of multiple identifiers correctly', () => {
    transpile(AssignableList([Identifier('x'), Identifier('y')])).should.be.exactly('[x, y]');
    transpile(
      AssignableList([Identifier('x'), Identifier('y'), Identifier('z')])
    ).should.be.exactly('[x, y, z]');
  });
});
