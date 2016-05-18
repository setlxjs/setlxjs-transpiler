import { RANGE, GENERATOR } from '../constants/tokens';

export default function list(tree, transpile, { helperPlugin }) {
  if (tree.builder.token === RANGE) {
    const fnName = helperPlugin.request('range');
    const fromExpr = transpile(tree.builder.fromExpr);
    const toExpr = transpile(tree.builder.toExpr);
    return `${fnName}(${fromExpr}, ${toExpr}).list`;
  } else if (tree.builder.token === GENERATOR) {
    return `${transpile(tree.builder)}.list`;
  }
  return `${helperPlugin.request('l')}(${tree.builder.map(transpile).join(', ')})`;
}
