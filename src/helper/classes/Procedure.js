import { PROCEDURE } from '../constants/tokens';

class Procedure {
  constructor( params, blk, closure ) {
    this.token = PROCEDURE;
    this.params = params;
    this.closure = closure;
  }

  toString() {
    return `Set( ${ this.params } )`;
  }
}

export default function creator( params, blk, closure = false ) {
  return new Procedure( params, blk, closure );
}
