import transpile from '../util/transpile';
import createTranspiler from '../util/createTranspiler';

import { IF_STMT, BLOCK } from '../constants/tokens';

const ifStmt = createTranspiler( IF_STMT, tree => {
  let ret = `if ( ${ transpile( tree.condition ) } ) {\n` +
            transpile( tree.block ) + '}';

  if ( tree.elseBlock !== null ) {
    if ( tree.elseBlock.token === BLOCK ) {
      ret += ` else {\n${ transpile( tree.elseBlock ) }}`;
    } else {
      ret += ' else ' + transpile( tree.elseBlock );
    }
  }

  return ret;
});

export default ifStmt;
