import { IDENTIFIER } from '../constants/tokens';

export default function generator(tree, transpile, { helperPlugin }) {
  let itParams;
  const itParamsList = tree.iterators.map(it => transpile(it.assignable));
  // if only one arg create "x =>", else "(x, y) =>"
  if (itParamsList.length === 1 && tree.iterators[0].assignable.token === IDENTIFIER) {
    itParams = itParamsList[0];
  } else {
    itParams = `(${itParamsList.join(', ')})`;
  }
  const itExpr = tree.iterators.map(it => transpile(it.expression)).join(', ');

  const mapper = `.map(${itParams} => ${transpile(tree.mapper)})`;
  const gen = `${helperPlugin.request('gen')}(${itExpr})`;
  if (tree.expression) {
    return gen + `.filter(${itParams} => ${transpile(tree.expression)})` + mapper;
  }
  return gen + mapper;
}
