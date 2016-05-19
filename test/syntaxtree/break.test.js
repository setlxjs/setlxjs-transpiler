require('should');
const InitBlock = require('../../build/classes/InitBlock');
const Break = require('../../build/classes/Break');

const parser = require('../../build/parse');

describe('syntaxtree/Break', () => {
  it('should parse the break statements', () => {
    parser('break;').should.eql(InitBlock([Break()]));
  });
});
