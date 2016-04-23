import { RANGE } from '../constants/tokens';

class Range {
  constructor( fromExpr, toExpr ) {
    this.token = RANGE;
    this.fromExpr = fromExpr;
    this.toExpr = toExpr;
  }

  toString() {
    return 'Range( ' + this.fromExpr + ', ' + this.toExpr + ' )';
  }
}

export default function creator( fromExpr, toExpr ) {
  return new Range( fromExpr, toExpr );
}
