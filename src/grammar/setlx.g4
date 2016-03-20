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
    | assignmentOther  ';'
    | assignmentDirect ';'
    | expr[false] ';'
    ;

condition
    : expr[false]
    ;

assignmentOther
    : assignable
      (
         '+='  e = expr[false]
       | '-='  e = expr[false]
       | '*='  e = expr[false]
       | '/='  e = expr[false]
       | '\\=' e = expr[false]
       | '%='  e = expr[false]
      )
    ;

assignmentDirect
    : assignable ':=' (as = assignmentDirect | expr[false])
    ;

assignable
    : variable
    ;

expr [boolean enableIgnore]
    : lambdaProcedure
    | i1 = implication[$enableIgnore]
      ('<==>' i2 = implication[$enableIgnore] | '<!=>' i2 = implication[$enableIgnore] )?
    ;
