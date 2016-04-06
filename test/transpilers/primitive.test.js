require('should');

const transpile = require('../../build/transpile');
const Primitive = require('../../build/classes/Primitive');

const types = require('../../build/constants/types');

describe('transpilers/primitive', () => {
  it('should transpile strings correctly', () => {
    transpile(Primitive(types.STRING, '"some string"')).should.be.exactly('"some string"');
  });

  it('should transpile booleans correctly', () => {
    transpile(Primitive(types.BOOLEAN, true)).should.be.exactly('true');
    transpile(Primitive(types.BOOLEAN, false)).should.be.exactly('false');
  });

  it('should transpile integers correctly', () => {
    transpile(Primitive(types.INTEGER, 45672)).should.be.exactly('45672');
  });

  it('should transpile doubles correctly', () => {
    transpile(Primitive(types.DOUBLE, '0.456e12')).should.be.exactly('0.456e12');
  });
});
