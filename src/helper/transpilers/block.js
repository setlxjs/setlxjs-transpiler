import transpile from '../util/transpile';
import createTranspiler from '../util/createTranspiler';

import { BLOCK } from '../constants/tokens';

const block = createTranspiler( BLOCK, tree => {
  return tree.statements.map(transpile).join('\n') + '\n';
});

export default block;
