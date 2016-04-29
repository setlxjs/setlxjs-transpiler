import { WHILE_LOOP } from '../constants/tokens';

class WhileLoop {
  constructor(expression, block) {
    this.token = WHILE_LOOP;
    this.block = block;
    this.expression = expression;
  }

  toString() {
    return `WhileLoop(\n  ${this.expression},\n  ${this.block} \n)`;
  }
}

export default function creator(expression, block) {
  return new WhileLoop(expression, block);
}
