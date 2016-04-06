export default function(tree, transpile) {
  return transpile(tree.lefthand) + ' && ' + transpile(tree.righthand);
}
