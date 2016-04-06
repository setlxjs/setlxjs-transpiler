export default function assignment(tree, transpile) {
  return transpile( tree.receiver ) + ' = ' + transpile( tree.expression );
}
