import { CASE_STMT } from '../constants/tokens';
import indent from '../util/indent';

class CaseStmt {
  constructor(expression, blk) {
    this.token = CASE_STMT;
    this.block = blk;
    this.expression = expression;
  }

  toString() {
    const params = indent(2, `${this.expression},\n ${this.block}`);
    return `CaseStmt(\n${params}\n)`;
  }
}

export default function creator(expression, blk) {
  return new CaseStmt(expression, blk);
}
