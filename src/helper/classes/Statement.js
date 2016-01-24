import { STATEMENT } from '../constants/tokens';

class Statement {
  constructor( child ) {
    this.token = STATEMENT;
    this.child = child;
  }

  toString() {
    return this.child.toString();
  }
}

export default function creator( child ) {
  return new Statement( child );
}
