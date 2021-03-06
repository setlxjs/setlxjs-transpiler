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

export default function comparison({ operator, lefthand, righthand }, transpile, { helperPlugin }) {
  switch (operator) {
    case EQUAL:
      return `${helperPlugin.request('equal')}(${transpile(lefthand)}, ${transpile(righthand)})`;
    case NOT_EQUAL:
      return `!${helperPlugin.request('equal')}(${transpile(lefthand)}, ${transpile(righthand)})`;
    case GREATER_EQUAL_THAN:
      return `${helperPlugin.request('gte')}(${transpile(lefthand)}, ${transpile(righthand)})`;
    case LESS_EQUAL_THAN:
      return `${helperPlugin.request('lte')}(${transpile(lefthand)}, ${transpile(righthand)})`;
    case GREATER_THAN:
      return `${helperPlugin.request('gt')}(${transpile(lefthand)}, ${transpile(righthand)})`;
    case LESS_THAN:
      return `${helperPlugin.request('lt')}(${transpile(lefthand)}, ${transpile(righthand)})`;
    case IS_IN:
      return `${transpile(righthand)}.contains(${transpile(lefthand)})`;
    case IS_NOT_IN:
      return `!${transpile(righthand)}.contains(${transpile(lefthand)})`;
    default:
      throw new UnsupportedError(`Comparison operator ${operator}`);
  }
}
