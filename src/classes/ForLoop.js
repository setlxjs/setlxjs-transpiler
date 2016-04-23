import { FOR_LOOP } from '../constants/tokens';

class ForLoop {
  constructor( iterators, expression, block ) {
    this.token = FOR_LOOP;
    this.iterators = iterators;
    this.block = block;
    this.expression = expression;
  }

  toString() {
    if ( this.expression ) {
      return `ForLoop(\n  ${ this.iterators },\n  ${ this.expression },\n  ${ this.block } \n)`;
    }
    return `ForLoop(\n  ${ this.iterators },\n  ${ this.block } \n)`;
  }
}

export default function creator( iterators, expression, block ) {
  return new ForLoop( iterators, expression, block );
}
