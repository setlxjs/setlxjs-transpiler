class Scope {
  constructor(parent, ignore = []) {
    this.parent = parent;
    this.vars = [];
    this.ignore = ignore;
  }

  has(name) {
    return (this.parent && this.parent.has(name)) || this.vars.indexOf(name) >= 0;
  }

  register(name) {
    if (!this.has(name) && this.ignore.indexOf(name) < 0) {
      this.vars.push(name);
    }
  }
}

const varchars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

class ScopePlugin {
  constructor() {
    this.scopes = [new Scope()];
  }

  get currentScope() {
    if (this.scopes.length === 0) {
      throw new Error('There is no current scope, all scopes have been closed.');
    }
    return this.scopes[0];
  }

  newScope(ignore) {
    this.scopes.unshift(new Scope(this.scopes[0], ignore));
  }

  closeScope() {
    const vars = this.scopes.shift().vars.join(', ');

    return vars === '' ? '' : `var ${vars};`;
  }

  register(name) {
    this.currentScope.register(name);
  }

  getTempVar() {
    let name = '_';

    const number = Math.floor(Math.random() * varchars.length * varchars.length);
    name += varchars.charAt(Math.floor(number / varchars.length));
    name += varchars.charAt(number % varchars.length);

    if (this.currentScope.has(name)) {
      return this.getTempVar();
    }
    this.currentScope.register(name);
    return name;
  }
}

export default ScopePlugin;
