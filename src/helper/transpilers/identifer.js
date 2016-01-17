import createTranspiler from '../util/createTranspiler';

import { IDENTIFER } from '../constants/tokens.js';

const identifer = createTranspiler( IDENTIFER, tree => tree.name );

export default identifer;
