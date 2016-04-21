import { RANGE } from '../constants/tokens';

export default function list(tree, transpile, { helperPlugin }) {
  if (tree.builder.token === RANGE) {
    const fnName = helperPlugin.request('range');
    const fromExpr = transpile(tree.builder.fromExpr);
    const toExpr = transpile(tree.builder.toExpr);
    return `${fnName}(${fromExpr}, ${toExpr})`;
  }
  return `[${tree.builder.map(transpile).join(', ')}]`;
}
