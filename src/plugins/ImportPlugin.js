export default class ImportPlugin {
  constructor(name, path) {
    this.name = name;
    this.path = path;
    this.imps = [];
  }

  addImport(varName, importName) {
    this.imps.push({ varName, importName });
  }

  imports() {
    if (this.imps.length === 0) {
      return '';
    }

    const importName = `$$import$${this.name}`;
    const imps = this.imps.map(
      imp => `var ${imp.varName} = ${importName}.${imp.importName};`
    ).join('\n');
    return `var ${importName} = require('${this.path}');\n${imps}`;
  }
}
