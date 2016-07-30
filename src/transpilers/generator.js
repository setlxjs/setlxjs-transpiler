import { IDENTIFIER, ASSIGNABLE_LIST } from '../constants/tokens';
import indent from '../util/indent';

/**
 * This function creates Lambda functions for generators.
 * This has many cases:
 * - Standard single parameter generator: expr: x in a -> x => expr
 * - Standard multi parameter generator: expr: x in a, y in b -> (x, y) => expr
 * - Destructuring single parameter generator: expr: [x, y] in a -> ($temp) => {
 *     var [x, y] = $temp.toArray();
 *     return expr;
 *   }
 * - Destructuring multi parameter assignment
 */
function createLambdaMaker(tree, transpile, scopePlugin) {
  scopePlugin.newScope();
  const temps = [];
  const itParamsList = tree.iterators.map(it => {
    // if it is AssignableList assign temp variable and create assignment for function body
    if (it.assignable.token === ASSIGNABLE_LIST) {
      const tempVar = scopePlugin.getTempVar();
      temps.push(`var ${transpile(it.assignable)} = ${tempVar}.toArray();`);
      return tempVar;
    }
    return transpile(it.assignable);
  });
  scopePlugin.closeScope();
  return expr => {
    let body;
    if (temps.length > 0) {
      body = '{\n' + indent(2, temps.join('\n') + `\nreturn ${transpile(expr)};`) + '\n}';
    } else {
      body = transpile(expr);
    }
    if (itParamsList.length === 1 && tree.iterators[0].assignable.token === IDENTIFIER) {
      return itParamsList[0] + ' => ' + body;
    }
    return `(${itParamsList.join(', ')}) => ${body}`;
  };
}

export default function generator(tree, transpile, { helperPlugin, scopePlugin }) {
  const lambdaMaker = createLambdaMaker(tree, transpile, scopePlugin);
  const itExpr = tree.iterators.map(it => transpile(it.expression)).join(', ');

  const mapper = `.map(${lambdaMaker(tree.mapper)})`;
  const gen = `${helperPlugin.request('gen')}(${itExpr})`;
  if (tree.expression) {
    return gen + `.filter(${lambdaMaker(tree.expression)})` + mapper;
  }
  return gen + mapper;
}
