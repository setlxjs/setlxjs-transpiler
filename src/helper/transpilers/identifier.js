import createTranspiler from '../util/createTranspiler';

import { IDENTIFIER } from '../constants/tokens';

const identifier = createTranspiler( IDENTIFIER, tree => tree.name );

export default identifier;
