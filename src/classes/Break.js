import { BREAK_STMT } from '../constants/tokens';

class Break {
  constructor() {
    this.token = BREAK_STMT;
  }

  toString() {
    return 'Break()';
  }
}

export default function creator() {
  return new Break();
}
