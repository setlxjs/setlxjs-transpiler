import { PRIMITIVE } from '../constants/tokens';

class Primitive {
  constructor(type, value) {
    this.token = PRIMITIVE;
    this.type = type;
    this.value = value;
  }

  toString() {
    return `PRIMITIVE(${this.type})`;
  }
}

export default function creator(type, value) {
  return new Primitive(type, value);
}
