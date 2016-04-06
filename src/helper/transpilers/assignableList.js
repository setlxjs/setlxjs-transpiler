export default function assignableList(tree, transpile) {
  return '[' + tree.assignables.map(transpile).join(', ') + ']';
}
