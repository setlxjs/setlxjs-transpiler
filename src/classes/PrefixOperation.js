import { PREFIX_OPERATION } from '../constants/tokens';

class PrefixOperation {
  constructor(operant, operator) {
    this.token = PREFIX_OPERATION;
    this.operant = operant;
    this.operator = operator;
  }

  toString() {
    return `PrefixOperation( ${this.operant}, ${this.operator} )`;
  }
}

export default function creator(operant, operator) {
  return new PrefixOperation(operant, operator);
}
