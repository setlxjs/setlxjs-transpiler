require('should');

const transpile = require('../../build/createTranspiler')();
const Identifier = require('../../build/classes/Identifier');
const Exponential = require('../../build/classes/Exponential');

describe('transpilers/exponential', () => {
  it('should transpile the exponential operator to Math.pow', () => {
    transpile(Exponential(Identifier('x'), Identifier('y'))).should.be.exactly('$pow(x, y)');
  });
});
