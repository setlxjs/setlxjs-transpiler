import { CALL } from '../constants/tokens';

class Call {
  constructor( receiver, call ) {
    this.token = CALL;
    this.receiver = receiver;
    this.call = call;
  }

  toString() {
    return `Call( ${ this.receiver }, ${ this.call } )`;
  }
}

export default function creator( receiver, call ) {
  return new Call( receiver, call );
}
