export default function block(tree, transpile) {
  if (tree.statements.length === 0) {
    return '';
  }
  return tree.statements.map(transpile).join('\n') + '\n';
}
