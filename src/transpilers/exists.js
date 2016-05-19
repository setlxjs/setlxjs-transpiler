import { IDENTIFIER } from '../constants/tokens';

export default function exists({ iterators, condition }, transpile, { helperPlugin }) {
  const its = iterators.map(it => transpile(it.expression)).join(', ');
  const gen = `${helperPlugin.request('gen')}(${its})`;
  let itParams;
  if (iterators.length === 1 && iterators[0].assignable.token === IDENTIFIER) {
    itParams = transpile(iterators[0].assignable);
  } else {
    itParams = `(${iterators.map(it => transpile(it.assignable)).join(', ')})`;
  }

  return `${gen}.some(${itParams} => ${transpile(condition)})`;
}
