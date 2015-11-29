import { ASSIGNMENT } from '../constants/tokens';

class Assignment {
  constructor( receiver, expression ) {
    this.token = ASSIGNMENT;
    this.receiver = receiver;
    this.expression = expression;
  }

  toString() {
    return this.token + '[' + this.expression + ']';
  }

  toJS() {
    return this.receiver.toJS() + ' = ' + this.expression.toJS();
  }
}

export default function creator( receiver, expression ) {
  return new Assignment( receiver, expression );
}
