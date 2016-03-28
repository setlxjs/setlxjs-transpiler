import { BLOCK } from '../constants/tokens';

class Block {
  constructor( statements ) {
    this.token = BLOCK;
    this.statements = statements;
  }

  toString() {
    return `Block(\n  ${ this.statements.join(',\n  ') }\n)`;
  }
}

export default function creator( statements ) {
  return new Block( statements );
}
