export default class ImportPlugin {
  constructor(name, path) {
    this.name = name;
    this.path = path;
    this._imps = [];
  }

  addImport(varName, importName) {
    this._imps.push({ varName, importName });
  }

  imports() {
    const importName = `$$import$${this.name}`;
    const imps = this._imps.map(
      imp => `var ${imp.varName} = ${importName}.${imp.importName};`
    ).join('\n');
    return `var ${importName} = require('${this.path}');\n${imps}`;
  }
}
