import createTranspiler from '../util/createTranspiler';

import { PRIMITIVE } from '../constants/tokens';

const primitive = createTranspiler( PRIMITIVE, tree => tree.value.toString() );

export default primitive;
