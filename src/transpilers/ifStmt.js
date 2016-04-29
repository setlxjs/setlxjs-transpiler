import indent from '../util/indent';
import { IF_STMT } from '../constants/tokens';

export default function ifStmt({ condition, block, elseBlock }, transpile) {
  let ret = `if (${transpile(condition)}) {\n${indent(2, transpile(block))}}`;
  if (elseBlock) {
    if (elseBlock.token === IF_STMT) {
      ret += ` else ${transpile(elseBlock)}`;
    } else {
      ret += ` else {\n${indent(2, transpile(elseBlock))}}`;
    }
  }
  return ret;
}
