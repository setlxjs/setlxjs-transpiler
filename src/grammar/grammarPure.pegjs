InitBlock
  = Statement+ WS

Block
  = Statement* WS

Statement
  = WS AssignmentOther WS ';'
  / WS AssignmentDirect WS ';'
  / WS Expression WS ';'
  / WS 'for' WS '(' IteratorChain ('|' Expression )? ')' WS '{' Block '}'
  / WS 'while' WS '(' Expression ')' WS '{' Block '}'
  / WS 'if' WS '(' WS Expression WS ')' WS '{' Block '}'
    (WS 'else' WS 'if' WS '(' WS Expression ')' WS '{' Block '}')*
    (WS 'else' WS '{' Block '}')?
  / WS 'return' WS Expression WS ';'

Variable
  = ID

AssignmentOther
  = Assignable WS ('+='/ '*=' / '-=' / '/=' / '%=' / '\\=') WS Expression

AssignmentDirect
  = Assignable WS ':=' WS (AssignmentDirect / Expression)

Assignable
  = Variable
  / '[' WS ExplicitAssignList WS ']'

ExplicitAssignList
  = Assignable (WS ',' WS Assignable)*

Expression
  = LambdaProcedure
  / Implication (WS ('<==>' / '<!=>') WS Implication)?

LambdaProcedure
  = LambdaParameters WS ('|->' / '|=>') WS Expression

LambdaParameters
  = Variable
  / '[' WS Variable (WS ',' WS Variable )* WS ']'

Implication
  = Disjunction (WS '=>' WS Implication)?

Disjunction
  = Conjunction (WS '||' WS Conjunction )*

Conjunction
  = Comparison (WS '&&' WS Comparison )*

Comparison
  = Sum (WS ('==' / '!=' / '>=' / '<=' / '>' / '<' / 'in' / 'notin') WS Sum)?

Sum
  = Product (WS ('+' / '-') WS Product)?

Product
  = Reduce (WS ('*' / '/') WS Reduce)?

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
  / ('(' WS Expression WS ')' / Procedure / Variable) ( Call )* ('!')?
  / Value WS ('!')?

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
  = Expression (WS ',' WS Expression)*

Value
  = '[' WS CollectionBuilder? WS ']'
  / '{' WS CollectionBuilder? WS '}'
  / STRING
  / NUMBER
  / DOUBLE
  / BOOLEAN

CollectionBuilder
  = Expression (
      (WS ',' WS Expression)+
    / WS RANGE_SIGN WS Expression
    / WS ':' WS IteratorChain() (WS '|' WS Expression)?
    )?

IteratorChain
  = Iterator (WS ',' WS Iterator)*

Iterator
  = Assignable WS 'in' WS Expression

ID "identifer"
  = [a-z][a-zA-Z_0-9]*

BOOLEAN "bool"
  = ('true' / 'false')

NUMBER "number"
  = '0' / [1-9][0-9]*

DOUBLE "double"
  = NUMBER? '.' [0-9]+([eE] ('+' / '-')? [0-9]+)?

RANGE_SIGN ".."
  = '..'

STRING "string"
  = '"' ('\\"' / [^\"])* '"'

LINE_TERMINATOR
  = '\n' / '\r\n' / '\r'

SINGLE_LINE_COMMENT
  = '//' (!LINE_TERMINATOR .)* LINE_TERMINATOR

MULTI_LINE_COMMENT
  = '/*' (!'*/' .)* '*/'

WS "whitespace"
  = (SINGLE_LINE_COMMENT / MULTI_LINE_COMMENT / [ \t\n\r])*
