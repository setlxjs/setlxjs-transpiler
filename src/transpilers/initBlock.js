import block from './block';
import ImportPlugin from '../plugins/ImportPlugin';

export default function initBlock(tree, transpile, plugins) {
  const blockRes = block(tree, transpile, plugins);
  const declarations = [];
  const keys = Object.keys(plugins);

  keys.forEach(key => {
    if (plugins[key] instanceof ImportPlugin) {
      declarations.push(plugins[key].imports());
    }
  });

  declarations.push(plugins.scopePlugin.closeScope());

  const header = declarations.filter(dec => dec !== '').join('\n');

  return `${header === '' ? '' : header + '\n'}${blockRes}`;
}
