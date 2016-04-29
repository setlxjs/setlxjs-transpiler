import { SWITCH_STMT } from '../constants/tokens';
import indent from '../util/indent';

class SwitchStmt {
  constructor(cases) {
    this.token = SWITCH_STMT;
    this.cases = cases;
  }

  toString() {
    return `SwitchStmt([\n${indent(2, this.params.join(',\n'))}\n])`;
  }
}

export default function creator(cases) {
  return new SwitchStmt(cases);
}
