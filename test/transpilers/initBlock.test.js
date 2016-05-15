'use strict';
require('should');

const createTranspiler = require('../../build/createTranspiler');
const InitBlock = require('../../build/classes/InitBlock');
const ImportPlugin = require('../../build/plugins/ImportPlugin');

let called = false;
class SpyImportsPlugin extends ImportPlugin {
  imports() {
    called = true;
  }
}

class SpyScopePlugin {
  closeScope() {
    called = true;
  }
}

describe('transpilers/initBlock', () => {
  beforeEach(() => { called = false; });

  it('should transpile empty blocks', () => {
    createTranspiler()(InitBlock([])).should.be.exactly('');
  });

  it('should call the import plugins', () => {
    const transpile = createTranspiler({ stdLibPlugin: new SpyImportsPlugin() });

    transpile(InitBlock([]));
    called.should.be.ok();
  });

  it('should close the outer scope of the scope plugin', () => {
    const transpile = createTranspiler({ scopePlugin: new SpyScopePlugin() });

    transpile(InitBlock([]));
    called.should.be.ok();
  });
});
