{
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

Programm = blk:Block
    { return blk; }

Block = stmts:Statement+
    { return stmts.join('\n'); }

Statement = WS stmt:(Assignment / Expression) WS ';'
    { return stmt; }
  / WS 'if' WS '(' WS cond:Expression WS ')' WS '{' WS blk:Block WS '}' WS
    elif:(
      'else' WS 'if' WS '(' WS cond:Expression WS ')' WS '{' WS blk:Block WS '}' WS
    )*
    el:(
      'else' WS '{' WS elblk:Block WS '}' WS
    )?
    {
      var ifstmt = 'if ( ' + cond + ' ) {\n' + blk + '\n}';
      var elstmt = '';
      if (el) {
        elstmt = ' else {\n' + elblk + '\n}';
      }
      var elifstmts = elif.map(e => {
        return 'else if ( ' + e.cond + ' ) {\n' + blk + '\n}';
      }).join('');

      return ifstmt + elifstmts + elstmt + '\n';
    }

Assignment = id:ID WS ':=' WS expr:Expression
    {
      if ( isKnown( id ) ) {
        return id + ' = ' + expr + ';';
      } else {
        return 'let ' + id + ' = ' + expr + ';';
      }
    }
  / id:ID WS op:('+='/ '*=' / '-=' / '/=' / '%=') WS expr:Expression
    {
      if ( isKnown( id ) ) {
        return id + ' ' + op + ' ' + expr + ';';
      } else {
        return 'let ' + id + ' ' + op + ' ' + expr + ';';
      }
    }
  / id:ID WS '\\=' WS expr:Expression
    {
      if ( isKnown( id ) ) {
        return id + ' = Math.floor( ' + id + ' / ' + expr + ' );';
      } else {
        return 'let ' + id + ' = ' + expr + ';';
      }
    }

Expression = expr1:SomeType WS op:JSOP WS expr2:SomeType
    { return [expr1, op, expr2].join(' '); }
  / expr:SomeType
    { return expr; }

TypeList = type:SomeType more:( ',' WS types:SomeType WS )+
    {
      var types = more.map(e => e[2]);
      types.unshift(type)
      return types.join(', ');
    }
  / type:SomeType?
    { return type ? type : ''; }

SomeType = type:( Primitive / LIST / ID )
    { return type; }

Primitive = primitive:( DOUBLE / NUMBER / STRING )
    { return primitive; }

LIST "list" = '[' WS lst:TypeList WS ']'
    { return '[' + lst + ']'; }

ID "identifer" = [a-z][a-zA-Z_0-9]*
    { return text(); }

BOOLEAN = 'true' / 'false'
    { return text(); }

NUMBER "number" = '0'
    { return '0'; }
  / [1-9][0-9]*
    { return text(); }

DOUBLE "double" = NUMBER? '.' [0-9]+([eE] ('+' / '-')? [0-9]+)?
    { return text(); }

STRING "string" = '"' ('\\"' / [^\"])* '"'
    { return text(); }

JSOP "operator" = [+-/*]
    { return text(); }

WS "whitespace" = [ \t\n\r]*
    { return false; }