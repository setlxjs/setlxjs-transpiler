import { FUNCTION_CALL } from '../constants/tokens';

class FunctionCall {
  constructor(parameters) {
    this.token = FUNCTION_CALL;
    this.parameters = parameters;
  }

  toString() {
    return `FunctionCall( ${this.parameters.join(', ')} )`;
  }
}

export default function creator(parameters) {
  return new FunctionCall(parameters);
}
