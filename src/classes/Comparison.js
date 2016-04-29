import { COMPARISON } from '../constants/tokens';

class Comparison {
  constructor(op, lefthand, righthand) {
    this.token = COMPARISON;
    this.operator = op;
    this.lefthand = lefthand;
    this.righthand = righthand;
  }

  toString() {
    return `Comparison( ${this.operator}, ${this.lefthand}, ${this.righthand} )`;
  }
}

export default function creator(op, lefthand, righthand) {
  return new Comparison(op, lefthand, righthand);
}
