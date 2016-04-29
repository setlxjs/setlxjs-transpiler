import { PROCEDURE } from '../constants/tokens';
import indent from '../util/indent';

class Procedure {
  constructor(params, blk, closure) {
    this.token = PROCEDURE;
    this.block = blk;
    this.params = params;
    this.closure = closure;
  }

  toString() {
    const params = `[ ${this.params.join(', ')} ],\n${this.block},\n${this.closure}`;
    return `Procedure(\n${indent(2, params)}\n)`;
  }
}

export default function creator(params, blk, closure = false) {
  return new Procedure(params, blk, closure);
}
