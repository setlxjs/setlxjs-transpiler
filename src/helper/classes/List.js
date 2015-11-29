import { LIST } from '../constants/tokens';

class List {
  constructor( elements ) {
    this.token = LIST;
    this.elements = elements;
  }

  toString() {
    return this.token + '[' + this.elements.join(', ') + ']';
  }

  toJS() {
    return '[' + this.elements.map(elem => elem.toJS()).join(', ') + ']';
  }
}

export default function creator( elements ) {
  return new List( elements );
}
