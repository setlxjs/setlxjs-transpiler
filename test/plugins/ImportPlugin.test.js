const ImportPlugin = require('../../build/plugins/ImportPlugin');

const makeImp = (varName, importName) => ({ importName, varName });

describe('plugins/ImportPlugin', () => {
  it('should be able to construct', () => {
    (new ImportPlugin()).should.be.an.Object();
  });

  it('should initiate with empty imports', () => {
    const plugin = new ImportPlugin();

    plugin.imps.should.eql([]);
  });

  it('should be able to add imports', () => {
    const plugin = new ImportPlugin();

    plugin.addImport('varn', 'impname');

    plugin.imps.should.have.length(1);
    plugin.imps[0].should.eql(makeImp('varn', 'impname'));
  });

  it('should declare the imports', () => {
    const plugin = new ImportPlugin('myimport', 'mypath');

    plugin.addImport('varn1', 'impname1');
    plugin.addImport('varn2', 'impname2');

    plugin.imports().should.be.exactly(`var $$import$myimport = require('mypath');
var varn1 = $$import$myimport.impname1;
var varn2 = $$import$myimport.impname2;`);
  });
});
