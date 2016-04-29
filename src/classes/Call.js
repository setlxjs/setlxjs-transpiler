import { CALL } from '../constants/tokens';
import indent from '../util/indent';

class Call {
  constructor(receiver, call) {
    this.token = CALL;
    this.receiver = receiver;
    this.call = call;
  }

  toString() {
    const params = indent(2, `${this.receiver},\n ${this.call}`);
    return `Call(\n${params}\n)`;
  }
}

export default function creator(receiver, call) {
  return new Call(receiver, call);
}
