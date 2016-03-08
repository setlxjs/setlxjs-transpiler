import { LIST } from '../constants/tokens';

class List {
  constructor( elements ) {
    this.token = LIST;
    this.elements = elements;
  }

  toString() {
    return `List( ${ this.elements.join(', ') } )`;
  }
}

export default function creator( elements ) {
  return new List( elements );
}
