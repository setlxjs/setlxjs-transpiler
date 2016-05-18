import { RANGE, GENERATOR } from '../constants/tokens';

export default function set({ builder }, transpile, { helperPlugin }) {
  if (typeof builder === 'undefined' || builder === null) {
    const setFn = helperPlugin.request('s');
    return `${setFn}()`;
  }
  if (builder.token === RANGE) {
    const fnName = helperPlugin.request('range');
    const fromExpr = transpile(builder.fromExpr);
    const toExpr = transpile(builder.toExpr);
    return `${fnName}(${fromExpr}, ${toExpr}).set`;
  } else if (builder.token === GENERATOR) {
    return `${transpile(builder)}.set`;
  }
  const setFn = helperPlugin.request('s');
  return `${setFn}(${builder.map(transpile).join(', ')})`;
}
