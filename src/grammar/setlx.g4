grammar setlx;

initBlock
    : ( statement )+
    ;

initExpr
    : expr[false]
    ;

block
    : ( statement )*
    ;

statement
    : 'class' ID '(' procedureParameters[true] ')' '{' b1 = block ('static' '{' b2 = block '}')? '}'
    | 'if'          '(' c1 = condition ')' '{' b1 = block '}'
      (
        'else' 'if' '(' c2 = condition ')' '{' b2 = block '}'
      )*
      (
        'else'                             '{' b3 = block '}'
      )?
    | 'switch' '{'
      (
        'case' c1 = condition ':' b1 = block
      )*
      (
        'default'                    ':' b2 = block
      )?
      '}'
    | match
    | scan
    | 'for' '(' iteratorChain[false] ('|' condition  )? ')' '{' block '}'
    | 'while' '(' condition ')' '{' block '}'
    | 'do' '{' block '}' 'while' '(' condition ')' ';'
    | 'try'                                '{' b1 = block '}'
      (
         'catchLng'  '(' v1 = variable ')' '{' b2 = block '}'
       | 'catchUsr'  '(' v1 = variable ')' '{' b2 = block '}'
      )*
      (
         'catch'     '(' v2 = variable ')' '{' b3 = block '}'
      )?
    | 'check' '{' b1 = block '}' ('afterBacktrack' '{' b2 = block '}')?
    | 'backtrack' ';'
    | 'break' ';'
    | 'continue' ';'
    | 'exit' ';'
    | 'return' (expr[false])? ';'
    | 'assert' '(' condition ',' expr[false] ')' ';'
    | assignmentOther  ';'
    | assignmentDirect ';'
    | expr[false] ';'
    ;

match
    : 'match' '(' expr[false] ')' '{'
        ('case'  exprList[true] ('|' c1 = condition)? ':' b1 = block | regexBranch )+
        ('default' ':' b4 = block )?
      '}'
    ;

scan
    : 'scan' '(' expr[false] ')' ('using' variable)? '{'
        regexBranch+
        ('default' ':' block)?
      '}'
    ;

regexBranch
    : 'regex' pattern = expr[false]
      ('as' assign = expr[true])?
      ('|' condition)?
      ':' block
    ;

listOfVariables
    : v1 = variable (',' v2 = variable)*
    ;

variable
    : ID
    ;

condition
    : expr[false]
    ;

exprList [boolean enableIgnore]
    : e1 = expr[$enableIgnore] (',' e2 = expr[$enableIgnore])*
    ;

assignmentOther
    : assignable[false]
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
    : assignable[false] ':=' (as = assignmentDirect | expr[false])
    ;

assignable [boolean enableIgnore]
    : variable ('.' variable | '[' e1 = expr[false] (',' e2 = expr[false])* ']')*
    | '[' explicitAssignList ']'
    | {$enableIgnore}? '_'
    ;

explicitAssignList
    : a1 = assignable[true] (',' a2 = assignable[true])*
    ;

expr [boolean enableIgnore]
    : lambdaProcedure
    | i1 = implication[$enableIgnore]
      ('<==>' i2 = implication[$enableIgnore] | '<!=>' i2 = implication[$enableIgnore] )?
    ;

lambdaProcedure
    : lambdaParameters ('|->' expr[false] | '|=>' expr[false])
    ;

lambdaParameters
    : variable
    | '[' (v1 = variable (',' v2 = variable )*)?']'
    ;

implication [boolean enableIgnore]
    : disjunction[$enableIgnore]
      ('=>' im = implication[$enableIgnore])?
    ;

disjunction [boolean enableIgnore]
    : c1 = conjunction[$enableIgnore] ('||' c2 = conjunction[$enableIgnore])*
    ;

conjunction [boolean enableIgnore]
    : c1 = comparison[$enableIgnore]  ('&&' c2 = comparison[$enableIgnore])*
    ;

comparison [boolean enableIgnore]
    : s1 = sum[$enableIgnore]
      (
         '=='    s2 = sum[$enableIgnore]
       | '!='    s2 = sum[$enableIgnore]
       | '<'     s2 = sum[$enableIgnore]
       | '<='    s2 = sum[$enableIgnore]
       | '>'     s2 = sum[$enableIgnore]
       | '>='    s2 = sum[$enableIgnore]
       | 'in'    s2 = sum[$enableIgnore]
       | 'notin' s2 = sum[$enableIgnore]
      )?
    ;

sum [boolean enableIgnore]
    : p1 = product[$enableIgnore]
      (
         '+' p2 = product[$enableIgnore]
       | '-' p2 = product[$enableIgnore]
      )*
    ;

product [boolean enableIgnore]
    : r1 = reduce[$enableIgnore]
      (
         '*'  r2 = reduce[$enableIgnore]
       | '/'  r2 = reduce[$enableIgnore]
       | '\\' r2 = reduce[$enableIgnore]
       | '%'  r2 = reduce[$enableIgnore]
       | '><' r2 = reduce[$enableIgnore]
      )*
    ;

reduce [boolean enableIgnore]
    : p1 = prefixOperation[$enableIgnore, false]
      (
         '+/' p2 = prefixOperation[$enableIgnore, false]
       | '*/' p2 = prefixOperation[$enableIgnore, false]
      )*
    ;

prefixOperation [boolean enableIgnore, boolean quoted]
    : factor[$enableIgnore, $quoted]
      (
        '**' p = prefixOperation[$enableIgnore, $quoted]
      )?
    | '+/' po2 = prefixOperation[$enableIgnore, $quoted]
    | '*/' po2 = prefixOperation[$enableIgnore, $quoted]
    | '#'  po2 = prefixOperation[$enableIgnore, $quoted]
    | '-'  po2 = prefixOperation[$enableIgnore, $quoted]
    | '@'  po2 = prefixOperation[$enableIgnore, true]
    ;

