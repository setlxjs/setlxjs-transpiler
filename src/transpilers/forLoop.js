import indent from '../util/indent';
import { ASSIGNABLE_LIST } from '../constants/tokens';

export default function forLoop(tree, transpile, { helperPlugin, scopePlugin }) {
  let expr = '';

  if (tree.expression) {
    expr = `if (!${transpile(tree.expression)}) continue;\n`;
  }
  if (tree.iterators.length === 1) {
    // let's skip all this combinations stuff and just return a "for of" loop
    // either with a destructuring assignment: for ([a, b] in pairs)
    if (tree.iterators[0].assignable.token === ASSIGNABLE_LIST) {
      const temp = scopePlugin.getTempVar();
      const destructure = `${transpile(tree.iterators[0].assignable)} = ${temp}.toArray();\n`;
      return `for(${temp} of ${transpile(tree.iterators[0].expression)}) {\n` +
        indent(2, destructure + expr + transpile(tree.block)) + '}';
    }
    // or simple assignment: for (a in x)
    return `for(${transpile(tree.iterators[0].assignable)} of ` +
      `${transpile(tree.iterators[0].expression)}) {\n` +
      indent(2, expr + transpile(tree.block)) + '}';
  }
  const temp1 = scopePlugin.getTempVar();
  const temp2 = scopePlugin.getTempVar();

  const assignments = tree.iterators.map((it, index) =>
    `${transpile(it.assignable)} = ${temp1}[${temp2}][${index}]` +
    (it.assignable.token === ASSIGNABLE_LIST ? '.toArray()' : '') + ';'
  ).join('\n') + '\n';

  const cFn = helperPlugin.request('combinations');
  const its = tree.iterators.map(it => transpile(it.expression) + '.toArray()').join(', ');
  const combinations = `${cFn}(${its})`;

  return `${temp1} = ${combinations};
for(${temp2} = 0; ${temp2} < ${temp1}.length; ++${temp2}) {
${indent(2, assignments + expr + transpile(tree.block))}}`;
}
