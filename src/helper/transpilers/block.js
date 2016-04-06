export default function block(tree, transpile) {
  return tree.statements.map(transpile).join('\n') + '\n';
}
