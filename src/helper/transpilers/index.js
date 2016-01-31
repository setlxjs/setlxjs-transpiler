import block from './block';
import statement from './statement';
import primitive from './primitive';
import assignment from './assignment';
import identifer from './identifer';
import list from './list';
import ifStmt from './ifStmt';
import disjunction from './disjunction';
import conjunction from './conjunction';

export default [
  primitive,
  identifer,
  list,
  block,
  assignment,
  statement,
  ifStmt,
  disjunction,
  conjunction,
];
