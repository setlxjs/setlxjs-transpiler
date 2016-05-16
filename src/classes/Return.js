import { RETURN } from '../constants/tokens';

class Return {
  constructor(expression = null) {
    this.token = RETURN;
    this.expression = expression;
  }

  toString() {
    return this.expression ? `Return( ${this.expression} )` : 'Return()';
  }
}

export default function creator(expression = null) {
  return new Return(expression);
}
