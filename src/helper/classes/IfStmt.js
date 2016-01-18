import { IF_STMT, BLOCK } from '../constants/tokens';

class IfStmt {
  constructor(condition, block, elseBlk = null) {
    this.token = IF_STMT;
    this.condition = condition;
    this.block = block;
    this.elseBlk = elseBlk;
  }

  toString() {
    if ( this.elseBlk === null ) {
      return this.token + `(${this.condition})[${this.block}}]`;
    }
    return this.token + `(${this.condition})[${this.block}}, ${this.elseBlk}]`;
  }
}

export default function creator(condition, block, elseBlk) {
  return new IfStmt(condition, block, elseBlk);
}
