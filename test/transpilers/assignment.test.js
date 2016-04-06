require('should');

const transpile = require('../../build/transpile');
const Identifier = require('../../build/classes/Identifier');
const Primitive = require('../../build/classes/Primitive');
const Assignment = require('../../build/classes/Assignment');
const AssignableList = require('../../build/classes/AssignableList');

const types = require('../../build/constants/types');

describe('transpilers/assignment', () => {
  it('should transpile normal assignment correctly', () => {
    transpile(
      Assignment(Identifier('myid'), Primitive(types.BOOLEAN, true))
    ).should.be.exactly('myid = true');
  });

  it('should transpile destructuring assignments correctly', () => {
    transpile(
      Assignment(AssignableList([Identifier('x'), Identifier('y')]), Identifier('mylist'))
    ).should.be.exactly('[x, y] = mylist');
  });
});
