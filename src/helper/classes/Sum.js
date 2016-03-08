import { SUM } from '../constants/tokens';

class Sum {
  constructor( op, lefthand, righthand ) {
    this.token = SUM;
    this.operator = op;
    this.lefthand = lefthand;
    this.righthand = righthand;
  }

  toString() {
    return `Sum( ${ this.operator }, ${ this.lefthand }, ${ this.righthand } )`;
  }
}

export default function creator( op, lefthand, righthand ) {
  return new Sum( op, lefthand, righthand );
}
