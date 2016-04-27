import { RETURN } from '../constants/tokens';

class Return {
  constructor(expression) {
    this.token = RETURN;
    this.expression = expression;
  }

  toString() {
    return this.expression ? `Return( ${this.expression} )` : 'Return()';
  }
}

export default function creator(expression) {
  return new Return(expression);
}
