const StdLibPlugin = require('../../build/plugins/StdLibPlugin');

describe('plugins/StdLibPlugin', () => {
  it('should be able to construct', () => {
    (new StdLibPlugin()).should.be.an.Object();
  });

  it('should return function names for helpers', () => {
    const plugin = new StdLibPlugin();

    plugin.isStd('printx').should.not.be.ok();
    plugin.isStd('print').should.be.ok();
  });

  it('should declare the imports', () => {
    const plugin = new StdLibPlugin();

    plugin.isStd('printx');
    plugin.isStd('print');

    plugin.imports().should.be.exactly(`var $$import$stdlib = require('setlxjs-lib/std');
var print = $$import$stdlib.print;`);
  });
});
