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

  toJS() {
    let ret = `if (${this.condition}) {\n${ this.block.toJS() }}`;

    if ( this.elseBlk !== null ) {
      if ( this.elseBlk.token === BLOCK ) {
        ret += ` else {\n${ this.elseBlk.toJS() }}\n`;
      } else {
        ret += ' else ' + this.elseBlk.toJS();
      }
    }

    return ret + '}\n';
  }
}

export default function creator(condition, block, elseBlk) {
  return new IfStmt(condition, block, elseBlk);
}
