{
  var AssignableList = require('../classes/AssignableList');
  var Assignment = require('../classes/Assignment');
  var Block = require('../classes/Block');
  var Call = require('../classes/Call');
  var Comparison = require('../classes/Comparison');
  var Conjunction = require('../classes/Conjunction');
  var CollectionAccess = require('../classes/CollectionAccess');
  var Disjunction = require('../classes/Disjunction');
  var Exponential = require('../classes/Exponential');
  var ForLoop = require('../classes/ForLoop');
  var FunctionCall = require('../classes/FunctionCall');
  var Generator = require('../classes/Generator');
  var Identifer = require('../classes/Identifer');
  var IfStmt = require('../classes/IfStmt');
  var Iterator = require('../classes/Iterator');
  var List = require('../classes/List');
  var PrefixOperation = require('../classes/PrefixOperation');
  var Primitive = require('../classes/Primitive');
  var Procedure = require('../classes/Procedure');
  var Product = require('../classes/Product');
  var Range = require('../classes/Range');
  var Return = require('../classes/Return');
  var SetlSet = require('../classes/SetlSet');
  var Statement = require('../classes/Statement');
  var Sum = require('../classes/Sum');
  var WhileLoop = require('../classes/WhileLoop');

  var types = require('../constants/types');

  var ops = require('../constants/operators');

  function makeList(first, second) {
    var ret = [];
    if (second) {
      ret = second.map(function(el) {
        return el[3];
      });
    }
    ret.unshift(first);
    return ret;
  }

  function reduceApply(p, n) {
    return n(p);
  }
}

InitBlock
  = stmts:Statement+ WS
    { return Block(stmts); }

Block
  = stmts:Statement* WS
    { return Block(stmts); }

Statement
  = WS assign:AssignmentOther WS ';'
    { return Statement(assign); }
  / WS assign:AssignmentDirect WS ';'
    { return Statement(assign); }
  / WS expr:Expression WS ';'
    { return Statement(expr); }
  / WS 'for' WS '(' iterators:IteratorChain expr:('|' Expression )? ')' WS '{' blk:Block '}'
    { return ForLoop(iterators, expr, blk); }
  / WS 'while' WS '(' expr:Expression ')' WS '{' blk:Block '}'
    { return WhileLoop(expr, blk); }
  / WS 'if' WS '(' WS expr:Expression WS ')' WS '{' blk:Block '}'
    elseif:(WS 'else' WS 'if' WS '(' WS expr:Expression ')' WS '{' blk:Block '}'
      { return function(elseblk) { return IfStmt(expr, blk, elseblk)}; }
    )*
    elseblk:(WS 'else' WS '{' blk:Block '}' { return blk; })?
    { return IfStmt(expr, blk, elseif.reduceRight(reduceApply, elseblk)); }
  / WS 'return' WS expr:Expression? WS ';'
    { return Return(expr); }

Variable
  = id:ID
    { return id; }

AssignmentOther
  = asable:Assignable WS op:(
      '+='  { return ops.PLUS;             }
    / '*='  { return ops.TIMES;            }
    / '-='  { return ops.MINUS;            }
    / '/='  { return ops.DIVIDED_BY;       }
    / '%='  { return ops.MODULO;           }
    / '\\=' { return ops.INTEGER_DIVISION; }
    ) WS expr:Expression
    {
      if (op === ops.PLUS || op === ops.MINUS) {
        return Assignment(asable, Sum(asable, op, expr));
      }
      return Assignment(asable, Product(asable, op, expr));
    }

AssignmentDirect
  = asable:Assignable WS ':=' WS expr:(AssignmentDirect / Expression)
    { return Assignment(asable, expr); }

Assignable
  = vari:Variable
    { return vari;  }
  / '[' WS aslist:ExplicitAssignList WS ']'
    { return aslist; }

ExplicitAssignList
  = as1:Assignable as2:(WS ',' WS Assignable)*
    { return AssignableList(makeList(as1, as2)); }

