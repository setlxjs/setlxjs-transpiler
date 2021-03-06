require('should');

const transpile = require('../../build/createTranspiler')();
const Identifier = require('../../build/classes/Identifier');
const Call = require('../../build/classes/Call');
const CollectionAccess = require('../../build/classes/CollectionAccess');
const FunctionCall = require('../../build/classes/FunctionCall');

describe('transpilers/call', () => {
  it('should transpile calls with collection accesses', () => {
    const tree = Call(Identifier('myFn'), CollectionAccess(Identifier('x')));
    transpile(tree).should.be.exactly('myFn.get(x < 0 ? x : x - 1)');
  });

  it('should transpile calls with function calls', () => {
    const tree = Call(Identifier('myFn'), FunctionCall([Identifier('x')]));
    transpile(tree).should.be.exactly('myFn(x)');
  });
});
