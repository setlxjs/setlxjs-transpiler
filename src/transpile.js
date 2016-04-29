import transpilers from './transpilers';

import HelperPlugin from './plugins/HelperPlugin';

const plugins = {
  helperPlugin: new HelperPlugin(),
};

export default function transpile(tree) {
  if (typeof transpilers[tree.token] !== 'function') {
    throw new Error(`Could not find transpiler for token type ${tree.token}`);
  }
  return transpilers[tree.token](tree, transpile, plugins);
}
