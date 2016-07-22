require('should');

const sinon = require('sinon');

const createTranspiler = require('../../build/createTranspiler');
const Identifier = require('../../build/classes/Identifier');
const Primitive = require('../../build/classes/Primitive');
const Assignment = require('../../build/classes/Assignment');
const AssignableList = require('../../build/classes/AssignableList');
const Call = require('../../build/classes/Call');
const CollectionAccess = require('../../build/classes/CollectionAccess');

const types = require('../../build/constants/types');

describe('transpilers/assignment', () => {
  it('should transpile normal assignment correctly', () => {
    createTranspiler()(
      Assignment(Identifier('myid'), Primitive(types.BOOLEAN, true))
    ).should.be.exactly('myid = true');
  });

  it('should transpile destructuring assignments correctly', () => {
    createTranspiler()(
      Assignment(AssignableList([Identifier('x'), Identifier('y')]), Identifier('mylist'))
    ).should.be.exactly('[x, y] = mylist.toArray()');
  });

  it('should transpile list elements assignments correctly', () => {
    createTranspiler()(
      Assignment(
        Call(Identifier('mylist'), CollectionAccess(Primitive(types.INTEGER, 1))),
        Primitive(types.INTEGER, 2)
      )
    ).should.be.exactly('mylist = mylist.set(1, 2)');
  });

  it('should register the identifier name to the scope plugin', () => {
    const scopePlugin = { register: sinon.spy() };
    const stdLibPlugin = { isStd: sinon.stub().returns(false) };
    const transpile = createTranspiler({ scopePlugin, stdLibPlugin });
    transpile(Assignment(Identifier('myid'), Primitive(types.BOOLEAN, true)));

    sinon.assert.calledOnce(scopePlugin.register);
    sinon.assert.calledWith(scopePlugin.register, 'myid');

    sinon.assert.calledTwice(stdLibPlugin.isStd);
    sinon.assert.calledWith(stdLibPlugin.isStd, 'myid');
  });
});
