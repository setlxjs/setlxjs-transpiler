import { parse } from './grammar/grammar';
import transpile from './util/transpile';

export default function transpiler( fileContent ) {
  const syntaxTree = parse( fileContent );
  return transpile( syntaxTree );
}
