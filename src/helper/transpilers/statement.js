import transpile from '../util/transpile';
import createTranspiler from '../util/createTranspiler';

import { STATEMENT } from '../constants/tokens';

const statement = createTranspiler( STATEMENT, tree => {
  return transpile( tree.child ) + ';';
});

export default statement;
