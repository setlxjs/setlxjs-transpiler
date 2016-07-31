require('should');
const sinon = require('sinon');

const createTranspiler = require('../../build/createTranspiler');
const Identifier = require('../../build/classes/Identifier');
const Comparison = require('../../build/classes/Comparison');
const Statement = require('../../build/classes/Statement');
const Block = require('../../build/classes/Block');
const Primitive = require('../../build/classes/Primitive');
const ForLoop = require('../../build/classes/ForLoop');
const Iterator = require('../../build/classes/Iterator');
const Product = require('../../build/classes/Product');

const ScopePlugin = require('../../build/plugins/ScopePlugin');

const types = require('../../build/constants/types');
const ops = require('../../build/constants/operators');

function makeStmt(expr) {
  return Block([Statement(expr)]);
}

describe('transpilers/forLoop', () => {
  it('should transpile a for loop with one iterator', () => {
    const plugins = {
      scopePlugin: new ScopePlugin(),
    };

    const stub = sinon.stub(plugins.scopePlugin, 'getTempVar');
    stub.onFirstCall().returns('_a');

    const transpile = createTranspiler(plugins);

    transpile(
      ForLoop(
        [Iterator(Identifier('i'), Identifier('x'))],
        null,
        makeStmt(Primitive(types.BOOLEAN, true))
      )
    ).should.be.exactly(
`for(i of x) {
  true;
}`
    );
  });

  it('should transpile a for loop with multiple iterators', () => {
    const plugins = {
      scopePlugin: new ScopePlugin(),
    };

    const stub = sinon.stub(plugins.scopePlugin, 'getTempVar');
    stub.onFirstCall().returns('_a');
    stub.onSecondCall().returns('_b');

    const transpile = createTranspiler(plugins);

    transpile(
      ForLoop(
        [
          Iterator(Identifier('i'), Identifier('x')),
          Iterator(Identifier('t'), Identifier('y')),
          Iterator(Identifier('k'), Identifier('z')),
        ],
        null,
        makeStmt(Primitive(types.BOOLEAN, true))
      )
    ).should.be.exactly(
`_a = $combinations(x.toArray(), y.toArray(), z.toArray());
for(_b = 0; _b < _a.length; ++_b) {
  i = _a[_b][0];
  t = _a[_b][1];
  k = _a[_b][2];
  true;
}`
    );
  });

  it('should transpile a for loop with a condition', () => {
    const plugins = {
      scopePlugin: new ScopePlugin(),
    };

    const stub = sinon.stub(plugins.scopePlugin, 'getTempVar');
    stub.onFirstCall().returns('_a');
    stub.onSecondCall().returns('_b');

    const transpile = createTranspiler(plugins);

    transpile(
      ForLoop(
        [Iterator(Identifier('i'), Identifier('x'))],
        Comparison(
          ops.EQUAL,
          Product(ops.MODULO, Identifier('i'), Primitive(types.INTEGER, 2)),
          Primitive(types.INTEGER, 0)
        ),
        makeStmt(Primitive(types.BOOLEAN, true))
      )
    ).should.be.exactly(
`for(i of x) {
  if (!$equal((i % 2), 0)) continue;
  true;
}`
    );
  });
});
