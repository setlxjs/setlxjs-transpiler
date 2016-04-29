import { SET } from '../constants/tokens';

// This one is called SetlSet to not collide with JavaScript's Set
class SetlSet {
  constructor(builder) {
    this.token = SET;
    this.builder = builder;
  }

  toString() {
    return this.builder ? `Set( ${this.builder} )` : 'Set()';
  }
}

export default function creator(builder) {
  return new SetlSet(builder);
}