Expression
  = pro:LambdaProcedure
    { return pro; }
  / i1:Implication i2:(WS (
      '<==>' { return ops.IF_ONLY_IF }
    / '<!=>' { return ops.NOT_IF_ONLY_IF; }
    ) WS Implication)?
    { return i2 ? Implication(i2[1], i1, i2[3]) : i1; }

LambdaProcedure
  = params:LambdaParameters WS
      clos:('|->' { return true; } / '|=>' { return false; })
    WS expr:Expression
    { return Procedure(params, Block(Statement(expr)), clos); }

LambdaParameters
  = vari:Variable
    { return [vari]; }
  / '[' WS v1:Variable v2:(WS ',' WS Variable )* WS ']'
    { return makeList(v1, v2); }

Implication
  = dis:Disjunction impl:(WS '=>' WS Implication)?
    { return impl ? Implication(ops.IMPLIES, dis, impl[3]) : dis; }

Disjunction
  = con1:Conjunction disj:(WS '||' WS con2:Conjunction
      { return function(lhs) { return Disjunction(lhs, con2); }; }
    )*
    { return disj.reduce(reduceApply, con1); }

Conjunction
  = comp1:Comparison conj:(WS '&&' WS comp2:Comparison
      { return function(lhs) { return Conjunction(lhs, comp2); }; }
    )*
    { return conj.reduce(reduceApply, comp1); }

Comparison
  = s1:Sum s2:(WS (
      '=='    { return ops.EQUAL;              }
    / '!='    { return ops.NOT_EQUAL;          }
    / '>='    { return ops.GREATER_EQUAL_THAN; }
    / '<='    { return ops.LESS_EQUAL_THAN;    }
    / '>'     { return ops.GREATER_THAN;       }
    / '<'     { return ops.LESS_THAN;          }
    / 'in'    { return ops.IS_IN;              }
    / 'notin' { return ops.IS_NOT_IN;          }
    ) WS Sum)?
    { return s2 ? Comparison(s2[1], s1, s2[3]) : s1; }

Sum
  = p1:Product sum:(WS op:(
      '+' { return ops.PLUS; }
    / '-' { return ops.MINUS; }
    ) WS p2:Product { return function(lhs) { return Sum(op, lhs, p2); }; })*
    { return sum ? sum.reduce(reduceApply, p1) : p1; }

Product
  = r1:Reduce prod:(WS op:(
      '*'  { return ops.TIMES; }
    / '/'  { return ops.DIVIDED_BY; }
    / '%'  { return ops.MODULO; }
    / '\\' { return ops.INTEGER_DIVISION; }
    ) WS r2:Reduce { return function(lhs) { return Product(op, lhs, r2); }; })*
    { return prod ? prod.reduce(reduceApply, r1) : r1; }

Reduce
  = pre:PrefixOperation // (WS ('+/' / '*/') WS PrefixOperation)*
    // I don't get this rule, will be implemented when clear
    { return pre; }

PrefixOperation
  = f1:Factor f2:(WS '**' WS PrefixOperation)?
    { return f2 ? Exponential(f1, f2) : f1; }
  / '+/' WS pre:PrefixOperation
    { return PrefixOperation(pre, ops.PREFIX_PLUS); }
  / '*/' WS pre:PrefixOperation
    { return PrefixOperation(pre, ops.PREFIX_TIMES); }
  / '#'  WS pre:PrefixOperation
    { return PrefixOperation(pre, ops.PREFIX_LENGTH); }
  / '-'  WS pre:PrefixOperation
    { return PrefixOperation(pre, ops.PREFIX_MINUS); }

Factor
  = '!' WS fact:Factor
    { return PrefixOperation(ops.PREFIX_NOT, fact)}
  / vali:Value WS factorial:('!')?
    { return factorial ? Factorial(vali) : vali; }
  / receiv:(
      '(' WS expr:Expression WS ')' { return expr; }
    / proc:Procedure                { return proc; }
    / vari:Variable                 { return vari; }
    ) calls:( Call )* factorial:('!')?
    {
      var ret = calls.reduce(function(p, call) {
        return Call(p, call);
      }, receiv);

      return factorial ? Factorial(ret) : ret;
    }

