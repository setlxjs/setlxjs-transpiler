import { IF_STMT } from '../constants/tokens';

class IfStmt {
  constructor(condition, block, elseBlock = null) {
    this.token = IF_STMT;
    this.condition = condition;
    this.block = block;
    this.elseBlock = elseBlock;
  }

  toString() {
    if (this.elseBlk === null) {
      return `IfStmt( ${this.condition}, ${this.block} )`;
    }
    return `IfStmt( ${this.condition}, ${this.block}, ${this.elseBlock} )`;
  }
}

export default function creator(condition, block, elseBlock = null) {
  return new IfStmt(condition, block, elseBlock);
}
