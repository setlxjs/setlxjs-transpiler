import { PREFIX_MINUS, PREFIX_PLUS, PREFIX_TIMES, PREFIX_LENGTH } from '../constants/operators';
import UnsupportedError from '../errors/UnsupportedError';

export default function prefixOperation({ operator, operant }, transpile, { helperPlugin }) {
  switch (operator) {
    case PREFIX_MINUS:
      return `-${transpile(operant)}`;
    case PREFIX_PLUS:
      return `${transpile(operant)}.reduce(${helperPlugin.request('add')})`;
    case PREFIX_TIMES:
      return `${transpile(operant)}.reduce(${helperPlugin.request('mul')})`;
    case PREFIX_LENGTH:
      return `${transpile(operant)}.length`;
    default:
      throw new UnsupportedError(`Prefix operator ${operator}`);
  }
}