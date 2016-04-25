import { PLUS } from '../constants/operators';

export default function sum({ operator, lefthand, righthand }, transpile, { helperPlugin }) {
  let fnName;
  if (operator === PLUS) {
    fnName = helperPlugin.request('add');
  } else {
    fnName = helperPlugin.request('sub');
  }
  return `${fnName}(${transpile(lefthand)}, ${transpile(righthand)})`;
}
