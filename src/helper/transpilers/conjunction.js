import transpile from '../util/transpile';
import createTranspiler from '../util/createTranspiler';

import { CONJUNCTION } from '../constants/tokens';

const ifStmt = createTranspiler( CONJUNCTION, tree => {
  return transpile(tree.lefthand) + ' && ' + transpile(tree.righthand);
});

export default ifStmt;
