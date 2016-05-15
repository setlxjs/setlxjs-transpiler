require('should');

const transpile = require('../../build/transpile')();
const Identifier = require('../../build/classes/Identifier');
const Statement = require('../../build/classes/Statement');
const Block = require('../../build/classes/Block');

describe('transpilers/block', () => {
  it('should transpile empty blocks', () => {
    transpile(Block([])).should.be.exactly('');
  });

  it('should transpile statements seperated with newlines', () => {
    transpile(Block([
      Statement(Identifier('idone')),
      Statement(Identifier('idtwo')),
      Statement(Identifier('idthree')),
    ])).should.be.exactly('idone;\nidtwo;\nidthree;\n');
  });
});
