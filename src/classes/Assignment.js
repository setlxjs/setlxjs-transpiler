import { ASSIGNMENT } from '../constants/tokens';

class Assignment {
  constructor( receiver, expression ) {
    this.token = ASSIGNMENT;
    this.receiver = receiver;
    this.expression = expression;
  }

  toString() {
    return `Assignment( ${ this.receiver }, ${ this.expression } )`;
  }
}

export default function creator( receiver, expression ) {
  return new Assignment( receiver, expression );
}
