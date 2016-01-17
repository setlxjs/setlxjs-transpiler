import { IDENTIFER } from '../constants/tokens';

class Identifer {
  constructor( name ) {
    this.token = IDENTIFER;
    this.name = name;
  }

  toString() {
    return this.token;
  }
}

export default function creator( name ) {
  return new Identifer( name );
}
