import { BLOCK } from '../constants/tokens';
import indent from '../util/indent';

class Block {
  constructor(statements) {
    this.token = BLOCK;
    this.statements = statements;
  }

  toString() {
    return `Block(\n${indent(2, this.statements.join(',\n'))}\n)`;
  }
}

export default function creator(statements) {
  return new Block(statements);
}
