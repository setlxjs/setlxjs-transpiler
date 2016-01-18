import transpile from '../util/transpile';
import createTranspiler from '../util/createTranspiler';

import { IF_STMT, BLOCK } from '../constants/tokens.js';

const ifStmt = createTranspiler( IF_STMT, tree => {
  let ret = `if ( ${ transpile( tree.condition ) } ) {\n` +
            transpile( tree.block ) + '}';

  if ( tree.elseBlk !== null ) {
    if ( tree.elseBlk.token === BLOCK ) {
      ret += ` else {\n${ transpile( tree.elseBlk ) }}`;
    } else {
      ret += ' else ' + transpile( tree.elseBlk );
    }
  }

  return ret;
});

export default ifStmt;
