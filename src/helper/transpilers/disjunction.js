export default function disjunction(tree, transpile) {
  return transpile(tree.lefthand) + ' || ' + transpile(tree.righthand);
}
