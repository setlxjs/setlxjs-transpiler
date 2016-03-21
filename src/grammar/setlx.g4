grammar setlx;

ID              : ('a' .. 'z')('a' .. 'z' | 'A' .. 'Z'| '_' | '0' .. '9')* ;
TERM            : ('^' ID | 'A' .. 'Z' ID?) ;
NUMBER          : '0'|('1' .. '9')('0' .. '9')*;
DOUBLE          : NUMBER? '.' ('0' .. '9')+ (('e' | 'E') ('+' | '-')? ('0' .. '9')+)? ;
RANGE_SIGN      : '..';
STRING          : '"' ('\\'.|~('"'|'\\'))* '"';
LITERAL         : '\'' ('\'\''|~('\''))* '\'';

LINE_COMMENT    : '//' ~('\n' | '\r')*                      -> skip;
MULTI_COMMENT   : '/*' (~('*') | '*'+ ~('*'|'/'))* '*'+ '/' -> skip;
WS              : (' '|'\t'|'\n'|'\r')                      -> skip;

initBlock
    : ( statement )+
    ;

block
    : ( statement )*
    ;

statement
    : assignmentOther  ';'
    | assignmentDirect ';'
    | expr ';'
    ;

variable
    : ID
    ;

condition
    : expr
    ;

assignmentOther
    : assignable
      (
         '+='  e = expr
       | '-='  e = expr
       | '*='  e = expr
       | '/='  e = expr
       | '\\=' e = expr
       | '%='  e = expr
      )
    ;

assignmentDirect
    : assignable ':=' (as = assignmentDirect | expr)
    ;

assignable
    : variable
    ;

expr
    : i1 = implication
      ('<==>' i2 = implication | '<!=>' i2 = implication )?
    ;

implication
    : disjunction
      ('=>' im = implication)?
    ;

disjunction
    : c1 = conjunction ('||' c2 = conjunction)*
    ;

conjunction
    : c1 = comparison  ('&&' c2 = comparison)*
    ;

comparison
    : s1 = sum
      (
         '=='    s2 = sum
       | '!='    s2 = sum
       | '<'     s2 = sum
       | '<='    s2 = sum
       | '>'     s2 = sum
       | '>='    s2 = sum
       | 'in'    s2 = sum
       | 'notin' s2 = sum
      )?
    ;

sum
    : p1 = product
      (
         '+' p2 = product
       | '-' p2 = product
      )*
    ;

product
    : r1 = reduce
      (
         '*'  r2 = reduce
       | '/'  r2 = reduce
       | '\\' r2 = reduce
       | '%'  r2 = reduce
       | '><' r2 = reduce
      )*
    ;

reduce
    : p1 = prefixOperation
      (
         '+/' p2 = prefixOperation
       | '*/' p2 = prefixOperation
      )*
    ;

prefixOperation
    : factor
      (
        '**' p = prefixOperation
      )?
    | '+/' po2 = prefixOperation
    | '*/' po2 = prefixOperation
    | '#'  po2 = prefixOperation
    | '-'  po2 = prefixOperation
    ;

factor
    : '!' f2 = factor
    | 'forall' '(' iteratorChain '|' condition ')'
    | 'exists' '(' iteratorChain '|' condition ')'
    | (
         '(' expr ')'
       | variable
      )
      (
        '!'
      )?
    | value ('!')?
    ;

value
    : '[' (collectionBuilder)? ']'
    | '{' (collectionBuilder)? '}'
    | STRING
    | LITERAL
    | atomicValue
    ;

collectionBuilder
    : e1 = expr (
        ',' e2 = expr (
            RANGE_SIGN e3 = expr
          | (',' e3 = expr)* ('|' e4 = expr | /* epsilon */ )
        )
      | RANGE_SIGN e3 = expr
      | ( '|' e2 = expr | /* epsilon */ )
      | ':' iteratorChain ('|' c1 = condition | /* epsilon */ )
      )
    ;

iteratorChain
    : i1 = iterator (',' i2 = iterator)*
    ;

iterator
    : assignable 'in' expr
    ;

atomicValue
    : NUMBER
    | DOUBLE
    | 'om'
    | 'true'
    | 'false'
    ;
