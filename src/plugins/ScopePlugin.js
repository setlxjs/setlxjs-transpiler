class Scope {
  constructor() {
    this.vars = [];
  }

  has(name) {
    return this.vars.indexOf(name) >= 0;
  }

  register(name) {
    if (!this.has(name)) {
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

  newScope() {
    this.scopes.unshift(new Scope());
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
