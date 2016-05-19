require('should');

const transpile = require('../../build/createTranspiler')();
const Break = require('../../build/classes/Break');

describe('transpilers/breakStmt', () => {
  it('should transpile break statements', () => {
    transpile(Break()).should.be.exactly('break;');
  });
});
