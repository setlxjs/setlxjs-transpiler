export default function conjunction(tree, transpile) {
  return transpile(tree.lefthand) + ' && ' + transpile(tree.righthand);
}
