import transpile from '../util/transpile';
import createTranspiler from '../util/createTranspiler';

import { DISJUNCTION } from '../constants/tokens';

const ifStmt = createTranspiler( DISJUNCTION, tree => {
  return transpile(tree.lefthand) + ' || ' + transpile(tree.righthand);
});

export default ifStmt;
