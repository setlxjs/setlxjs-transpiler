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

  function Unsupported() {
    throw new Exception("Unsupported Token");
  }
}

InitBlock
  = stmts:Statement+
    { return Block( stmts ); }

Block
  = stmts:Statement*
    { return Block( stmts ); }

Statement
  = WS assign:AssignmentOther WS ';'
    { return Statement( assign ); }
  / WS assign:AssignmentDirect WS ';'
    { return Statement( assign ); }
  / WS expr:Expression WS ';'
    { return Statement( expr )}
  / stmt:IfStmt
    { return Unsupported(); }
  / WS 'return' expr:Expression WS ';'
    { return Unsupported(); }

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

Variable
  = id:ID
    { return id; }

AssignmentOther
  = recv:Assignable WS op:('+='/ '*=' / '-=' / '/=' / '%=' / '\\=') WS expr:Expression
    { return null; }

AssignmentDirect
  = recv:Assignable WS ':=' WS rhs:(AssignmentDirect / Expression)
    { return Assignment(recv, rhs); }

Assignable
  = va:Variable
    { return va; }

Expression
  = lamb:LambdaProcedure
    { return null; }
  / i1:Implication i2:(('<==>' / '<!=>') Implication)?
    { return null; }

LambdaProcedure
  = params:LambdaParameters op:('|->' / '|=>') expr:Expression
    { return null; }

LambdaParameters
  = va:Variable
    { return null; }
  / '[' v1:Variable (',' v2:Variable )* ']'
    { return null; }

Implication
  = disj:Disjunction impl:('=>' Implication)?
    { return null; }

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
    { return prod2 ? Sum( prod2[1], prod1, prod2[3] ) : prod1 }

Product
  = red1:Reduce red2:(
    WS ('*' { return TIMES; } / '/' { return DIVIDED_BY; }) WS Reduce
  )?
    { return red2 ? Product( red2[1], red1, red2[3] ) : return red1 }

Reduce
  = PrefixOperation (WS ('+/' / '*/') WS PrefixOperation)*

PrefixOperation
  = Factor (WS '**' WS PrefixOperation)?
  / '+/' WS PrefixOperation
  / '*/' WS PrefixOperation
  / '#'  WS PrefixOperation
  / '-'  WS PrefixOperation

Factor
  = '!' WS Factor
  / (
      '(' WS expr:Expression WS ')'
    / Procedure
    / Variable
    )
    ( Call )* ('!')?
  / Value ('!')?

Procedure
  = 'procedure' WS '(' WS ProcedureParameters WS ')' WS '{' Block '}'
  / 'closure' WS '(' WS ProcedureParameters WS ')' WS '{' Block '}'

ProcedureParameters
  = Variable (WS ',' WS Variable)*

Call
  = '(' WS CallParameters WS ')'
  / '[' WS CollectionAccessParams WS ']'

CallParameters
  = ExprList?

CollectionAccessParams
  = Expression
  / Expression (WS ',' WS Expression)+
  / Expression (WS RANGE_SIGN WS Expression)
  / RANGE_SIGN Expression

ExprList
  = Expression (WS ',' WS Expression)

Value
  = '[' CollectionBuilder? ']'
  / '{' CollectionBuilder? '}'
  / STRING
  / NUMBER
  / DOUBLE
  / BOOLEAN

CollectionBuilder
  = Expression (WS ',' WS Expression)?
  / Expression WS RANGE_SIGN WS Expression
  / Expression

IteratorChain
  = Iterator (WS ',' WS Iterator)*

Iterator
  = Assignable WS 'in' WS Expression

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

RANGE_SIGN ".."
  = '..'

STRING "string"
  = '"' ('\\"' / [^\"])* '"'
    { return Primitive( STRING, text() ); }

WS "whitespace"
  = '//' [^\n\r]* '\n'
  / [ \t\n\r]*
    { return false; }