Procedure
  = 'procedure' WS '(' WS params:ProcedureParameters WS ')' WS '{' blk:Block '}'
    { return Procedure(params, blk); }
  / 'closure' WS '(' WS ProcedureParameters WS ')' WS '{' Block '}'
    { return Procedure(params, blk, true); }

ProcedureParameters
  = v1:Variable v2:(WS ',' WS Variable)*
    { return makeList(v1, v2); }

Call
  = '(' WS params:CallParameters WS ')'
    { return FunctionCall(params); }
  / '[' WS acc:CollectionAccessParams WS ']'
    { return CollectionAccess(acc); }

CallParameters
  = exprl:ExprList?
    { return exprl || []; }

CollectionAccessParams
  = expr:Expression
    { return expr; }
  / expr1:Expression expr2:(WS ',' WS Expression)+
    { return makeList(expr1, expr2); }
  / expr1:Expression WS RANGE_SIGN WS expr2:Expression
    { return Range(expr1, expr2); }
  / RANGE_SIGN expr:Expression
    { return Range(Primitive(types.INTEGER, 0), expr); }

ExprList
  = expr1:Expression expr2:(WS ',' WS Expression)*
    { return makeList(expr1, expr2); }

Value
  = '[' WS builder:CollectionBuilder? WS ']'
    { return builder ? List(builder) : List(); }
  / '{' WS builder:CollectionBuilder? WS '}'
    { return builder ? SetlSet(builder) : SetlSet(); }
  / prim:(STRING /  DOUBLE / NUMBER / BOOLEAN)
    { return prim; }

CollectionBuilder
  = expr1:Expression make:(
      exprs:(WS ',' WS Expression)+
        {
          var ret = exprs.map(function(expr) { return expr[3]; });
          return function(expr) {
            ret.unshift(expr);
            return ret;
          }
        }
    / WS RANGE_SIGN WS expr2:Expression
      { return function(expr1) { return Range(expr1, expr2); }; }
    / WS ':' WS chain:IteratorChain expr2:(WS '|' WS Expression)?
      { return function(expr1) { return Generator(chain, (expr2 || [])[3]); }; }
    )?
    { return make ? make() : expr1; }

IteratorChain
  = it1:Iterator it2:(WS ',' WS Iterator)*
    { return makeList(it1, it2); }

Iterator
  = as:Assignable WS 'in' WS expr:Expression
    { return Iterator(as, expr); }

BOOLEAN "bool"
  = ('true' / 'false')
    { return Primitive(types.BOOLEAN, text() === 'true'); }

ID "identifer"
  = [a-z][a-zA-Z_0-9]*
    { return Identifer(text()); }

NUMBER "number"
  = '0'
    { return Primitive(types.INTEGER, 0); }
  / [1-9][0-9]*
    { return Primitive(types.INTEGER, parseInt(text(), 10)); }

DOUBLE "double"
  = NUMBER? '.' [0-9]+([eE] ('+' / '-')? [0-9]+)?
    { return Primitive(types.DOUBLE, text()); }

RANGE_SIGN ".."
  = '..'

STRING "string"
  = '"' ('\\"' / [^\"])* '"'
    { return Primitive(types.STRING, text()); }

LINE_TERMINATOR
  = '\n' / '\r\n' / '\r'

SINGLE_LINE_COMMENT
  = '//' (!LINE_TERMINATOR .)* LINE_TERMINATOR

MULTI_LINE_COMMENT
  = '/*' (!'*/' .)* '*/'

WS "whitespace"
  = (SINGLE_LINE_COMMENT / MULTI_LINE_COMMENT / [ \t\n\r])*
    { return null; }
