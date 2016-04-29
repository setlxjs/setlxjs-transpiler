import { ITERATOR } from '../constants/tokens';

class Iterator {
  constructor(assignable, expression) {
    this.token = ITERATOR;
    this.assignable = assignable;
    this.expression = expression;
  }

  toString() {
    return `Iterator( ${this.assignable}, ${this.expression} )`;
  }
}

export default function creator(assignable, expression) {
  return new Iterator(assignable, expression);
}
