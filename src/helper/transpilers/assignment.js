import transpile from '../util/transpile';
import createTranspiler from '../util/createTranspiler';

import { ASSIGNMENT } from '../constants/tokens';

const assignment = createTranspiler( ASSIGNMENT, tree => {
  return transpile( tree.receiver ) + ' = ' + transpile( tree.expression );
});

export default assignment;
