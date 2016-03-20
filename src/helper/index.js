import { InputStream, CommonTokenStream } from 'antlr4';
import { setlxLexer } from './grammar/setlxLexer';
import { setlxParser } from './grammar/setlxParser';
import SetlxVisitor from './visitor/SetlxVisitor';

export default function transpiler( input ) {
  const lexer = new setlxLexer( new InputStream( input ) );
  const tokens = new CommonTokenStream( lexer );
  const parser = new setlxParser(tokens);
  parser.buildParseTrees = true;
  const visitor = new SetlxVisitor();
  visitor.visit(parser.initBlock());
}
