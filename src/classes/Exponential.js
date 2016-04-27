import { EXPONENTIAL } from '../constants/tokens';

class Exponential {
  constructor(lefthand, righthand) {
    this.token = EXPONENTIAL;
    this.lefthand = lefthand;
    this.righthand = righthand;
  }

  toString() {
    return `Exponential( ${this.lefthand}, ${this.righthand} )`;
  }
}

export default function creator(lefthand, righthand) {
  return new Exponential(lefthand, righthand);
}
