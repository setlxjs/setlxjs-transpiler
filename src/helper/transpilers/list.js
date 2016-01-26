import transpile from '../util/transpile';
import createTranspiler from '../util/createTranspiler';

import { LIST } from '../constants/tokens';

const list = createTranspiler( LIST, tree => {
  return '[' + tree.elements.map(transpile).join(', ') + ']';
});

export default list;
