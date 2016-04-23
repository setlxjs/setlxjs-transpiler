import ImportPlugin from './ImportPlugin';

const stdlib = ['print'];

export default class StdLibPlugin extends ImportPlugin {
  constructor() {
    super('stdlib', 'setlxjs-lib/std');
  }

  isStd(fun) {
    if (stdlib.indexOf(fun) >= 0) {
      this.addImport(fun, fun);
      return true;
    }
    return false;
  }
}
