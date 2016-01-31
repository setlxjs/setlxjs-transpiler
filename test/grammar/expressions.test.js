require('should');

const parser = require('../../build/grammar/grammar');

const Assignment = require('../../build/classes/Assignment');
const Identifer = require('../../build/classes/Identifer');
const Primitive = require('../../build/classes/Primitive');
const Sum = require('../../build/classes/Sum');
const Product = require('../../build/classes/Product');
const Comparison = require('../../build/classes/Comparison');
const Disjunction = require('../../build/classes/Disjunction');
const Conjunction = require('../../build/classes/Conjunction');

const __types = require('../../build/constants/types');
const BOOLEAN = __types.BOOLEAN;
const INTEGER = __types.INTEGER;
const STRING = __types.STRING;

const __operators = require('../../build/constants/operators');
const PLUS = __operators.PLUS;
const MINUS = __operators.MINUS;
const TIMES = __operators.TIMES;
const DIVIDED_BY = __operators.DIVIDED_BY;
const EQUAL = __operators.EQUAL;
const NOT_EQUAL = __operators.NOT_EQUAL;
const GREATER_THAN = __operators.GREATER_THAN;
const LESS_THAN = __operators.GREATER_THAN;
const GREATER_EQUAL_THAN = __operators.GREATER_EQUAL_THAN;
const LESS_EQUAL_THAN = __operators.GREATER_EQUAL_THAN;

const parseExpression = expr => parser.parse( expr, {
  startRule: [ 'Statement' ],
});

describe('Expression Parser', () => {
  it('should parse basic assignments', () => {
    const actual = parseExpression('var1 := true;');
    const expected = Assignment( Identifer(), Primitive(BOOLEAN) );

    actual.toString().should.be.exactly(expected.toString());
  });

  it('should parse expression assignments', () => {
    const actual = parseExpression('var1 := true && false;');
    const expected = Assignment(
      Identifer(),
      Conjunction( Primitive(BOOLEAN), Primitive(BOOLEAN) )
    );

    actual.toString().should.be.exactly(expected.toString());
  });

  it('should parse primitives', () => {
    parseExpression('2;').toString()
      .should.be.exactly(Primitive(INTEGER).toString());
    parseExpression('true;').toString()
      .should.be.exactly(Primitive(BOOLEAN).toString());
    parseExpression('"str";').toString()
      .should.be.exactly(Primitive(STRING).toString());
  });

  it('should parse sums', () => {
    const actualPlus = parseExpression('2 + 3;');
    const expectedPlus = Sum( PLUS, Primitive(INTEGER), Primitive(INTEGER) );

    actualPlus.toString().should.be.exactly(expectedPlus.toString());

    const actualMinus = parseExpression('5 - 12846;');
    const expectedMinus = Sum( MINUS, Primitive(INTEGER), Primitive(INTEGER) );

    actualMinus.toString().should.be.exactly(expectedMinus.toString());
  });

  it('should parse nested sums', () => {
    const actual = parseExpression('2 + 3 - 4;');
    const expected = Sum(
      PLUS,
      Sum( MINUS, Primitive(INTEGER), Primitive(INTEGER) ),
      Primitive(INTEGER)
    );

    actual.toString().should.be.exactly(expected.toString());
  });

  it('should parse products', () => {
    const actualTimes = parseExpression('2 * 3;');
    const expectedTimes = Product( TIMES, Primitive(INTEGER), Primitive(INTEGER) );

    actualTimes.toString().should.be.exactly(expectedTimes.toString());

    const actualMinus = parseExpression('12 / 10;');
    const expectedMinus = Product( DIVIDED_BY, Primitive(INTEGER), Primitive(INTEGER) );

    actualMinus.toString().should.be.exactly(expectedMinus.toString());
  });

  it('should parse comparisons', () => {
    var index; // eslint ignore
    const actual = [];
    const expected = [];

    actual.push( parseExpression('2 == 2;') );
    expected.push( Comparison( EQUAL, Primitive(INTEGER), Primitive(INTEGER) ) );

    actual.push( parseExpression('2 != 2;') );
    expected.push( Comparison( NOT_EQUAL, Primitive(INTEGER), Primitive(INTEGER) ) );

    actual.push( parseExpression('2 > 2;') );
    expected.push( Comparison( GREATER_THAN, Primitive(INTEGER), Primitive(INTEGER) ) );

    actual.push( parseExpression('2 < 2;') );
    expected.push( Comparison( LESS_THAN, Primitive(INTEGER), Primitive(INTEGER) ) );

    actual.push( parseExpression('2 >= 2;') );
    expected.push( Comparison( GREATER_EQUAL_THAN, Primitive(INTEGER), Primitive(INTEGER) ) );

    actual.push( parseExpression('2 <= 2;') );
    expected.push( Comparison( LESS_EQUAL_THAN, Primitive(INTEGER), Primitive(INTEGER) ) );

    for ( index = 0; index < expected.length; ++index ) {
      actual[index].toString().should.be.exactly(expected[index].toString());
    }
  });

  it('should parse disjunctions', () => {
    const actual = parseExpression('false || true;');
    const expected = Disjunction( Primitive(BOOLEAN), Primitive(BOOLEAN) );

    actual.toString().should.be.exactly(expected.toString());
  });

  it('should parse conjunctions', () => {
    const expected = parseExpression('true && false;');
    const actual = Conjunction( Primitive(BOOLEAN), Primitive(BOOLEAN) );

    actual.toString().should.be.exactly(expected.toString());
  });
});
