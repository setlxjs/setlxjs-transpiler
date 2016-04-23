import ImportPlugin from './ImportPlugin';

export default class HelperPlugin extends ImportPlugin {
  constructor() {
    super('helper', 'setlxjs-lib/hlp');
  }

  request(name) {
    const ret = `$${name}`;
    this.addImport(ret, name);
    return ret;
  }
}
