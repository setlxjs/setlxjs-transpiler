import indent from '../util/indent';

export default function procedure({ params, block }, transpile, { scopePlugin }) {
  scopePlugin.newScope(params.map(param => param.name));
  const body = transpile(block);
  const varDefs = scopePlugin.closeScope();
  const fullBody = indent(2, (varDefs ? varDefs + '\n' : '') + body);
  return `function(${params.map(transpile).join(', ')}) {\n${fullBody}}`;
}
