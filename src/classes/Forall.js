import { FORALL } from '../constants/tokens';

class Forall {
  constructor(iterators, condition) {
    this.token = FORALL;
    this.iterators = iterators;
    this.condition = condition;
  }

  toString() {
    return `Forall([${this.iterators.join(', ')}], ${this.condition})`;
  }
}

export default function creator(iterators, condition) {
  return new Forall(iterators, condition);
}
