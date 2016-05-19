require('should');

const transpile = require('../../build/createTranspiler')();
const Identifier = require('../../build/classes/Identifier');
const Primitive = require('../../build/classes/Primitive');
const Assignment = require('../../build/classes/Assignment');
const AssignableList = require('../../build/classes/AssignableList');
const Call = require('../../build/classes/Call');
const CollectionAccess = require('../../build/classes/CollectionAccess');

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
    ).should.be.exactly('[x, y] = mylist.toArray()');
  });

  it('should transpile list elements assignments correctly', () => {
    transpile(
      Assignment(
        Call(Identifier('mylist'), CollectionAccess(Primitive(types.INTEGER, 1))),
        Primitive(types.INTEGER, 2)
      )
    ).should.be.exactly('mylist = mylist.set(1, 2)');
  });
});
