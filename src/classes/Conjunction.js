import { CONJUNCTION } from '../constants/tokens';

class Conjunction {
  constructor(lefthand, righthand) {
    this.token = CONJUNCTION;
    this.lefthand = lefthand;
    this.righthand = righthand;
  }

  toString() {
    return `Conjunction( ${this.lefthand}, ${this.righthand} )`;
  }
}

export default function creator(lefthand, righthand) {
  return new Conjunction(lefthand, righthand);
}
