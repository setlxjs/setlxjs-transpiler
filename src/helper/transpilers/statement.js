import transpile from '../util/transpile';
import createTranspiler from '../util/createTranspiler';

import { STATEMENT } from '../constants/tokens.js';

const statement = createTranspiler( STATEMENT, tree => {
  return transpile( tree.expression ) + ';';
});

export default statement;
