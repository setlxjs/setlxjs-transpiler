import { GENERATOR } from '../constants/tokens';

class Generator {
  constructor( iterators, expression ) {
    this.token = GENERATOR;
    this.iterators = iterators;
    this.expression = expression;
  }

  toString() {
    if ( this.expression ) {
      return `Generator( ${ this.iterators.join(', ') }, ${ this.expression } )`;
    }
    return `Generator( ${ this.iterators.join(', ') } )`;
  }
}

export default function creator( iterators, expression ) {
  return new Generator( iterators, expression );
}
