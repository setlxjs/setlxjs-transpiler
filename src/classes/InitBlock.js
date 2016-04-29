import { INIT_BLOCK } from '../constants/tokens';
import indent from '../util/indent';

class Block {
  constructor(statements) {
    this.token = INIT_BLOCK;
    this.statements = statements;
  }

  toString() {
    return `InitBlock(\n${indent(2, this.statements.join(',\n'))}\n)`;
  }
}

export default function creator(statements) {
  return new Block(statements);
}
