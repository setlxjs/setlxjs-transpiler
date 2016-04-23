import { CALL } from '../constants/tokens';
import indent from '../util/indent';

class Call {
  constructor( receiver, call ) {
    this.token = CALL;
    this.receiver = receiver;
    this.call = call;
  }

  toString() {
    return `Call(\n${ indent(2, this.receiver + ',\n' + this.call) }\n)`;
  }
}

export default function creator( receiver, call ) {
  return new Call( receiver, call );
}
