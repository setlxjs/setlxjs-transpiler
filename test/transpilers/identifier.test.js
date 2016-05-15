require('should');

const transpile = require('../../build/createTranspiler')();
const Identifier = require('../../build/classes/Identifier');

describe('transpilers/identifier', () => {
  it('should transpile to the provided name correctly', () => {
    const name = 'myid';
    transpile(Identifier(name)).should.be.exactly(name);
  });
});
