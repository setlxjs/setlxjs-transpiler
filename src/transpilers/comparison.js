import {
  EQUAL,
  NOT_EQUAL,
  GREATER_EQUAL_THAN,
  LESS_EQUAL_THAN,
  GREATER_THAN,
  LESS_THAN,
  IS_IN,
  IS_NOT_IN,
} from '../constants/operators';
import UnsupportedError from '../errors/UnsupportedError';

export default function sum({ operator, lefthand, righthand }, transpile, { helperPlugin }) {
  switch (operator) {
    case EQUAL:
      return `${helperPlugin.request('equal')}(${transpile(lefthand)}, ${transpile(righthand)})`;
    case NOT_EQUAL:
      return `!${helperPlugin.request('equal')}(${transpile(lefthand)}, ${transpile(righthand)})`;
    case GREATER_EQUAL_THAN:
      return `(${transpile(lefthand)} >= ${transpile(righthand)})`;
    case LESS_EQUAL_THAN:
      return `(${transpile(lefthand)} <= ${transpile(righthand)})`;
    case GREATER_THAN:
      return `(${transpile(lefthand)} > ${transpile(righthand)})`;
    case LESS_THAN:
      return `(${transpile(lefthand)} < ${transpile(righthand)})`;
    case IS_IN:
      return `${transpile(lefthand)}.contains(${transpile(righthand)})`;
    case IS_NOT_IN:
      return `!${transpile(lefthand)}.contains(${transpile(righthand)})`;
    default:
      throw new UnsupportedError(`Comparison operator ${operator}`);
  }
}
