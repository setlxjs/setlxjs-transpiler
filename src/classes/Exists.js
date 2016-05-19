import { EXISTS } from '../constants/tokens';

class Exists {
  constructor(iterators, condition) {
    this.token = EXISTS;
    this.iterators = iterators;
    this.condition = condition;
  }

  toString() {
    return `Exists([${this.iterators.join(', ')}], ${this.condition})`;
  }
}

export default function creator(iterators, condition) {
  return new Exists(iterators, condition);
}
