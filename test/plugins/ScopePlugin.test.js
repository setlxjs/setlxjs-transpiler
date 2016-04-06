require('should');

const ScopePlugin = require('../../build/plugins/ScopePlugin');

describe('plugins/ScopePlugin', () => {
  it('should be able to construct', () => {
    (new ScopePlugin()).should.be.an.Object();
  });

  it('should initiate with a new empty scope', () => {
    const instance = new ScopePlugin();

    (() => instance.currentScope).should.not.throw();
    instance.currentScope.should.have.ownProperty('vars');

    instance.currentScope.vars.should.have.length(0);
  });

  it('should register vars in the current scope', () => {
    const instance = new ScopePlugin();

    instance.currentScope.vars.should.have.length(0);

    instance.register('myvar1');
    instance.currentScope.vars.should.eql(['myvar1']);

    instance.register('myvar2');
    instance.currentScope.vars.should.eql(['myvar1', 'myvar2']);

    instance.register('myvar1');
    instance.currentScope.vars.should.eql(['myvar1', 'myvar2']);
  });

  it('should print the var definition on close', () => {
    const instance = new ScopePlugin();

    instance.register('myvar1');
    instance.register('myvar2');

    const js = instance.closeScope();

    js.should.eql('var myvar1, myvar2;');

    (() => instance.currentScope).should.throw();
  });

  it('should open new scopes on top', () => {
    const instance = new ScopePlugin();

    instance.register('somevar');

    instance.newScope();
    instance.currentScope.vars.should.have.length(0);
  });

  it('should close scopes from the top', () => {
    const instance = new ScopePlugin();

    instance.register('rootscope');

    instance.newScope();
    instance.currentScope.vars.should.have.length(0);
    instance.register('topscope');
    instance.currentScope.vars.should.eql(['topscope']);
    instance.closeScope();

    instance.currentScope.vars.should.eql(['rootscope']);
  });

  it('should create helper variables in the current scope', () => {
    var ind;
    const instance = new ScopePlugin();
    const tempVarRegex = /^_[a-zA-Z]{2}$/;

    const tempVar = instance.getTempVar();

    tempVar.should.match(tempVarRegex);
    instance.currentScope.vars.should.containEql(tempVar);

    for (ind = 0; ind < 30; ind++) {
      instance.getTempVar().should.match(tempVarRegex);
    }
  });
});
