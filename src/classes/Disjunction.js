import { DISJUNCTION } from '../constants/tokens';

class Disjunction {
  constructor(lefthand, righthand) {
    this.token = DISJUNCTION;
    this.lefthand = lefthand;
    this.righthand = righthand;
  }

  toString() {
    return `Disjunction( ${this.lefthand}, ${this.righthand} )`;
  }
}

export default function creator(lefthand, righthand) {
  return new Disjunction(lefthand, righthand);
}