factor [boolean enableIgnore, boolean quoted]
    : '!' f2 = factor[$enableIgnore, $quoted]
    | TERM '(' termArguments ')'
    | 'forall' '(' iteratorChain[$enableIgnore] '|' condition ')'
    | 'exists' '(' iteratorChain[$enableIgnore] '|' condition ')'
    | (
         '(' expr[$enableIgnore] ')'
       | procedure
       | variable
      )
      (
         '.' variable
       | call[$enableIgnore]
      )*
      (
        '!'
      )?
    | value[$enableIgnore, $quoted] ('!')?
    ;

termArguments
    : exprList[true]
    | /* epsilon */
    ;

procedure
    : 'procedure'       '(' procedureParameters[true] ')' '{' block '}'
    | 'cachedProcedure' '(' procedureParameters[false] ')' '{' block '}'
    | 'closure'         '(' procedureParameters[true] ')' '{' block '}'
    ;

procedureParameters [boolean enableRw]
    : pp1 = procedureParameter[$enableRw]
      (',' pp2 = procedureParameter[$enableRw])*
      (',' dp1  = procedureDefaultParameter)*
      (',' lp1 = procedureListParameter)?
    | dp2 = procedureDefaultParameter
      (',' dp3 = procedureDefaultParameter)*
      (',' lp2 = procedureListParameter)?
    | lp3 = procedureListParameter
    | /* epsilon */
    ;

procedureParameter [boolean enableRw]
    : {$enableRw}? 'rw' variable
    | variable
    ;

procedureDefaultParameter
    : variable ':=' expr[false]
    ;

procedureListParameter
    : '*' variable
    ;

call [boolean enableIgnore]
    : '(' callParameters[$enableIgnore]         ')'
    | '[' collectionAccessParams[$enableIgnore] ']'
    | '{' expr[$enableIgnore]                   '}'
    ;

callParameters [boolean enableIgnore]
    : exprList[$enableIgnore] (',' '*' expr[false])?
    | '*' expr[false]
    | /* epsilon */
    ;

collectionAccessParams [boolean enableIgnore]
    : e1 = expr[$enableIgnore] (RANGE_SIGN (e2 = expr[$enableIgnore])? | (',' e3 = expr[false])+)?
    | RANGE_SIGN expr[$enableIgnore]
    ;

value [boolean enableIgnore, boolean quoted] returns [Expr v]
    : '[' (collectionBuilder[$enableIgnore] { cb = $collectionBuilder.cb; } )? ']'
    | '{' (collectionBuilder[$enableIgnore] { cb = $collectionBuilder.cb; } )? '}'
    | STRING
    | LITERAL
    | matrix
    | vector
    | atomicValue
    | {$enableIgnore}? '_'
    ;

collectionBuilder [boolean enableIgnore] returns [CollectionBuilder cb]
    : /*iterator[$enableIgnore] '|' c2 = condition
    | */e1 = expr[$enableIgnore]
      (
         ',' e2 = expr[$enableIgnore]
         (
          RANGE_SIGN e3 = expr[$enableIgnore]
          |
            (
              ',' e3 = expr[$enableIgnore]
            )*
            (
               '|' e4 = expr[false]
             | /* epsilon */
            )
         )
       | RANGE_SIGN e3 = expr[$enableIgnore]
       |
         (
            '|' e2 = expr[false]
          | /* epsilon */
         )

       | ':' iteratorChain[$enableIgnore]
         (
            '|' c1 = condition
          | /* epsilon */
         )

      )
    ;

iteratorChain [boolean enableIgnore]
    : i1 = iterator[$enableIgnore] (',' i2 = iterator[$enableIgnore])*
    ;

iterator [boolean enableIgnore]
    : assignable[true] 'in' expr[$enableIgnore]
    ;

matrix
    : '<<' (vector)+ '>>'
    ;

vector
    : '<<' (('-' | /* epsilon */)(n1 = NUMBER | DOUBLE )('/' n2 = NUMBER)?)+ '>>'
    ;

atomicValue
    : NUMBER
    | DOUBLE
    | 'om'
    | 'true'
    | 'false'
    ;

ID              : ('a' .. 'z')('a' .. 'z' | 'A' .. 'Z'| '_' | '0' .. '9')* ;
TERM            : ('^' ID | 'A' .. 'Z' ID?) ;
NUMBER          : '0'|('1' .. '9')('0' .. '9')*;
DOUBLE          : NUMBER? '.' ('0' .. '9')+ (('e' | 'E') ('+' | '-')? ('0' .. '9')+)? ;
RANGE_SIGN      : '..';
STRING          : '"' ('\\'.|~('"'|'\\'))* '"';
LITERAL         : '\'' ('\'\''|~('\''))* '\'';

LINE_COMMENT    : '//' ~('\n' | '\r')*                      { skip(); } ;
MULTI_COMMENT   : '/*' (~('*') | '*'+ ~('*'|'/'))* '*'+ '/' { skip(); } ;
WS              : (' '|'\t'|'\n'|'\r')                      { skip(); } ;

/*
 * This is the desperate attempt at counting mismatched characters as errors
 * instead of the lexers default behavior of emitting an error message,
 * consuming the character and continuing without counting it as an error.
 *
 * Using this rule all unknown characters are added to the token stream
 * and the parser will stumble over them, reporting "mismatched input"
 *
 * Matching any character here works, because the lexer matches rules in order.
 */

REMAINDER       : . ;
