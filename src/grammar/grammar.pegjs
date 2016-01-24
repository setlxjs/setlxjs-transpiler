{
  var Primitive = require('../classes/Primitive');
  var List = require('../classes/List');
  var IfStmt = require('../classes/IfStmt');
  var Block = require('../classes/Block');
  var Assignment = require('../classes/Assignment');
  var Identifer = require('../classes/Identifer');
  var Statement = require('../classes/Statement');
  var Disjunction = require('../classes/Disjunction');
  var Conjunction = require('../classes/Conjunction');
  var Comparison = require('../classes/Comparison');
  var Sum = require('../classes/Sum');
  var Product = require('../classes/Product');

  var __types = require('../constants/types');
  var INTEGER = __types.INTEGER;
  var STRING = __types.STRING;
  var DOUBLE = __types.DOUBLE;
  var BOOLEAN = __types.BOOLEAN;

  var __operators = require('../constants/operators');
  var EQUAL = __operators.EQUAL;
  var NOT_EQUAL = __operators.NOT_EQUAL;
  var GREATER_THAN = __operators.GREATER_THAN;
  var LESS_THAN = __operators.LESS_THAN;
  var GREATER_EQUAL_THAN = __operators.GREATER_EQUAL_THAN;
  var LESS_EQUAL_THAN = __operators.LESS_EQUAL_THAN;
  var IS_IN = __operators.IS_IN;
  var IS_NOT_IN = __operators.IS_NOT_IN;
  var PLUS = __operators.PLUS;
  var MINUS = __operators.MINUS;
  var TIMES = __operators.TIMES;
  var DIVIDED_BY = __operators.DIVIDED_BY;
}

Programm
  = blk:Block WS
    { return blk; }

Block
  = stmts:Statement+
    { return Block( stmts ); }

Statement
  = WS expr:(Assignment / Expression) WS ';'
    { return Statement( expr ); }
  / stmt:IfStmt
    { return stmt; }

IfStmt
  = WS 'if' WS '(' WS cond:Expression WS ')' WS '{' WS blk:Block WS '}' WS
    el:(
      'else' WS (elif:IfStmt / '{' WS elblk:Block WS '}') WS
    )?
    {
      if(!el) {
        return IfStmt(cond, blk);
      }
      // el[2][2] is the block when defined, or er[2] the if statement...
      return IfStmt(cond, blk, el[2][2] || el[2]);
    }

Assignment
  = id:ID WS ':=' WS expr:Expression
    { return Assignment(id, expr); }
  /*/ id:ID WS op:('+='/ '*=' / '-=' / '/=' / '%=' / '\\=') WS expr:Expression*/
    /*{ return Assignment(id, getDirectAssignmentOp(op)(id, expr) ); }*/

Expression
  = disj:Disjunction
    { return disj; }

Disjunction
  = conj1:Conjunction conj2:( WS '||' WS Conjunction )?
    { return conj2 ? Disjunction(conj1, conj2[3]) : conj1; }

Conjunction
  = comp1:Comparison comp2:( WS '&&' WS Comparison )?
    { return comp2 ? Conjunction(comp1, comp2[3]) : comp1; }

Comparison
  = sum1:Sum sum2:( WS
  (
      '=='    { return EQUAL; }
    / '!='    { return NOT_EQUAL; }
    / '>='    { return GREATER_EQUAL_THAN; }
    / '<='    { return LESS_EQUAL_THAN; }
    / '>'     { return GREATER_THAN; }
    / '<'     { return LESS_THAN; }
    / 'in'    { return IS_IN; }
    / 'notin' { return IS_NOT_IN; }
  )
  WS Sum )?
    { return sum2 ? Comparison( sum2[1], sum2[3], sum1 ) : sum1; }

Sum
  = prod1:Product prod2:(
    WS ('+' { return PLUS; } / '-' { return MINUS; }) WS Product
  )?
    {
      if (!prod2) { return prod1 };
      return Sum( prod2[1], prod1, prod2[3] );
    }

Product
  = infx1:InfixOperation infx2:(
    WS ('*' { return TIMES; } / '/' { return DIVIDED_BY; }) WS InfixOperation
  )?
    {
      if (!infx2) { return infx1 };
      return Product( infx2[1], infx1, infx2[3] );
    }

InfixOperation
  = fact:Factor
    { return fact; }

Factor
  = '(' WS expr:Expression WS ')'
    { return expr; }
  / sType:SomeType
    { return sType; }

TypeList
  = type:SomeType more:( WS ',' WS SomeType WS )+
    {
      var types = more.map(e => e[3]);
      types.unshift(type);
      return types;
    }
  / type:SomeType?
    { return type ? [type] : []; }

SomeType
  = type:( Primitive / LIST / ID )
    { return type; }

Primitive
  = primitive:( DOUBLE / NUMBER / STRING / BOOLEAN )
    { return primitive; }

LIST "list"
  = '[' WS lst:TypeList WS ']'
    { return List(lst); }

ID "identifer"
  = [a-z][a-zA-Z_0-9]*
    { return Identifer( text() ); }

BOOLEAN "bool"
  = ('true' / 'false')
    { return Primitive( BOOLEAN, text() ); }

NUMBER "number"
  = '0'
    { return Primitive( INTEGER, 0 ); }
  / [1-9][0-9]*
    { return Primitive( INTEGER, parseInt(text(), 10) ); }

DOUBLE "double"
  = NUMBER? '.' [0-9]+([eE] ('+' / '-')? [0-9]+)?
    { return Primitive( DOUBLE, text() ); }

STRING "string"
  = '"' ('\\"' / [^\"])* '"'
    { return Primitive( STRING, text() ); }

WS "whitespace"
  = [ \t\n\r]*
    { return false; }
