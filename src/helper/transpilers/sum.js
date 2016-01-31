import transpile from '../util/transpile';
import createTranspiler from '../util/createTranspiler';

import { SUM } from '../constants/tokens';
import { PLUS, MINUS } from '../constants/operators';

const ifStmt = createTranspiler( SUM, tree => {
  if (tree.operator === PLUS) {
    return `__add( ${transpile(tree.lefthand)}, ${ transpile(tree.righthand) } )`;
  }

  if (tree.operator === MINUS) {
    return `__sub( ${transpile(tree.lefthand)}, ${ transpile(tree.righthand) } )`;
  }
});

export default ifStmt;
