import ImportPlugin from './ImportPlugin';

const stdlib = ['print', 'load', 'abs', 'cos'];

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
