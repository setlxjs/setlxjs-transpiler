import { IDENTIFER } from '../constants/tokens';

class Identifer {
  constructor( name ) {
    this.token = IDENTIFER;
    this.name = name;
  }

  toString() {
    return this.token;
  }

  toJS() {
    return this.name;
  }
}

export default function creator( name ) {
  return new Identifer( name );
}
