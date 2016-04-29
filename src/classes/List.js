import { LIST } from '../constants/tokens';

class List {
  constructor(builder) {
    this.token = LIST;
    this.builder = builder;
  }

  toString() {
    return this.builder ? `List( ${this.builder} )` : 'List()';
  }
}

export default function creator(builder) {
  return new List(builder);
}
