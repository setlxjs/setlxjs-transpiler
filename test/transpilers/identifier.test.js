require('should');
const sinon = require('sinon');

const createTranspiler = require('../../build/createTranspiler');
const Identifier = require('../../build/classes/Identifier');

describe('transpilers/identifier', () => {
  it('should transpile to the provided name correctly', () => {
    const name = 'myid';
    createTranspiler()(Identifier(name)).should.be.exactly(name);
  });

  it('should register the identifier name to the scope plugin', () => {
    const scopePlugin = { register: sinon.spy() };
    const stdLibPlugin = { isStd: sinon.stub().returns(false) };
    const transpile = createTranspiler({ scopePlugin, stdLibPlugin });
    transpile(Identifier('myid'));

    sinon.assert.calledOnce(scopePlugin.register);
    sinon.assert.calledWith(scopePlugin.register, 'myid');

    sinon.assert.calledOnce(stdLibPlugin.isStd);
    sinon.assert.calledWith(stdLibPlugin.isStd, 'myid');
  });
});
