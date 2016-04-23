import { IDENTIFIER } from '../constants/tokens';

class Identifier {
  constructor( name ) {
    this.token = IDENTIFIER;
    this.name = name;
  }

  toString() {
    return 'Identifier';
  }
}

export default function creator( name ) {
  return new Identifier( name );
}
