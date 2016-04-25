import { TIMES, DIVIDED_BY, MODULO, INTEGER_DIVISION } from '../constants/operators';
import UnsupportedError from '../errors/UnsupportedError';

export default function sum({ operator, lefthand, righthand }, transpile, { helperPlugin }) {
  switch (operator) {
    case TIMES:
      return `${helperPlugin.request('mul')}(${transpile(lefthand)}, ${transpile(righthand)})`;
    case DIVIDED_BY:
      return `(${transpile(lefthand)} / ${transpile(righthand)})`;
    case MODULO:
      return `(${transpile(lefthand)} % ${transpile(righthand)})`;
    case INTEGER_DIVISION:
      return `Math.floor(${transpile(lefthand)} / ${transpile(righthand)})`;
    default:
      throw new UnsupportedError(`Product operator ${operator}`);
  }
}
