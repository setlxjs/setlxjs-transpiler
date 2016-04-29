import { PRODUCT } from '../constants/tokens';

class Product {
  constructor(op, lefthand, righthand) {
    this.token = PRODUCT;
    this.operator = op;
    this.lefthand = lefthand;
    this.righthand = righthand;
  }

  toString() {
    return `Product( ${this.operator}, ${this.lefthand}, ${this.righthand} )`;
  }
}

export default function creator(op, lefthand, righthand) {
  return new Product(op, lefthand, righthand);
}
