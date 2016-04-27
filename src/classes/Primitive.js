import { PRIMITIVE } from '../constants/tokens';

class Primitive {
  constructor(type, value) {
    this.token = PRIMITIVE;
    this.type = type;
    this.value = value;
  }

  toString() {
    return `Primitive(${this.type})`;
  }
}

export default function creator(type, value) {
  return new Primitive(type, value);
}
