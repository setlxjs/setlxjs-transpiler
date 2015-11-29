import { STATEMENT } from '../constants/tokens';

class Statement {
  constructor( expression ) {
    this.token = STATEMENT;
    this.expression = expression;
  }

  toString() {
    return this.expression.toString();
  }

  toJS() {
    return this.expression.toJS() + ';';
  }
}

export default function creator( expression ) {
  return new Statement( expression );
}
