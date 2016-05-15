require('should');

const transpile = require('../../build/transpile')();
const Identifier = require('../../build/classes/Identifier');
const Primitive = require('../../build/classes/Primitive');
const CollectionAccess = require('../../build/classes/CollectionAccess');

const types = require('../../build/constants/types');

describe('transpilers/collectionAccess', () => {
  it('should transpile collection accesses with integers', () => {
    transpile(CollectionAccess(Primitive(types.INTEGER, 4))).should.be.exactly('[4]');
  });

  it('should transpile collection accesses with identifiers', () => {
    transpile(CollectionAccess(Identifier('x'))).should.be.exactly('[x]');
  });
});
