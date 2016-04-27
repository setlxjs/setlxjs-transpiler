import { GENERATOR } from '../constants/tokens';

class Generator {
  constructor(mapper, iterators, expression) {
    this.token = GENERATOR;
    this.mapper = mapper;
    this.iterators = iterators;
    this.expression = expression;
  }

  toString() {
    if (this.expression) {
      return `Generator(
  ${this.mapper},
  ${this.iterators.join(', ')},
  ${this.expression}\n)`;
    }
    return `Generator(\n  ${this.mapper}\n ${this.iterators.join(', ')}\n)`;
  }
}

export default function creator(mapper, iterators, expression) {
  return new Generator(mapper, iterators, expression);
}
