import indent from '../util/indent';

export default function forLoop(tree, transpile, { helperPlugin, scopePlugin }) {
  const temp1 = scopePlugin.getTempVar();
  const temp2 = scopePlugin.getTempVar();
  let expr = '';

  if (tree.expression) {
    expr = `if (!${transpile(tree.expression)}) continue;\n`;
  }

  const assignments = tree.iterators.map((it, index) =>
    `${transpile(it.assignable)} = ${temp1}[${temp2}][${index}];`
  ).join('\n') + '\n';

  const cFn = helperPlugin.request('combinations');
  const combinations = `${cFn}(${tree.iterators.map(it => transpile(it.expression)).join(', ')})`;

  return `${temp1} = ${combinations};
for(${temp2} = 0; ${temp2} < ${temp1}.length; ++${temp2}) {
${indent(2, assignments + expr + transpile(tree.block))}}`;
}
