export default function procedure(tree, transpile) {
  return `function(${ tree.params.map(transpile).join(', ') }) {\n${ transpile(tree.block) }}`;
}
