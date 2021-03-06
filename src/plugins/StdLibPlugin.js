import ImportPlugin from './ImportPlugin';

export const stdlib = [
  'print',
  'load',
  'abs',
  'cos',
  'arb',
  'isBoolean',
  'isString',
  'isPrucedure',
  'isList',
  'isSet',
  'isInteger',
  'isDouble',
];

export default class StdLibPlugin extends ImportPlugin {
  constructor() {
    super('stdlib', 'setlxjs-lib/dist/std');
  }

  isStd(fun) {
    if (stdlib.indexOf(fun) >= 0) {
      this.addImport(fun, fun);
      return true;
    }
    return false;
  }
}
