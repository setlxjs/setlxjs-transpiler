{
  var knownVars = new Set();

  function isKnown( name ) {
    if ( knownVars.has( name ) ) {
      return true;
    }
    knownVars.add( name );
    return false;
  }
}

Programm = stmts:Statement+
    { return stmts.join('\n'); }

Statement = WS stmt:(Assignment / Expression) WS ';'
    { return stmt; }

Assignment = id:ID WS ':=' WS expr:Expression
    {
      if ( isKnown( id ) ) {
        return id + ' = ' + expr;
      } else {
        return 'let ' + id + ' = ' + expr;
      }
    }

Expression = expr1:Primitive WS op:JSOP WS expr2:Primitive
    { return [expr1, op, expr2].join(' '); }
  / expr:Primitive
    { return expr; }

Primitive = primitive:( DOUBLE / NUMBER / STRING )
    { return primitive; }

ID "identifer" = [a-z][a-zA-Z_0-9]*
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