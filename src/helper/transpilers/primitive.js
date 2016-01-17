import createTranspiler from '../util/createTranspiler';

import { PRIMITIVE } from '../constants/tokens.js';

const primitive = createTranspiler( PRIMITIVE, tree => tree.value.toString() );

export default primitive;
