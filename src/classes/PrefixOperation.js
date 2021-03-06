import { PREFIX_OPERATION } from '../constants/tokens';

class PrefixOperation {
  constructor(operator, operant) {
    this.token = PREFIX_OPERATION;
    this.operant = operant;
    this.operator = operator;
  }

  toString() {
    return `PrefixOperation( ${this.operator}, ${this.operant} )`;
  }
}

export default function creator(operator, operant) {
  return new PrefixOperation(operator, operant);
}
