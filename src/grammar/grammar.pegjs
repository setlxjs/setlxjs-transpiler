{
  var Primitive = require('./classes/Primitive');
  var List = require('./classes/List');
  var IfStmt = require('./classes/IfStmt');
  var Block = require('./classes/Block');
  var Assignment = require('./classes/Assignment');
  var Identifer = require('./classes/Identifer');
  var Statement = require('./classes/Statement');

  var __types = require('./constants/types');
  var INTEGER = __types.INTEGER;
  var STRING = __types.STRING;
  var DOUBLE = __types.DOUBLE;
  var BOOLEAN = __types.BOOLEAN;

  var knownVars = new Set();
  function isKnown( name ) {
    if ( knownVars.has( name ) ) {
      return true;
    }
    knownVars.add( name );
    return false;
  }

  var stdLib = new Map();

  stdLib.set('print', 'console.log');
}

Programm
  = blk:Block WS
    { return blk.toJS(); }

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
      'else' WS (IfStmt / '{' WS Block WS '}') WS
    )?
    {
      if(!el) {
        return IfStmt(cond, blk);
      }
      return IfStmt(cond, blk, el[2]);
    }

Assignment
  = id:ID WS ':=' WS expr:Expression
    { return Assignment(id, expr); }
  /*/ id:ID WS op:('+='/ '*=' / '-=' / '/=' / '%=' / '\\=') WS expr:Expression*/
    /*{ return Assignment(id, getDirectAssignmentOp(op)(id, expr) ); }*/

Expression
  = expr:SomeType
    { return expr; }

TypeList
  = type:SomeType more:( WS ',' WS types:SomeType WS )+
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
