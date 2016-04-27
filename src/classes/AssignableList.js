import { ASSIGNABLE_LIST, IDENTIFIER } from '../constants/tokens';
import { UnsupportedError } from '../errors/UnsupportedError';

class AssignableList {
  constructor(assignables) {
    this.token = ASSIGNABLE_LIST;
    this.assignables = assignables;
  }

  toString() {
    return `AssignableList( ${this.assignables.join(', ')})`;
  }
}

export default function creator(assignables) {
  if (!assignables.every(assignable => assignable.token === IDENTIFIER)) {
    throw new UnsupportedError('Nested list assignments');
  }
  return new AssignableList(assignables);
}
