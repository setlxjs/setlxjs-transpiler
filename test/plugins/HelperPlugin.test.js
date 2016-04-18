const HelperPlugin = require('../../build/plugins/HelperPlugin');

describe('plugins/HelperPlugin', () => {
  it('should be able to construct', () => {
    (new HelperPlugin()).should.be.an.Object();
  });

  it('should return function names for helpers', () => {
    const plugin = new HelperPlugin();

    plugin.request('range').should.be.exactly('$range');
    plugin.request('add').should.be.exactly('$add');
  });

  it('should declare the imports', () => {
    const plugin = new HelperPlugin();

    plugin.request('range');
    plugin.request('add');

    plugin.imports().should.be.exactly(`var $$import$helper = require('setlxjs-lib/hlp');
var $range = $$import$helper.range;
var $add = $$import$helper.add;`);
  });
});
