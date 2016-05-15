import transpilers from './transpilers';

import HelperPlugin from './plugins/HelperPlugin';
import StdLibPlugin from './plugins/StdLibPlugin';
import ScopePlugin from './plugins/ScopePlugin';

const defaultPlugins = () => ({
  helperPlugin: new HelperPlugin(),
  stdLibPlugin: new StdLibPlugin(),
  scopePlugin: new ScopePlugin(),
});

export default function createTranspiler(plugins) {
  const mergedPlugins = Object.assign({}, defaultPlugins(), plugins);

  return function transpile(tree) {
    if (typeof transpilers[tree.token] !== 'function') {
      throw new Error(`Could not find transpiler for token type ${tree.token}`);
    }
    return transpilers[tree.token](tree, transpile, mergedPlugins);
  };
}
